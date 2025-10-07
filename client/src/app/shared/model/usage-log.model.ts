import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';
import { IRoom } from 'app/shared/model/room.model';
import { IAsset } from 'app/shared/model/asset.model';

export interface IUsageLog {
  id?: number;
  dateTime?: dayjs.Dayjs;
  purpose?: string;
  duration?: number | null;
  user?: IUser | null;
  room?: IRoom | null;
  asset?: IAsset;
}

export const defaultValue: Readonly<IUsageLog> = {};
