export interface IRoom {
  id?: number;
  name?: string;
  code?: string;
  capacity?: number | null;
  locationDetails?: string | null;
}

export const defaultValue: Readonly<IRoom> = {};
