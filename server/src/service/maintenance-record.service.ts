import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { MaintenanceRecord } from '../domain/maintenance-record.entity';
import { MaintenanceRecordDTO } from '../service/dto/maintenance-record.dto';
import { MaintenanceRecordMapper } from '../service/mapper/maintenance-record.mapper';

const relations = {
  user: true,
  asset: true,
} as const;

@Injectable()
export class MaintenanceRecordService {
  logger = new Logger('MaintenanceRecordService');

  constructor(@InjectRepository(MaintenanceRecord) private maintenanceRecordRepository: Repository<MaintenanceRecord>) {}

  async findById(id: number): Promise<MaintenanceRecordDTO | undefined> {
    const result = await this.maintenanceRecordRepository.findOne({
      relations,
      where: { id },
    });
    return MaintenanceRecordMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<MaintenanceRecordDTO>): Promise<MaintenanceRecordDTO | undefined> {
    const result = await this.maintenanceRecordRepository.findOne(options);
    return MaintenanceRecordMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<MaintenanceRecordDTO>): Promise<[MaintenanceRecordDTO[], number]> {
    const resultList = await this.maintenanceRecordRepository.findAndCount({ ...options, relations });
    const maintenanceRecordDTO: MaintenanceRecordDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(maintenanceRecord => maintenanceRecordDTO.push(MaintenanceRecordMapper.fromEntityToDTO(maintenanceRecord)));
      resultList[0] = maintenanceRecordDTO;
    }
    return resultList;
  }

  async save(maintenanceRecordDTO: MaintenanceRecordDTO, creator?: string): Promise<MaintenanceRecordDTO | undefined> {
    const entity = MaintenanceRecordMapper.fromDTOtoEntity(maintenanceRecordDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.maintenanceRecordRepository.save(entity);
    return MaintenanceRecordMapper.fromEntityToDTO(result);
  }

  async update(maintenanceRecordDTO: MaintenanceRecordDTO, updater?: string): Promise<MaintenanceRecordDTO | undefined> {
    const entity = MaintenanceRecordMapper.fromDTOtoEntity(maintenanceRecordDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.maintenanceRecordRepository.save(entity);
    return MaintenanceRecordMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.maintenanceRecordRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
  }
}
