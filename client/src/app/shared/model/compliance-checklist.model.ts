import { ISOP } from 'app/shared/model/sop.model';

export interface IComplianceChecklist {
  id?: number;
  name?: string;
  description?: string | null;
  sop?: ISOP | null;
}

export const defaultValue: Readonly<IComplianceChecklist> = {};
