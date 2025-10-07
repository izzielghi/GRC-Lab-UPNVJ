import dayjs from 'dayjs';

export interface IComplianceChecklist {
  id?: number;
  name?: string;
  dateTime?: dayjs.Dayjs | null;
  isCompleted?: boolean;
}

export const defaultValue: Readonly<IComplianceChecklist> = {
  isCompleted: false,
};
