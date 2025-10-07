import { ComplianceChecklist } from '../../domain/compliance-checklist.entity';
import { ComplianceChecklistDTO } from '../dto/compliance-checklist.dto';

/**
 * A ComplianceChecklist mapper object.
 */
export class ComplianceChecklistMapper {
  static fromDTOtoEntity(entityDTO: ComplianceChecklistDTO): ComplianceChecklist {
    if (!entityDTO) {
      return;
    }
    const entity = new ComplianceChecklist();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: ComplianceChecklist): ComplianceChecklistDTO {
    if (!entity) {
      return;
    }
    const entityDTO = new ComplianceChecklistDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
