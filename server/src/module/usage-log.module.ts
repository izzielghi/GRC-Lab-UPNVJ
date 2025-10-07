import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsageLog } from '../domain/usage-log.entity';
import { UsageLogController } from '../web/rest/usage-log.controller';
import { UsageLogService } from '../service/usage-log.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsageLog])],
  controllers: [UsageLogController],
  providers: [UsageLogService],
  exports: [UsageLogService],
})
export class UsageLogModule {}
