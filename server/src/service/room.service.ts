import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Room } from '../domain/room.entity';
import { RoomDTO } from '../service/dto/room.dto';
import { RoomMapper } from '../service/mapper/room.mapper';

@Injectable()
export class RoomService {
  logger = new Logger('RoomService');

  constructor(@InjectRepository(Room) private roomRepository: Repository<Room>) {}

  async findById(id: number): Promise<RoomDTO | undefined> {
    const result = await this.roomRepository.findOne({
      where: { id },
    });
    return RoomMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<RoomDTO>): Promise<RoomDTO | undefined> {
    const result = await this.roomRepository.findOne(options);
    return RoomMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<RoomDTO>): Promise<[RoomDTO[], number]> {
    const resultList = await this.roomRepository.findAndCount(options);
    const roomDTO: RoomDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(room => roomDTO.push(RoomMapper.fromEntityToDTO(room)));
      resultList[0] = roomDTO;
    }
    return resultList;
  }

  async save(roomDTO: RoomDTO, creator?: string): Promise<RoomDTO | undefined> {
    const entity = RoomMapper.fromDTOtoEntity(roomDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.roomRepository.save(entity);
    return RoomMapper.fromEntityToDTO(result);
  }

  async update(roomDTO: RoomDTO, updater?: string): Promise<RoomDTO | undefined> {
    const entity = RoomMapper.fromDTOtoEntity(roomDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.roomRepository.save(entity);
    return RoomMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.roomRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
  }
}
