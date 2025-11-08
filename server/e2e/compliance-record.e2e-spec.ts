import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { ComplianceRecordDTO } from '../src/service/dto/compliance-record.dto';
import { ComplianceRecordService } from '../src/service/compliance-record.service';

describe('ComplianceRecord Controller', () => {
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
      .overrideProvider(ComplianceRecordService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all compliance-records ', async () => {
    const getEntities: ComplianceRecordDTO[] = (await request(app.getHttpServer()).get('/api/compliance-records').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET compliance-records by id', async () => {
    const getEntity: ComplianceRecordDTO = (await request(app.getHttpServer()).get(`/api/compliance-records/${entityMock.id}`).expect(200))
      .body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create compliance-records', async () => {
    const createdEntity: ComplianceRecordDTO = (
      await request(app.getHttpServer()).post('/api/compliance-records').send(entityMock).expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update compliance-records', async () => {
    const updatedEntity: ComplianceRecordDTO = (
      await request(app.getHttpServer()).put('/api/compliance-records').send(entityMock).expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update compliance-records from id', async () => {
    const updatedEntity: ComplianceRecordDTO = (
      await request(app.getHttpServer()).put(`/api/compliance-records/${entityMock.id}`).send(entityMock).expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE compliance-records', async () => {
    const deletedEntity: ComplianceRecordDTO = (
      await request(app.getHttpServer()).delete(`/api/compliance-records/${entityMock.id}`).expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app?.close();
  });
});
