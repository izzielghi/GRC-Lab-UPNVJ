import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post as PostMethod,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookingDTO } from '../../service/dto/booking.dto';
import { BookingService } from '../../service/booking.service';
import { Page, PageRequest } from '../../domain/base/pagination.entity';
import { AuthGuard, RoleType, Roles, RolesGuard } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { Request } from 'express';
import { User } from '../../domain/user.entity'; // <-- 1. TAMBAHKAN IMPORT INI

@Controller('api/bookings')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiTags('bookings')
export class BookingController {
  logger = new Logger('BookingController');

  constructor(private readonly bookingService: BookingService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: BookingDTO,
  })
  async getAll(@Req() req: Request): Promise<BookingDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort ?? 'id,ASC');
    const [results, count] = await this.bookingService.findAndCount(req, {
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder(),
    });
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Get('/:id')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: BookingDTO,
  })
  async getOne(@Param('id') id: number): Promise<BookingDTO> {
    return await this.bookingService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Create booking' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: BookingDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() bookingDTO: BookingDTO): Promise<BookingDTO> {
    const user = req.user as User; // <-- 2. Lakukan type assertion di sini
    const created = await this.bookingService.save(bookingDTO, user.login); // <-- 3. Gunakan user.login
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Booking', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update booking' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: BookingDTO,
  })
  async put(@Req() req: Request, @Body() bookingDTO: BookingDTO): Promise<BookingDTO> {
    const user = req.user as User; // <-- Lakukan hal yang sama
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Booking', bookingDTO.id);
    return await this.bookingService.update(bookingDTO, user.login);
  }

  @Put('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update booking with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: BookingDTO,
  })
  async putId(@Req() req: Request, @Body() bookingDTO: BookingDTO): Promise<BookingDTO> {
    const user = req.user as User; // <-- Lakukan hal yang sama
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Booking', bookingDTO.id);
    return await this.bookingService.update(bookingDTO, user.login);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Delete booking' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Booking', id);
    return await this.bookingService.deleteById(id);
  }
}
