import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';
import { IAsset } from 'app/shared/model/asset.model';

export interface IMaintenanceRecord {
  id?: number;
  date?: dayjs.Dayjs;
  description?: string;
  cost?: number | null;
  nextServiceDate?: dayjs.Dayjs | null;
  user?: IUser | null;
  asset?: IAsset;
}

export const defaultValue: Readonly<IMaintenanceRecord> = {};
