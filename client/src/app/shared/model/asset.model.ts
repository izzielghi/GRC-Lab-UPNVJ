import dayjs from 'dayjs';
import { IRoom } from 'app/shared/model/room.model';
import { ISOP } from 'app/shared/model/sop.model';
import { AssetCondition } from 'app/shared/model/enumerations/asset-condition.model';

export interface IAsset {
  id?: number;
  name?: string;
  code?: string;
  condition?: keyof typeof AssetCondition | null;
  purchaseDate?: dayjs.Dayjs | null;
  warrantyEndDate?: dayjs.Dayjs | null;
  description?: string | null;
  location?: IRoom | null;
  rules?: ISOP[] | null;
}

export const defaultValue: Readonly<IAsset> = {};
