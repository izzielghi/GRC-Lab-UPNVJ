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
import { AssetDTO } from '../../service/dto/asset.dto';
import { AssetService } from '../../service/asset.service';
import { Page, PageRequest } from '../../domain/base/pagination.entity';
import { AuthGuard, RoleType, Roles, RolesGuard } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/assets')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiTags('assets')
export class AssetController {
  logger = new Logger('AssetController');

  constructor(private readonly assetService: AssetService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: AssetDTO,
  })
  async getAll(@Req() req: Request): Promise<AssetDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort ?? 'id,ASC');
    const [results, count] = await this.assetService.findAndCount({
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
    type: AssetDTO,
  })
  async getOne(@Param('id') id: number): Promise<AssetDTO> {
    return await this.assetService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Create asset' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: AssetDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() assetDTO: AssetDTO): Promise<AssetDTO> {
    const created = await this.assetService.save(assetDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Asset', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update asset' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: AssetDTO,
  })
  async put(@Req() req: Request, @Body() assetDTO: AssetDTO): Promise<AssetDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Asset', assetDTO.id);
    return await this.assetService.update(assetDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update asset with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: AssetDTO,
  })
  async putId(@Req() req: Request, @Body() assetDTO: AssetDTO): Promise<AssetDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Asset', assetDTO.id);
    return await this.assetService.update(assetDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Delete asset' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Asset', id);
    return await this.assetService.deleteById(id);
  }
}
