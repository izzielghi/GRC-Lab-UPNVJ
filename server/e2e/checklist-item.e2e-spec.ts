import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { ChecklistItemDTO } from '../src/service/dto/checklist-item.dto';
import { ChecklistItemService } from '../src/service/checklist-item.service';

describe('ChecklistItem Controller', () => {
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
      .overrideProvider(ChecklistItemService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all checklist-items ', async () => {
    const getEntities: ChecklistItemDTO[] = (await request(app.getHttpServer()).get('/api/checklist-items').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET checklist-items by id', async () => {
    const getEntity: ChecklistItemDTO = (await request(app.getHttpServer()).get(`/api/checklist-items/${entityMock.id}`).expect(200)).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create checklist-items', async () => {
    const createdEntity: ChecklistItemDTO = (await request(app.getHttpServer()).post('/api/checklist-items').send(entityMock).expect(201))
      .body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update checklist-items', async () => {
    const updatedEntity: ChecklistItemDTO = (await request(app.getHttpServer()).put('/api/checklist-items').send(entityMock).expect(201))
      .body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update checklist-items from id', async () => {
    const updatedEntity: ChecklistItemDTO = (
      await request(app.getHttpServer()).put(`/api/checklist-items/${entityMock.id}`).send(entityMock).expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE checklist-items', async () => {
    const deletedEntity: ChecklistItemDTO = (await request(app.getHttpServer()).delete(`/api/checklist-items/${entityMock.id}`).expect(204))
      .body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app?.close();
  });
});
