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
import { ComplianceRecordDTO } from '../../service/dto/compliance-record.dto';
import { ComplianceRecordService } from '../../service/compliance-record.service';
import { Page, PageRequest } from '../../domain/base/pagination.entity';
import { AuthGuard, RoleType, Roles, RolesGuard } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/compliance-records')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiTags('compliance-records')
export class ComplianceRecordController {
  logger = new Logger('ComplianceRecordController');

  constructor(private readonly complianceRecordService: ComplianceRecordService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: ComplianceRecordDTO,
  })
  async getAll(@Req() req: Request): Promise<ComplianceRecordDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort ?? 'id,ASC');
    const [results, count] = await this.complianceRecordService.findAndCount({
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
    type: ComplianceRecordDTO,
  })
  async getOne(@Param('id') id: number): Promise<ComplianceRecordDTO> {
    return await this.complianceRecordService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Create complianceRecord' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ComplianceRecordDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() complianceRecordDTO: ComplianceRecordDTO): Promise<ComplianceRecordDTO> {
    const created = await this.complianceRecordService.save(complianceRecordDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ComplianceRecord', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update complianceRecord' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ComplianceRecordDTO,
  })
  async put(@Req() req: Request, @Body() complianceRecordDTO: ComplianceRecordDTO): Promise<ComplianceRecordDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ComplianceRecord', complianceRecordDTO.id);
    return await this.complianceRecordService.update(complianceRecordDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update complianceRecord with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ComplianceRecordDTO,
  })
  async putId(@Req() req: Request, @Body() complianceRecordDTO: ComplianceRecordDTO): Promise<ComplianceRecordDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ComplianceRecord', complianceRecordDTO.id);
    return await this.complianceRecordService.update(complianceRecordDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Delete complianceRecord' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'ComplianceRecord', id);
    return await this.complianceRecordService.deleteById(id);
  }
}
