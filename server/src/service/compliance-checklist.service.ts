import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { ComplianceChecklist } from '../domain/compliance-checklist.entity';
import { ComplianceChecklistDTO } from '../service/dto/compliance-checklist.dto';
import { ComplianceChecklistMapper } from '../service/mapper/compliance-checklist.mapper';

@Injectable()
export class ComplianceChecklistService {
  logger = new Logger('ComplianceChecklistService');

  constructor(@InjectRepository(ComplianceChecklist) private complianceChecklistRepository: Repository<ComplianceChecklist>) {}

  async findById(id: number): Promise<ComplianceChecklistDTO | undefined> {
    const result = await this.complianceChecklistRepository.findOne({
      where: { id },
    });
    return ComplianceChecklistMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<ComplianceChecklistDTO>): Promise<ComplianceChecklistDTO | undefined> {
    const result = await this.complianceChecklistRepository.findOne(options);
    return ComplianceChecklistMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<ComplianceChecklistDTO>): Promise<[ComplianceChecklistDTO[], number]> {
    const resultList = await this.complianceChecklistRepository.findAndCount(options);
    const complianceChecklistDTO: ComplianceChecklistDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(complianceChecklist =>
        complianceChecklistDTO.push(ComplianceChecklistMapper.fromEntityToDTO(complianceChecklist)),
      );
      resultList[0] = complianceChecklistDTO;
    }
    return resultList;
  }

  async save(complianceChecklistDTO: ComplianceChecklistDTO, creator?: string): Promise<ComplianceChecklistDTO | undefined> {
    const entity = ComplianceChecklistMapper.fromDTOtoEntity(complianceChecklistDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.complianceChecklistRepository.save(entity);
    return ComplianceChecklistMapper.fromEntityToDTO(result);
  }

  async update(complianceChecklistDTO: ComplianceChecklistDTO, updater?: string): Promise<ComplianceChecklistDTO | undefined> {
    const entity = ComplianceChecklistMapper.fromDTOtoEntity(complianceChecklistDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.complianceChecklistRepository.save(entity);
    return ComplianceChecklistMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.complianceChecklistRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
  }
}
