import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordItem } from '../domain/record-item.entity';
import { RecordItemController } from '../web/rest/record-item.controller';
import { RecordItemService } from '../service/record-item.service';

@Module({
  imports: [TypeOrmModule.forFeature([RecordItem])],
  controllers: [RecordItemController],
  providers: [RecordItemService],
  exports: [RecordItemService],
})
export class RecordItemModule {}
