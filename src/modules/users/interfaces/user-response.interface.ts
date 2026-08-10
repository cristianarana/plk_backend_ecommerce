import { Roles } from '../../../shared/enums/roles.enum';

export interface IUserResponse {
  id: string;
  username: string;
  email: string;
  role: Roles;
}