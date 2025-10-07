import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { SOP } from '../domain/sop.entity';
import { SOPDTO } from '../service/dto/sop.dto';
import { SOPMapper } from '../service/mapper/sop.mapper';

@Injectable()
export class SOPService {
  logger = new Logger('SOPService');

  constructor(@InjectRepository(SOP) private sOPRepository: Repository<SOP>) {}

  async findById(id: number): Promise<SOPDTO | undefined> {
    const result = await this.sOPRepository.findOne({
      where: { id },
    });
    return SOPMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<SOPDTO>): Promise<SOPDTO | undefined> {
    const result = await this.sOPRepository.findOne(options);
    return SOPMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<SOPDTO>): Promise<[SOPDTO[], number]> {
    const resultList = await this.sOPRepository.findAndCount(options);
    const sOPDTO: SOPDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(sOP => sOPDTO.push(SOPMapper.fromEntityToDTO(sOP)));
      resultList[0] = sOPDTO;
    }
    return resultList;
  }

  async save(sOPDTO: SOPDTO, creator?: string): Promise<SOPDTO | undefined> {
    const entity = SOPMapper.fromDTOtoEntity(sOPDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.sOPRepository.save(entity);
    return SOPMapper.fromEntityToDTO(result);
  }

  async update(sOPDTO: SOPDTO, updater?: string): Promise<SOPDTO | undefined> {
    const entity = SOPMapper.fromDTOtoEntity(sOPDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.sOPRepository.save(entity);
    return SOPMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.sOPRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
  }
}
