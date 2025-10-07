export interface ISOP {
  id?: number;
  title?: string;
  documentPath?: string;
  version?: string | null;
  isActive?: boolean | null;
}

export const defaultValue: Readonly<ISOP> = {
  isActive: false,
};
