import { IComplianceChecklist } from 'app/shared/model/compliance-checklist.model';

export interface IChecklistItem {
  id?: number;
  description?: string;
  checklist?: IComplianceChecklist;
}

export const defaultValue: Readonly<IChecklistItem> = {};
