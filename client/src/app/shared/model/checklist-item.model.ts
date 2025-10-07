import { IComplianceChecklist } from 'app/shared/model/compliance-checklist.model';

export interface IChecklistItem {
  id?: number;
  description?: string;
  isCompliant?: boolean | null;
  checklist?: IComplianceChecklist;
}

export const defaultValue: Readonly<IChecklistItem> = {
  isCompliant: false,
};
