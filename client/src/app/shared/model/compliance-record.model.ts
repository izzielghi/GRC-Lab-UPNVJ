import dayjs from 'dayjs';

export interface IComplianceRecord {
  id?: number;
  dateTime?: dayjs.Dayjs;
  isCompleted?: boolean;
}

export const defaultValue: Readonly<IComplianceRecord> = {
  isCompleted: false,
};
