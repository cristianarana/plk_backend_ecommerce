import { Roles } from '../../../shared/enums/roles.enum';

export interface IUserProfile {
  username: string;
  email: string;
  birthdate: Date;
  address: string;
  country: string;
  role: Roles;
}