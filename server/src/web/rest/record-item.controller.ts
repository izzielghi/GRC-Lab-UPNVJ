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
import { RecordItemDTO } from '../../service/dto/record-item.dto';
import { RecordItemService } from '../../service/record-item.service';
import { Page, PageRequest } from '../../domain/base/pagination.entity';
import { AuthGuard, RoleType, Roles, RolesGuard } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/record-items')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiTags('record-items')
export class RecordItemController {
  logger = new Logger('RecordItemController');

  constructor(private readonly recordItemService: RecordItemService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: RecordItemDTO,
  })
  async getAll(@Req() req: Request): Promise<RecordItemDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort ?? 'id,ASC');
    const [results, count] = await this.recordItemService.findAndCount({
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
    type: RecordItemDTO,
  })
  async getOne(@Param('id') id: number): Promise<RecordItemDTO> {
    return await this.recordItemService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Create recordItem' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: RecordItemDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() recordItemDTO: RecordItemDTO): Promise<RecordItemDTO> {
    const created = await this.recordItemService.save(recordItemDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'RecordItem', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update recordItem' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: RecordItemDTO,
  })
  async put(@Req() req: Request, @Body() recordItemDTO: RecordItemDTO): Promise<RecordItemDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'RecordItem', recordItemDTO.id);
    return await this.recordItemService.update(recordItemDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update recordItem with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: RecordItemDTO,
  })
  async putId(@Req() req: Request, @Body() recordItemDTO: RecordItemDTO): Promise<RecordItemDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'RecordItem', recordItemDTO.id);
    return await this.recordItemService.update(recordItemDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Delete recordItem' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'RecordItem', id);
    return await this.recordItemService.deleteById(id);
  }
}
