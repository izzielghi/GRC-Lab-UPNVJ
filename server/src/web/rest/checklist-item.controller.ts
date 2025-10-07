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
import { ChecklistItemDTO } from '../../service/dto/checklist-item.dto';
import { ChecklistItemService } from '../../service/checklist-item.service';
import { Page, PageRequest } from '../../domain/base/pagination.entity';
import { AuthGuard, RoleType, Roles, RolesGuard } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/checklist-items')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiTags('checklist-items')
export class ChecklistItemController {
  logger = new Logger('ChecklistItemController');

  constructor(private readonly checklistItemService: ChecklistItemService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: ChecklistItemDTO,
  })
  async getAll(@Req() req: Request): Promise<ChecklistItemDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort ?? 'id,ASC');
    const [results, count] = await this.checklistItemService.findAndCount({
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
    type: ChecklistItemDTO,
  })
  async getOne(@Param('id') id: number): Promise<ChecklistItemDTO> {
    return await this.checklistItemService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Create checklistItem' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ChecklistItemDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() checklistItemDTO: ChecklistItemDTO): Promise<ChecklistItemDTO> {
    const created = await this.checklistItemService.save(checklistItemDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ChecklistItem', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update checklistItem' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ChecklistItemDTO,
  })
  async put(@Req() req: Request, @Body() checklistItemDTO: ChecklistItemDTO): Promise<ChecklistItemDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ChecklistItem', checklistItemDTO.id);
    return await this.checklistItemService.update(checklistItemDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update checklistItem with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ChecklistItemDTO,
  })
  async putId(@Req() req: Request, @Body() checklistItemDTO: ChecklistItemDTO): Promise<ChecklistItemDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ChecklistItem', checklistItemDTO.id);
    return await this.checklistItemService.update(checklistItemDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Delete checklistItem' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'ChecklistItem', id);
    return await this.checklistItemService.deleteById(id);
  }
}
