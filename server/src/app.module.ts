import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './module/auth.module';
import { ormConfig } from './orm.config';
import { config } from './config';
import { AssetModule } from './module/asset.module';
import { UsageLogModule } from './module/usage-log.module';
import { MaintenanceRecordModule } from './module/maintenance-record.module';
import { IncidentModule } from './module/incident.module';
import { SOPModule } from './module/sop.module';
import { ComplianceChecklistModule } from './module/compliance-checklist.module';
import { ChecklistItemModule } from './module/checklist-item.module';
import { RoomModule } from './module/room.module';
import { BookingModule } from './module/booking.module';
import { ComplianceRecordModule } from './module/compliance-record.module';
import { RecordItemModule } from './module/record-item.module';
// jhipster-needle-add-entity-module-to-main-import - JHipster will import entity modules here, do not remove
// jhipster-needle-add-controller-module-to-main-import - JHipster will import controller modules here, do not remove
// jhipster-needle-add-service-module-to-main-import - JHipster will import service modules here, do not remove

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useFactory: ormConfig }),
    ServeStaticModule.forRoot({
      rootPath: config.getClientPath(),
    }),
    AuthModule,
    AssetModule,
    UsageLogModule,
    MaintenanceRecordModule,
    IncidentModule,
    SOPModule,
    ComplianceChecklistModule,
    ChecklistItemModule,
    RoomModule,
    BookingModule,
    ComplianceRecordModule,
    RecordItemModule,
    // jhipster-needle-add-entity-module-to-main - JHipster will add entity modules here, do not remove
  ],
  controllers: [
    // jhipster-needle-add-controller-module-to-main - JHipster will add controller modules here, do not remove
  ],
  providers: [
    // jhipster-needle-add-service-module-to-main - JHipster will add service modules here, do not remove
  ],
})
export class AppModule {}
