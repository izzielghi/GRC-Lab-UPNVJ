import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { UsageLog } from '../domain/usage-log.entity';
import { UsageLogDTO } from '../service/dto/usage-log.dto';
import { UsageLogMapper } from '../service/mapper/usage-log.mapper';

const relations = {
  user: true,
  room: true,
  asset: true,
} as const;

@Injectable()
export class UsageLogService {
  logger = new Logger('UsageLogService');

  constructor(@InjectRepository(UsageLog) private usageLogRepository: Repository<UsageLog>) {}

  async findById(id: number): Promise<UsageLogDTO | undefined> {
    const result = await this.usageLogRepository.findOne({
      relations,
      where: { id },
    });
    return UsageLogMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<UsageLogDTO>): Promise<UsageLogDTO | undefined> {
    const result = await this.usageLogRepository.findOne(options);
    return UsageLogMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<UsageLogDTO>): Promise<[UsageLogDTO[], number]> {
    const resultList = await this.usageLogRepository.findAndCount({ ...options, relations });
    const usageLogDTO: UsageLogDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(usageLog => usageLogDTO.push(UsageLogMapper.fromEntityToDTO(usageLog)));
      resultList[0] = usageLogDTO;
    }
    return resultList;
  }

  async save(usageLogDTO: UsageLogDTO, creator?: string): Promise<UsageLogDTO | undefined> {
    const entity = UsageLogMapper.fromDTOtoEntity(usageLogDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.usageLogRepository.save(entity);
    return UsageLogMapper.fromEntityToDTO(result);
  }

  async update(usageLogDTO: UsageLogDTO, updater?: string): Promise<UsageLogDTO | undefined> {
    const entity = UsageLogMapper.fromDTOtoEntity(usageLogDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.usageLogRepository.save(entity);
    return UsageLogMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.usageLogRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
  }
}
