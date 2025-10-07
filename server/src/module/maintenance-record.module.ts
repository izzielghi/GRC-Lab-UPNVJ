import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaintenanceRecord } from '../domain/maintenance-record.entity';
import { MaintenanceRecordController } from '../web/rest/maintenance-record.controller';
import { MaintenanceRecordService } from '../service/maintenance-record.service';

@Module({
  imports: [TypeOrmModule.forFeature([MaintenanceRecord])],
  controllers: [MaintenanceRecordController],
  providers: [MaintenanceRecordService],
  exports: [MaintenanceRecordService],
})
export class MaintenanceRecordModule {}
