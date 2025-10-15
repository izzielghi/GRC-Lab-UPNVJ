import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { ChecklistItem } from '../domain/checklist-item.entity';
import { ChecklistItemDTO } from '../service/dto/checklist-item.dto';
import { ChecklistItemMapper } from '../service/mapper/checklist-item.mapper';

const relations = {
  checklist: true,
} as const;

@Injectable()
export class ChecklistItemService {
  logger = new Logger('ChecklistItemService');

  constructor(@InjectRepository(ChecklistItem) private checklistItemRepository: Repository<ChecklistItem>) {}

  async findById(id: number): Promise<ChecklistItemDTO | undefined> {
    const result = await this.checklistItemRepository.findOne({
      relations,
      where: { id },
    });
    return ChecklistItemMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<ChecklistItemDTO>): Promise<ChecklistItemDTO | undefined> {
    const result = await this.checklistItemRepository.findOne(options);
    return ChecklistItemMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<ChecklistItemDTO>): Promise<[ChecklistItemDTO[], number]> {
    const resultList = await this.checklistItemRepository.findAndCount({ ...options, relations });
    const checklistItemDTO: ChecklistItemDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(checklistItem => checklistItemDTO.push(ChecklistItemMapper.fromEntityToDTO(checklistItem)));
      resultList[0] = checklistItemDTO;
    }
    return resultList;
  }

  async findByChecklistId(checklistId: number): Promise<ChecklistItemDTO[]> {
    const result = await this.checklistItemRepository.find({ where: { checklist: { id: checklistId } } });
    return result.map(item => ChecklistItemMapper.fromEntityToDTO(item));
  }

  async save(checklistItemDTO: ChecklistItemDTO, creator?: string): Promise<ChecklistItemDTO | undefined> {
    const entity = ChecklistItemMapper.fromDTOtoEntity(checklistItemDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.checklistItemRepository.save(entity);
    return ChecklistItemMapper.fromEntityToDTO(result);
  }

  async update(checklistItemDTO: ChecklistItemDTO, updater?: string): Promise<ChecklistItemDTO | undefined> {
    const entity = ChecklistItemMapper.fromDTOtoEntity(checklistItemDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.checklistItemRepository.save(entity);
    return ChecklistItemMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.checklistItemRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
  }
}
