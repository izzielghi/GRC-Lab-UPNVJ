import { Room } from '../../domain/room.entity';
import { RoomDTO } from '../dto/room.dto';

/**
 * A Room mapper object.
 */
export class RoomMapper {
  static fromDTOtoEntity(entityDTO: RoomDTO): Room {
    if (!entityDTO) {
      return;
    }
    const entity = new Room();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: Room): RoomDTO {
    if (!entity) {
      return;
    }
    const entityDTO = new RoomDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
