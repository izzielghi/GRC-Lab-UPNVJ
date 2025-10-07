import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Booking } from '../domain/booking.entity';
import { User } from '../domain/user.entity'; // <-- 1. IMPORT User
import { BookingDTO } from '../service/dto/booking.dto';
import { BookingMapper } from '../service/mapper/booking.mapper';
import { Request } from 'express';

const relations = {
  user: true,
  room: true,
} as const;

@Injectable()
export class BookingService {
  logger = new Logger('BookingService');

  constructor(
    @InjectRepository(Booking) private bookingRepository: Repository<Booking>,
    @InjectRepository(User) private userRepository: Repository<User>, // <-- 2. INJEKSI UserRepository
  ) {}

  async findById(id: number): Promise<BookingDTO | undefined> {
    const result = await this.bookingRepository.findOne({
      relations,
      where: { id },
    });
    return BookingMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<BookingDTO>): Promise<BookingDTO | undefined> {
    const result = await this.bookingRepository.findOne(options);
    return BookingMapper.fromEntityToDTO(result);
  }

  async findAndCount(req: Request, options: FindManyOptions<BookingDTO>): Promise<[BookingDTO[], number]> {
    const currentUser = req.user as any;
    const isAdmin = currentUser.authorities.includes('ROLE_ADMIN');

    if (!isAdmin) {
      options.where = {
        ...options.where,
        user: { login: currentUser.login },
      };
    }

    const resultList = await this.bookingRepository.findAndCount({ ...options, relations });
    const bookingDTO: BookingDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(booking => bookingDTO.push(BookingMapper.fromEntityToDTO(booking)));
      resultList[0] = bookingDTO;
    }
    return resultList;
  }

  // 👇 ==================================================================
  // FUNGSI INI YANG KITA MODIFIKASI SECARA SIGNIFIKAN
  // 👇 ==================================================================
  async save(bookingDTO: BookingDTO, creatorLogin?: string): Promise<BookingDTO | undefined> {
    const entity = BookingMapper.fromDTOtoEntity(bookingDTO);

    // Jika ini adalah data baru, hubungkan dengan pengguna yang sedang login
    if (creatorLogin && !entity.id) {
      const creator = await this.userRepository.findOne({ where: { login: creatorLogin } });
      if (creator) {
        entity.user = creator; // <-- 3. HUBUNGKAN ENTITAS USER
      }

      // Atur audit fields
      entity.createdBy = creatorLogin;
    }

    // Atur lastModifiedBy untuk create dan update
    if (creatorLogin) {
      entity.lastModifiedBy = creatorLogin;
    }

    const result = await this.bookingRepository.save(entity);
    return BookingMapper.fromEntityToDTO(result);
  }
  // 👆 ==================================================================
  // AKHIR DARI MODIFIKASI
  // 👆 ==================================================================

  async update(bookingDTO: BookingDTO, updater?: string): Promise<BookingDTO | undefined> {
    const entity = BookingMapper.fromDTOtoEntity(bookingDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.bookingRepository.save(entity);
    return BookingMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.bookingRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
  }
}
