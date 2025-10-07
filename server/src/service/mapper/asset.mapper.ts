import { Asset } from '../../domain/asset.entity';
import { AssetDTO } from '../dto/asset.dto';

/**
 * A Asset mapper object.
 */
export class AssetMapper {
  static fromDTOtoEntity(entityDTO: AssetDTO): Asset {
    if (!entityDTO) {
      return;
    }
    const entity = new Asset();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: Asset): AssetDTO {
    if (!entity) {
      return;
    }
    const entityDTO = new AssetDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
