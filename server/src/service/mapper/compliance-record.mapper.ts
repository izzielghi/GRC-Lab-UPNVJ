import { ComplianceRecord } from '../../domain/compliance-record.entity';
import { ComplianceRecordDTO } from '../dto/compliance-record.dto';

/**
 * A ComplianceRecord mapper object.
 */
export class ComplianceRecordMapper {
  static fromDTOtoEntity(entityDTO: ComplianceRecordDTO): ComplianceRecord {
    if (!entityDTO) {
      return;
    }
    const entity = new ComplianceRecord();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: ComplianceRecord): ComplianceRecordDTO {
    if (!entity) {
      return;
    }
    const entityDTO = new ComplianceRecordDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
