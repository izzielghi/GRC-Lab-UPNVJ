import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { AssetDTO } from '../src/service/dto/asset.dto';
import { AssetService } from '../src/service/asset.service';

describe('Asset Controller', () => {
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
      .overrideProvider(AssetService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all assets ', async () => {
    const getEntities: AssetDTO[] = (await request(app.getHttpServer()).get('/api/assets').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET assets by id', async () => {
    const getEntity: AssetDTO = (await request(app.getHttpServer()).get(`/api/assets/${entityMock.id}`).expect(200)).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create assets', async () => {
    const createdEntity: AssetDTO = (await request(app.getHttpServer()).post('/api/assets').send(entityMock).expect(201)).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update assets', async () => {
    const updatedEntity: AssetDTO = (await request(app.getHttpServer()).put('/api/assets').send(entityMock).expect(201)).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update assets from id', async () => {
    const updatedEntity: AssetDTO = (await request(app.getHttpServer()).put(`/api/assets/${entityMock.id}`).send(entityMock).expect(201))
      .body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE assets', async () => {
    const deletedEntity: AssetDTO = (await request(app.getHttpServer()).delete(`/api/assets/${entityMock.id}`).expect(204)).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app?.close();
  });
});
