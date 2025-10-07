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
import { RoomDTO } from '../../service/dto/room.dto';
import { RoomService } from '../../service/room.service';
import { Page, PageRequest } from '../../domain/base/pagination.entity';
import { AuthGuard, RoleType, Roles, RolesGuard } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/rooms')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiTags('rooms')
export class RoomController {
  logger = new Logger('RoomController');

  constructor(private readonly roomService: RoomService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: RoomDTO,
  })
  async getAll(@Req() req: Request): Promise<RoomDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort ?? 'id,ASC');
    const [results, count] = await this.roomService.findAndCount({
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
    type: RoomDTO,
  })
  async getOne(@Param('id') id: number): Promise<RoomDTO> {
    return await this.roomService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Create room' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: RoomDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() roomDTO: RoomDTO): Promise<RoomDTO> {
    const created = await this.roomService.save(roomDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Room', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update room' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: RoomDTO,
  })
  async put(@Req() req: Request, @Body() roomDTO: RoomDTO): Promise<RoomDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Room', roomDTO.id);
    return await this.roomService.update(roomDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update room with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: RoomDTO,
  })
  async putId(@Req() req: Request, @Body() roomDTO: RoomDTO): Promise<RoomDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Room', roomDTO.id);
    return await this.roomService.update(roomDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Delete room' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Room', id);
    return await this.roomService.deleteById(id);
  }
}
