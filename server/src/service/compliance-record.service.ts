import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { ComplianceRecord } from '../domain/compliance-record.entity';
import { ComplianceRecordDTO } from '../service/dto/compliance-record.dto';
import { ComplianceRecordMapper } from '../service/mapper/compliance-record.mapper';

@Injectable()
export class ComplianceRecordService {
  logger = new Logger('ComplianceRecordService');

  constructor(@InjectRepository(ComplianceRecord) private complianceRecordRepository: Repository<ComplianceRecord>) {}

  async findById(id: number): Promise<ComplianceRecordDTO | undefined> {
    const result = await this.complianceRecordRepository.findOne({
      where: { id },
    });
    return ComplianceRecordMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<ComplianceRecordDTO>): Promise<ComplianceRecordDTO | undefined> {
    const result = await this.complianceRecordRepository.findOne(options);
    return ComplianceRecordMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<ComplianceRecordDTO>): Promise<[ComplianceRecordDTO[], number]> {
    const resultList = await this.complianceRecordRepository.findAndCount(options);
    const complianceRecordDTO: ComplianceRecordDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(complianceRecord => complianceRecordDTO.push(ComplianceRecordMapper.fromEntityToDTO(complianceRecord)));
      resultList[0] = complianceRecordDTO;
    }
    return resultList;
  }

  async save(complianceRecordDTO: ComplianceRecordDTO, creator?: string): Promise<ComplianceRecordDTO | undefined> {
    const entity = ComplianceRecordMapper.fromDTOtoEntity(complianceRecordDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.complianceRecordRepository.save(entity);
    return ComplianceRecordMapper.fromEntityToDTO(result);
  }

  async update(complianceRecordDTO: ComplianceRecordDTO, updater?: string): Promise<ComplianceRecordDTO | undefined> {
    const entity = ComplianceRecordMapper.fromDTOtoEntity(complianceRecordDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.complianceRecordRepository.save(entity);
    return ComplianceRecordMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.complianceRecordRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
  }
}
