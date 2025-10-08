import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Booking } from '../domain/booking.entity';
import { User } from '../domain/user.entity';
import { BookingDTO } from '../service/dto/booking.dto';
import { BookingMapper } from '../service/mapper/booking.mapper';
import { Request } from 'express';
import { BookingStatus } from '../domain/enumeration/booking-status'; // Pastikan ini diimpor

const relations = {
  user: true,
  room: true,
} as const;

@Injectable()
export class BookingService {
  logger = new Logger('BookingService');

  constructor(
    @InjectRepository(Booking) private bookingRepository: Repository<Booking>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  // ... (Fungsi findById, findByFields, findAndCount tidak perlu diubah)

  async findById(id: number): Promise<BookingDTO | undefined> {
    const result = await this.bookingRepository.findOne({ relations, where: { id } });
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
      options.where = { ...options.where, user: { login: currentUser.login } };
    }
    const resultList = await this.bookingRepository.findAndCount({ ...options, relations });
    const bookingDTO: BookingDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(booking => bookingDTO.push(BookingMapper.fromEntityToDTO(booking)));
      resultList[0] = bookingDTO;
    }
    return resultList;
  }

  // 👇 ================================================================
  // FUNGSI SAVE: Hanya untuk MEMBUAT data baru
  // 👇 ================================================================
  async save(bookingDTO: BookingDTO, creatorLogin?: string): Promise<BookingDTO | undefined> {
    const entity = BookingMapper.fromDTOtoEntity(bookingDTO);

    // 1. Hubungkan dengan pengguna yang membuat
    const creator = await this.userRepository.findOne({ where: { login: creatorLogin } });
    if (creator) {
      entity.user = creator;
    }

    // 2. PAKSA status default menjadi PENDING
    entity.status = BookingStatus.PENDING;

    // 3. Atur audit fields untuk data baru
    entity.createdBy = creatorLogin;
    entity.lastModifiedBy = creatorLogin;

    const result = await this.bookingRepository.save(entity);
    return BookingMapper.fromEntityToDTO(result);
  }

  // 👇 ================================================================
  // FUNGSI UPDATE: Hanya untuk MENGUBAH data yang sudah ada
  // 👇 ================================================================
  async update(bookingDTO: BookingDTO, updaterLogin?: string): Promise<BookingDTO | undefined> {
    this.logger.log(`Menerima DTO untuk update: ${JSON.stringify(bookingDTO, null, 2)}`);

    // 1. AMBIL data yang sudah ada dari database
    const existingBooking = await this.bookingRepository.findOne({ where: { id: bookingDTO.id } });
    if (!existingBooking) {
      throw new HttpException('Booking tidak ditemukan!', HttpStatus.NOT_FOUND);
    }

    // 2. GABUNGKAN perubahan dari form ke data yang sudah ada
    // Ini memastikan field seperti 'createdBy' dan 'user' tidak hilang
    const updatedEntity = {
      ...existingBooking, // Ambil semua data lama
      ...BookingMapper.fromDTOtoEntity(bookingDTO), // Timpa dengan data baru dari form
      lastModifiedBy: updaterLogin, // Perbarui field 'lastModifiedBy'
    };

    // 3. SIMPAN entitas yang sudah digabung
    const result = await this.bookingRepository.save(updatedEntity);
    return BookingMapper.fromEntityToDTO(result);
  }

  // ... (Fungsi deleteById tidak perlu diubah)

  async deleteById(id: number): Promise<void | undefined> {
    await this.bookingRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
  }
}
