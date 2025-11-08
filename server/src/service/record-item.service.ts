import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { RecordItem } from '../domain/record-item.entity';
import { RecordItemDTO } from '../service/dto/record-item.dto';
import { RecordItemMapper } from '../service/mapper/record-item.mapper';

const relations = {
  item: true,
  record: true,
} as const;

@Injectable()
export class RecordItemService {
  logger = new Logger('RecordItemService');

  constructor(@InjectRepository(RecordItem) private recordItemRepository: Repository<RecordItem>) {}

  async findById(id: number): Promise<RecordItemDTO | undefined> {
    const result = await this.recordItemRepository.findOne({
      relations,
      where: { id },
    });
    return RecordItemMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<RecordItemDTO>): Promise<RecordItemDTO | undefined> {
    const result = await this.recordItemRepository.findOne(options);
    return RecordItemMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<RecordItemDTO>): Promise<[RecordItemDTO[], number]> {
    const resultList = await this.recordItemRepository.findAndCount({ ...options, relations });
    const recordItemDTO: RecordItemDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(recordItem => recordItemDTO.push(RecordItemMapper.fromEntityToDTO(recordItem)));
      resultList[0] = recordItemDTO;
    }
    return resultList;
  }

  async save(recordItemDTO: RecordItemDTO, creator?: string): Promise<RecordItemDTO | undefined> {
    const entity = RecordItemMapper.fromDTOtoEntity(recordItemDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.recordItemRepository.save(entity);
    return RecordItemMapper.fromEntityToDTO(result);
  }

  async update(recordItemDTO: RecordItemDTO, updater?: string): Promise<RecordItemDTO | undefined> {
    const entity = RecordItemMapper.fromDTOtoEntity(recordItemDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.recordItemRepository.save(entity);
    return RecordItemMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.recordItemRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
  }
}
