import { IChecklistItem } from 'app/shared/model/checklist-item.model';
import { IComplianceRecord } from 'app/shared/model/compliance-record.model';

export interface IRecordItem {
  id?: number;
  isCompliant?: boolean | null;
  item?: IChecklistItem;
  record?: IComplianceRecord;
}

export const defaultValue: Readonly<IRecordItem> = {
  isCompliant: false,
};
