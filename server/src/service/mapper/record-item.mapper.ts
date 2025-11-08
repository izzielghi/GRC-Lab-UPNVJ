import { RecordItem } from '../../domain/record-item.entity';
import { RecordItemDTO } from '../dto/record-item.dto';

/**
 * A RecordItem mapper object.
 */
export class RecordItemMapper {
  static fromDTOtoEntity(entityDTO: RecordItemDTO): RecordItem {
    if (!entityDTO) {
      return;
    }
    const entity = new RecordItem();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: RecordItem): RecordItemDTO {
    if (!entity) {
      return;
    }
    const entityDTO = new RecordItemDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
