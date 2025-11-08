import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { RecordItemDTO } from '../src/service/dto/record-item.dto';
import { RecordItemService } from '../src/service/record-item.service';

describe('RecordItem Controller', () => {
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
      .overrideProvider(RecordItemService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all record-items ', async () => {
    const getEntities: RecordItemDTO[] = (await request(app.getHttpServer()).get('/api/record-items').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET record-items by id', async () => {
    const getEntity: RecordItemDTO = (await request(app.getHttpServer()).get(`/api/record-items/${entityMock.id}`).expect(200)).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create record-items', async () => {
    const createdEntity: RecordItemDTO = (await request(app.getHttpServer()).post('/api/record-items').send(entityMock).expect(201)).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update record-items', async () => {
    const updatedEntity: RecordItemDTO = (await request(app.getHttpServer()).put('/api/record-items').send(entityMock).expect(201)).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update record-items from id', async () => {
    const updatedEntity: RecordItemDTO = (
      await request(app.getHttpServer()).put(`/api/record-items/${entityMock.id}`).send(entityMock).expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE record-items', async () => {
    const deletedEntity: RecordItemDTO = (await request(app.getHttpServer()).delete(`/api/record-items/${entityMock.id}`).expect(204)).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app?.close();
  });
});
