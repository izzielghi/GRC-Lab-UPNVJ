import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Asset } from '../domain/asset.entity';
import { AssetDTO } from '../service/dto/asset.dto';
import { AssetMapper } from '../service/mapper/asset.mapper';

const relations = {
  location: true,
  rules: true,
} as const;

@Injectable()
export class AssetService {
  logger = new Logger('AssetService');

  constructor(@InjectRepository(Asset) private assetRepository: Repository<Asset>) {}

  async findById(id: number): Promise<AssetDTO | undefined> {
    const result = await this.assetRepository.findOne({
      relations,
      where: { id },
    });
    return AssetMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<AssetDTO>): Promise<AssetDTO | undefined> {
    const result = await this.assetRepository.findOne(options);
    return AssetMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<AssetDTO>): Promise<[AssetDTO[], number]> {
    const resultList = await this.assetRepository.findAndCount({ ...options, relations });
    const assetDTO: AssetDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(asset => assetDTO.push(AssetMapper.fromEntityToDTO(asset)));
      resultList[0] = assetDTO;
    }
    return resultList;
  }

  async save(assetDTO: AssetDTO, creator?: string): Promise<AssetDTO | undefined> {
    const entity = AssetMapper.fromDTOtoEntity(assetDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.assetRepository.save(entity);
    return AssetMapper.fromEntityToDTO(result);
  }

  async update(assetDTO: AssetDTO, updater?: string): Promise<AssetDTO | undefined> {
    const entity = AssetMapper.fromDTOtoEntity(assetDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.assetRepository.save(entity);
    return AssetMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.assetRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
  }
}
