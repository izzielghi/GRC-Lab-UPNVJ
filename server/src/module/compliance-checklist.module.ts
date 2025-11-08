import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComplianceChecklist } from '../domain/compliance-checklist.entity';
import { ComplianceChecklistController } from '../web/rest/compliance-checklist.controller';
import { ComplianceChecklistService } from '../service/compliance-checklist.service';

@Module({
  imports: [TypeOrmModule.forFeature([ComplianceChecklist])],
  controllers: [ComplianceChecklistController],
  providers: [ComplianceChecklistService],
  exports: [ComplianceChecklistService],
})
export class ComplianceChecklistModule {}
