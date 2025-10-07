import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { RoomDTO } from '../src/service/dto/room.dto';
import { RoomService } from '../src/service/room.service';

describe('Room Controller', () => {
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
      .overrideProvider(RoomService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all rooms ', async () => {
    const getEntities: RoomDTO[] = (await request(app.getHttpServer()).get('/api/rooms').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET rooms by id', async () => {
    const getEntity: RoomDTO = (await request(app.getHttpServer()).get(`/api/rooms/${entityMock.id}`).expect(200)).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create rooms', async () => {
    const createdEntity: RoomDTO = (await request(app.getHttpServer()).post('/api/rooms').send(entityMock).expect(201)).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update rooms', async () => {
    const updatedEntity: RoomDTO = (await request(app.getHttpServer()).put('/api/rooms').send(entityMock).expect(201)).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update rooms from id', async () => {
    const updatedEntity: RoomDTO = (await request(app.getHttpServer()).put(`/api/rooms/${entityMock.id}`).send(entityMock).expect(201))
      .body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE rooms', async () => {
    const deletedEntity: RoomDTO = (await request(app.getHttpServer()).delete(`/api/rooms/${entityMock.id}`).expect(204)).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app?.close();
  });
});
