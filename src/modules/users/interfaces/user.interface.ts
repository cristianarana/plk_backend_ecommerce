import { Roles } from '../../../shared/enums/roles.enum';

export interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  role: Roles;
  birthdate: Date;
  address: string;
  city: string;
  country: string;
  createdAt: Date;
  deletedAt: Date | null;
}