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
import { UsageLogDTO } from '../../service/dto/usage-log.dto';
import { UsageLogService } from '../../service/usage-log.service';
import { Page, PageRequest } from '../../domain/base/pagination.entity';
import { AuthGuard, RoleType, Roles, RolesGuard } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/usage-logs')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiTags('usage-logs')
export class UsageLogController {
  logger = new Logger('UsageLogController');

  constructor(private readonly usageLogService: UsageLogService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: UsageLogDTO,
  })
  async getAll(@Req() req: Request): Promise<UsageLogDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort ?? 'id,ASC');
    const [results, count] = await this.usageLogService.findAndCount({
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
    type: UsageLogDTO,
  })
  async getOne(@Param('id') id: number): Promise<UsageLogDTO> {
    return await this.usageLogService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Create usageLog' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: UsageLogDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() usageLogDTO: UsageLogDTO): Promise<UsageLogDTO> {
    const created = await this.usageLogService.save(usageLogDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'UsageLog', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update usageLog' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: UsageLogDTO,
  })
  async put(@Req() req: Request, @Body() usageLogDTO: UsageLogDTO): Promise<UsageLogDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'UsageLog', usageLogDTO.id);
    return await this.usageLogService.update(usageLogDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update usageLog with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: UsageLogDTO,
  })
  async putId(@Req() req: Request, @Body() usageLogDTO: UsageLogDTO): Promise<UsageLogDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'UsageLog', usageLogDTO.id);
    return await this.usageLogService.update(usageLogDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Delete usageLog' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'UsageLog', id);
    return await this.usageLogService.deleteById(id);
  }
}
