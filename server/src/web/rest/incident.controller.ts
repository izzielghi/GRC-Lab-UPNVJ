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
import { IncidentDTO } from '../../service/dto/incident.dto';
import { IncidentService } from '../../service/incident.service';
import { Page, PageRequest } from '../../domain/base/pagination.entity';
import { AuthGuard, RoleType, Roles, RolesGuard } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/incidents')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiTags('incidents')
export class IncidentController {
  logger = new Logger('IncidentController');

  constructor(private readonly incidentService: IncidentService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: IncidentDTO,
  })
  async getAll(@Req() req: Request): Promise<IncidentDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort ?? 'id,ASC');
    const [results, count] = await this.incidentService.findAndCount({
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
    type: IncidentDTO,
  })
  async getOne(@Param('id') id: number): Promise<IncidentDTO> {
    return await this.incidentService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Create incident' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: IncidentDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() incidentDTO: IncidentDTO): Promise<IncidentDTO> {
    const created = await this.incidentService.save(incidentDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Incident', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update incident' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: IncidentDTO,
  })
  async put(@Req() req: Request, @Body() incidentDTO: IncidentDTO): Promise<IncidentDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Incident', incidentDTO.id);
    return await this.incidentService.update(incidentDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update incident with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: IncidentDTO,
  })
  async putId(@Req() req: Request, @Body() incidentDTO: IncidentDTO): Promise<IncidentDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Incident', incidentDTO.id);
    return await this.incidentService.update(incidentDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Delete incident' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Incident', id);
    return await this.incidentService.deleteById(id);
  }
}
