import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { SOPDTO } from '../src/service/dto/sop.dto';
import { SOPService } from '../src/service/sop.service';

describe('SOP Controller', () => {
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
      .overrideProvider(SOPService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all sops ', async () => {
    const getEntities: SOPDTO[] = (await request(app.getHttpServer()).get('/api/sops').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET sops by id', async () => {
    const getEntity: SOPDTO = (await request(app.getHttpServer()).get(`/api/sops/${entityMock.id}`).expect(200)).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create sops', async () => {
    const createdEntity: SOPDTO = (await request(app.getHttpServer()).post('/api/sops').send(entityMock).expect(201)).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update sops', async () => {
    const updatedEntity: SOPDTO = (await request(app.getHttpServer()).put('/api/sops').send(entityMock).expect(201)).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update sops from id', async () => {
    const updatedEntity: SOPDTO = (await request(app.getHttpServer()).put(`/api/sops/${entityMock.id}`).send(entityMock).expect(201)).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE sops', async () => {
    const deletedEntity: SOPDTO = (await request(app.getHttpServer()).delete(`/api/sops/${entityMock.id}`).expect(204)).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app?.close();
  });
});
