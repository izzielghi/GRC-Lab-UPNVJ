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
import { MaintenanceRecordDTO } from '../../service/dto/maintenance-record.dto';
import { MaintenanceRecordService } from '../../service/maintenance-record.service';
import { Page, PageRequest } from '../../domain/base/pagination.entity';
import { AuthGuard, RoleType, Roles, RolesGuard } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/maintenance-records')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiTags('maintenance-records')
export class MaintenanceRecordController {
  logger = new Logger('MaintenanceRecordController');

  constructor(private readonly maintenanceRecordService: MaintenanceRecordService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: MaintenanceRecordDTO,
  })
  async getAll(@Req() req: Request): Promise<MaintenanceRecordDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort ?? 'id,ASC');
    const [results, count] = await this.maintenanceRecordService.findAndCount({
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
    type: MaintenanceRecordDTO,
  })
  async getOne(@Param('id') id: number): Promise<MaintenanceRecordDTO> {
    return await this.maintenanceRecordService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Create maintenanceRecord' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: MaintenanceRecordDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() maintenanceRecordDTO: MaintenanceRecordDTO): Promise<MaintenanceRecordDTO> {
    const created = await this.maintenanceRecordService.save(maintenanceRecordDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'MaintenanceRecord', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update maintenanceRecord' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: MaintenanceRecordDTO,
  })
  async put(@Req() req: Request, @Body() maintenanceRecordDTO: MaintenanceRecordDTO): Promise<MaintenanceRecordDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'MaintenanceRecord', maintenanceRecordDTO.id);
    return await this.maintenanceRecordService.update(maintenanceRecordDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update maintenanceRecord with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: MaintenanceRecordDTO,
  })
  async putId(@Req() req: Request, @Body() maintenanceRecordDTO: MaintenanceRecordDTO): Promise<MaintenanceRecordDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'MaintenanceRecord', maintenanceRecordDTO.id);
    return await this.maintenanceRecordService.update(maintenanceRecordDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Delete maintenanceRecord' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'MaintenanceRecord', id);
    return await this.maintenanceRecordService.deleteById(id);
  }
}
