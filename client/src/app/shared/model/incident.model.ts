import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';
import { IAsset } from 'app/shared/model/asset.model';
import { IncidentType } from 'app/shared/model/enumerations/incident-type.model';

export interface IIncident {
  id?: number;
  title?: string;
  description?: string;
  type?: keyof typeof IncidentType;
  date?: dayjs.Dayjs;
  mitigationAction?: string | null;
  user?: IUser | null;
  asset?: IAsset;
}

export const defaultValue: Readonly<IIncident> = {};
