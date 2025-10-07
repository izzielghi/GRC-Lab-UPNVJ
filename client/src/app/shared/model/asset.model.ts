import dayjs from 'dayjs';
import { ISOP } from 'app/shared/model/sop.model';
import { AssetCondition } from 'app/shared/model/enumerations/asset-condition.model';

export interface IAsset {
  id?: number;
  name?: string;
  code?: string;
  location?: string | null;
  condition?: keyof typeof AssetCondition | null;
  purchaseDate?: dayjs.Dayjs | null;
  warrantyEndDate?: dayjs.Dayjs | null;
  sOPS?: ISOP[] | null;
}

export const defaultValue: Readonly<IAsset> = {};
