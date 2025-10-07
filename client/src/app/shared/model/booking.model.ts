import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';
import { IRoom } from 'app/shared/model/room.model';
import { BookingStatus } from 'app/shared/model/enumerations/booking-status.model';

export interface IBooking {
  id?: number;
  startTime?: dayjs.Dayjs;
  endTime?: dayjs.Dayjs;
  purpose?: string;
  status?: keyof typeof BookingStatus | null;
  user?: IUser;
  room?: IRoom;
}

export const defaultValue: Readonly<IBooking> = {};
