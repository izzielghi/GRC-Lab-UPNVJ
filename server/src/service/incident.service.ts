import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Incident } from '../domain/incident.entity';
import { IncidentDTO } from '../service/dto/incident.dto';
import { IncidentMapper } from '../service/mapper/incident.mapper';

const relations = {
  reporter: true,
  asset: true,
} as const;

@Injectable()
export class IncidentService {
  logger = new Logger('IncidentService');

  constructor(@InjectRepository(Incident) private incidentRepository: Repository<Incident>) {}

  async findById(id: number): Promise<IncidentDTO | undefined> {
    const result = await this.incidentRepository.findOne({
      relations,
      where: { id },
    });
    return IncidentMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<IncidentDTO>): Promise<IncidentDTO | undefined> {
    const result = await this.incidentRepository.findOne(options);
    return IncidentMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<IncidentDTO>): Promise<[IncidentDTO[], number]> {
    const resultList = await this.incidentRepository.findAndCount({ ...options, relations });
    const incidentDTO: IncidentDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(incident => incidentDTO.push(IncidentMapper.fromEntityToDTO(incident)));
      resultList[0] = incidentDTO;
    }
    return resultList;
  }

  async save(incidentDTO: IncidentDTO, creator?: string): Promise<IncidentDTO | undefined> {
    const entity = IncidentMapper.fromDTOtoEntity(incidentDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.incidentRepository.save(entity);
    return IncidentMapper.fromEntityToDTO(result);
  }

  async update(incidentDTO: IncidentDTO, updater?: string): Promise<IncidentDTO | undefined> {
    const entity = IncidentMapper.fromDTOtoEntity(incidentDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.incidentRepository.save(entity);
    return IncidentMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.incidentRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
  }
}
