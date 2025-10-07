import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { ComplianceChecklistDTO } from '../src/service/dto/compliance-checklist.dto';
import { ComplianceChecklistService } from '../src/service/compliance-checklist.service';

describe('ComplianceChecklist Controller', () => {
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
      .overrideProvider(ComplianceChecklistService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all compliance-checklists ', async () => {
    const getEntities: ComplianceChecklistDTO[] = (await request(app.getHttpServer()).get('/api/compliance-checklists').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET compliance-checklists by id', async () => {
    const getEntity: ComplianceChecklistDTO = (
      await request(app.getHttpServer()).get(`/api/compliance-checklists/${entityMock.id}`).expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create compliance-checklists', async () => {
    const createdEntity: ComplianceChecklistDTO = (
      await request(app.getHttpServer()).post('/api/compliance-checklists').send(entityMock).expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update compliance-checklists', async () => {
    const updatedEntity: ComplianceChecklistDTO = (
      await request(app.getHttpServer()).put('/api/compliance-checklists').send(entityMock).expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update compliance-checklists from id', async () => {
    const updatedEntity: ComplianceChecklistDTO = (
      await request(app.getHttpServer()).put(`/api/compliance-checklists/${entityMock.id}`).send(entityMock).expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE compliance-checklists', async () => {
    const deletedEntity: ComplianceChecklistDTO = (
      await request(app.getHttpServer()).delete(`/api/compliance-checklists/${entityMock.id}`).expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app?.close();
  });
});
