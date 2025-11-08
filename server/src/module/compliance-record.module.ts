import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComplianceRecord } from '../domain/compliance-record.entity';
import { ComplianceRecordController } from '../web/rest/compliance-record.controller';
import { ComplianceRecordService } from '../service/compliance-record.service';

@Module({
  imports: [TypeOrmModule.forFeature([ComplianceRecord])],
  controllers: [ComplianceRecordController],
  providers: [ComplianceRecordService],
  exports: [ComplianceRecordService],
})
export class ComplianceRecordModule {}
