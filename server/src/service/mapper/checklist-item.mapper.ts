import { ChecklistItem } from '../../domain/checklist-item.entity';
import { ChecklistItemDTO } from '../dto/checklist-item.dto';

/**
 * A ChecklistItem mapper object.
 */
export class ChecklistItemMapper {
  static fromDTOtoEntity(entityDTO: ChecklistItemDTO): ChecklistItem {
    if (!entityDTO) {
      return;
    }
    const entity = new ChecklistItem();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: ChecklistItem): ChecklistItemDTO {
    if (!entity) {
      return;
    }
    const entityDTO = new ChecklistItemDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
