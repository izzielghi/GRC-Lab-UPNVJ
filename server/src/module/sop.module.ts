import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SOP } from '../domain/sop.entity';
import { SOPController } from '../web/rest/sop.controller';
import { SOPService } from '../service/sop.service';

@Module({
  imports: [TypeOrmModule.forFeature([SOP])],
  controllers: [SOPController],
  providers: [SOPService],
  exports: [SOPService],
})
export class SOPModule {}
