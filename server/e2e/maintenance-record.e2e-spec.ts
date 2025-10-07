import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { MaintenanceRecordDTO } from '../src/service/dto/maintenance-record.dto';
import { MaintenanceRecordService } from '../src/service/maintenance-record.service';

describe('MaintenanceRecord Controller', () => {
  let app: INestApplication;

  const authGuardMock = { canActivate: (): any => true };
  const rolesGuardMock = { canActivate: (): any => true };
  const entityMock: any = {
    id: 'entityId',
  };

  const serviceMock = {
    findById: (): any => entityMock,
    findAndCount: (): any => [entityMock, 0],
    save: (): any => entityMock,
    update: (): any => entityMock,
    deleteById: (): any => entityMock,
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .overrideGuard(RolesGuard)
      .useValue(rolesGuardMock)
      .overrideProvider(MaintenanceRecordService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all maintenance-records ', async () => {
    const getEntities: MaintenanceRecordDTO[] = (await request(app.getHttpServer()).get('/api/maintenance-records').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET maintenance-records by id', async () => {
    const getEntity: MaintenanceRecordDTO = (
      await request(app.getHttpServer()).get(`/api/maintenance-records/${entityMock.id}`).expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create maintenance-records', async () => {
    const createdEntity: MaintenanceRecordDTO = (
      await request(app.getHttpServer()).post('/api/maintenance-records').send(entityMock).expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update maintenance-records', async () => {
    const updatedEntity: MaintenanceRecordDTO = (
      await request(app.getHttpServer()).put('/api/maintenance-records').send(entityMock).expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update maintenance-records from id', async () => {
    const updatedEntity: MaintenanceRecordDTO = (
      await request(app.getHttpServer()).put(`/api/maintenance-records/${entityMock.id}`).send(entityMock).expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE maintenance-records', async () => {
    const deletedEntity: MaintenanceRecordDTO = (
      await request(app.getHttpServer()).delete(`/api/maintenance-records/${entityMock.id}`).expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app?.close();
  });
});
