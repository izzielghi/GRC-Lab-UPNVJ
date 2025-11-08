import dayjs from 'dayjs';
import { IComplianceRecord } from 'app/shared/model/compliance-record.model';
import { IUser } from 'app/shared/model/user.model';
import { IAsset } from 'app/shared/model/asset.model';
import { IRoom } from 'app/shared/model/room.model';
import { BookingStatus } from 'app/shared/model/enumerations/booking-status.model';

export interface IBooking {
  id?: number;
  title?: string;
  startTime?: dayjs.Dayjs;
  endTime?: dayjs.Dayjs;
  purpose?: string;
  status?: keyof typeof BookingStatus | null;
  notes?: string | null;
  complianceRecord?: IComplianceRecord | null;
  user?: IUser;
  assets?: IAsset[] | null;
  rooms?: IRoom[] | null;
}

export const defaultValue: Readonly<IBooking> = {};
