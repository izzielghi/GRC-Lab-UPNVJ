import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComplianceChecklist } from '../domain/compliance-checklist.entity';
import { ComplianceChecklistController } from '../web/rest/compliance-checklist.controller';
import { ComplianceChecklistService } from '../service/compliance-checklist.service';
import { ChecklistItem } from '../domain/checklist-item.entity';
import { ChecklistItemService } from '../service/checklist-item.service';

@Module({
  imports: [TypeOrmModule.forFeature([ComplianceChecklist, ChecklistItem])],
  controllers: [ComplianceChecklistController],
  providers: [ComplianceChecklistService, ChecklistItemService],
  exports: [ComplianceChecklistService],
})
export class ComplianceChecklistModule {}
