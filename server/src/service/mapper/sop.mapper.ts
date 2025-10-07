import { SOP } from '../../domain/sop.entity';
import { SOPDTO } from '../dto/sop.dto';

/**
 * A SOP mapper object.
 */
export class SOPMapper {
  static fromDTOtoEntity(entityDTO: SOPDTO): SOP {
    if (!entityDTO) {
      return;
    }
    const entity = new SOP();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: SOP): SOPDTO {
    if (!entity) {
      return;
    }
    const entityDTO = new SOPDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
