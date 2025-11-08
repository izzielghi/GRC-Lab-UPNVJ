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
import { ComplianceChecklistDTO } from '../../service/dto/compliance-checklist.dto';
import { ComplianceChecklistService } from '../../service/compliance-checklist.service';
import { Page, PageRequest } from '../../domain/base/pagination.entity';
import { AuthGuard, RoleType, Roles, RolesGuard } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/compliance-checklists')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiTags('compliance-checklists')
export class ComplianceChecklistController {
  logger = new Logger('ComplianceChecklistController');

  constructor(private readonly complianceChecklistService: ComplianceChecklistService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: ComplianceChecklistDTO,
  })
  async getAll(@Req() req: Request): Promise<ComplianceChecklistDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort ?? 'id,ASC');
    const [results, count] = await this.complianceChecklistService.findAndCount({
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
    type: ComplianceChecklistDTO,
  })
  async getOne(@Param('id') id: number): Promise<ComplianceChecklistDTO> {
    return await this.complianceChecklistService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Create complianceChecklist' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ComplianceChecklistDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() complianceChecklistDTO: ComplianceChecklistDTO): Promise<ComplianceChecklistDTO> {
    const created = await this.complianceChecklistService.save(complianceChecklistDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ComplianceChecklist', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update complianceChecklist' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ComplianceChecklistDTO,
  })
  async put(@Req() req: Request, @Body() complianceChecklistDTO: ComplianceChecklistDTO): Promise<ComplianceChecklistDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ComplianceChecklist', complianceChecklistDTO.id);
    return await this.complianceChecklistService.update(complianceChecklistDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update complianceChecklist with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ComplianceChecklistDTO,
  })
  async putId(@Req() req: Request, @Body() complianceChecklistDTO: ComplianceChecklistDTO): Promise<ComplianceChecklistDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ComplianceChecklist', complianceChecklistDTO.id);
    return await this.complianceChecklistService.update(complianceChecklistDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Delete complianceChecklist' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'ComplianceChecklist', id);
    return await this.complianceChecklistService.deleteById(id);
  }
}
