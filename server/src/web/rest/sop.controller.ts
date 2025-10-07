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
import { SOPDTO } from '../../service/dto/sop.dto';
import { SOPService } from '../../service/sop.service';
import { Page, PageRequest } from '../../domain/base/pagination.entity';
import { AuthGuard, RoleType, Roles, RolesGuard } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/sops')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiTags('sops')
export class SOPController {
  logger = new Logger('SOPController');

  constructor(private readonly sOPService: SOPService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: SOPDTO,
  })
  async getAll(@Req() req: Request): Promise<SOPDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort ?? 'id,ASC');
    const [results, count] = await this.sOPService.findAndCount({
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
    type: SOPDTO,
  })
  async getOne(@Param('id') id: number): Promise<SOPDTO> {
    return await this.sOPService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Create sOP' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: SOPDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() sOPDTO: SOPDTO): Promise<SOPDTO> {
    const created = await this.sOPService.save(sOPDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'SOP', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update sOP' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: SOPDTO,
  })
  async put(@Req() req: Request, @Body() sOPDTO: SOPDTO): Promise<SOPDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'SOP', sOPDTO.id);
    return await this.sOPService.update(sOPDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update sOP with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: SOPDTO,
  })
  async putId(@Req() req: Request, @Body() sOPDTO: SOPDTO): Promise<SOPDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'SOP', sOPDTO.id);
    return await this.sOPService.update(sOPDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Delete sOP' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'SOP', id);
    return await this.sOPService.deleteById(id);
  }
}
