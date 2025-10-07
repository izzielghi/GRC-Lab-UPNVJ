import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { UsageLogDTO } from '../src/service/dto/usage-log.dto';
import { UsageLogService } from '../src/service/usage-log.service';

describe('UsageLog Controller', () => {
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
      .overrideProvider(UsageLogService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all usage-logs ', async () => {
    const getEntities: UsageLogDTO[] = (await request(app.getHttpServer()).get('/api/usage-logs').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET usage-logs by id', async () => {
    const getEntity: UsageLogDTO = (await request(app.getHttpServer()).get(`/api/usage-logs/${entityMock.id}`).expect(200)).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create usage-logs', async () => {
    const createdEntity: UsageLogDTO = (await request(app.getHttpServer()).post('/api/usage-logs').send(entityMock).expect(201)).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update usage-logs', async () => {
    const updatedEntity: UsageLogDTO = (await request(app.getHttpServer()).put('/api/usage-logs').send(entityMock).expect(201)).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update usage-logs from id', async () => {
    const updatedEntity: UsageLogDTO = (
      await request(app.getHttpServer()).put(`/api/usage-logs/${entityMock.id}`).send(entityMock).expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE usage-logs', async () => {
    const deletedEntity: UsageLogDTO = (await request(app.getHttpServer()).delete(`/api/usage-logs/${entityMock.id}`).expect(204)).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app?.close();
  });
});
