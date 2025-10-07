import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChecklistItem } from '../domain/checklist-item.entity';
import { ChecklistItemController } from '../web/rest/checklist-item.controller';
import { ChecklistItemService } from '../service/checklist-item.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChecklistItem])],
  controllers: [ChecklistItemController],
  providers: [ChecklistItemService],
  exports: [ChecklistItemService],
})
export class ChecklistItemModule {}
