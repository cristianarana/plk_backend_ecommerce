import { User } from '../entities/user.entity';
import { IUserProfile } from '../interfaces/user-profile.interface';
import { IUserResponse } from '../interfaces/user-response.interface';

export function mapUserToResponse(user: User): IUserResponse {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
}

export function mapUserToProfile(user: User): IUserProfile {
  return {
    username: user.username,
    email: user.email,
    birthdate: user.birthdate,
    address: user.address,
    country: user.country,
    role: user.role,
  };
}