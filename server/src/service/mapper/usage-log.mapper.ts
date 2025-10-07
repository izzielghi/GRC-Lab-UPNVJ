import { UsageLog } from '../../domain/usage-log.entity';
import { UsageLogDTO } from '../dto/usage-log.dto';

/**
 * A UsageLog mapper object.
 */
export class UsageLogMapper {
  static fromDTOtoEntity(entityDTO: UsageLogDTO): UsageLog {
    if (!entityDTO) {
      return;
    }
    const entity = new UsageLog();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: UsageLog): UsageLogDTO {
    if (!entity) {
      return;
    }
    const entityDTO = new UsageLogDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
