import { SOPStatus } from 'app/shared/model/enumerations/sop-status.model';

export interface ISOP {
  id?: number;
  title?: string;
  documentPath?: string;
  version?: string | null;
  status?: keyof typeof SOPStatus;
}

export const defaultValue: Readonly<ISOP> = {};
