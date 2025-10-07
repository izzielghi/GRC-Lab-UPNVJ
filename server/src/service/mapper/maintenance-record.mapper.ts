import { MaintenanceRecord } from '../../domain/maintenance-record.entity';
import { MaintenanceRecordDTO } from '../dto/maintenance-record.dto';

/**
 * A MaintenanceRecord mapper object.
 */
export class MaintenanceRecordMapper {
  static fromDTOtoEntity(entityDTO: MaintenanceRecordDTO): MaintenanceRecord {
    if (!entityDTO) {
      return;
    }
    const entity = new MaintenanceRecord();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: MaintenanceRecord): MaintenanceRecordDTO {
    if (!entity) {
      return;
    }
    const entityDTO = new MaintenanceRecordDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
