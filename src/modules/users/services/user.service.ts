import { inject, injectable } from 'tsyringe';
import { IUserProfile } from '../interfaces/user-profile.interface';
import { IUserResponse } from '../interfaces/user-response.interface';
import { UserRepository } from '../repositories/user.repository';
import { mapUserToProfile, mapUserToResponse } from '../utils/map-response';

@injectable()
export class UserService {
  constructor(@inject(UserRepository) private readonly userRepository: UserRepository) {}

  async getUserByEmail(email: string): Promise<IUserResponse> {
    const user = (await this.userRepository.get(email))[0];
    if (!user) {
      throw new Error('User not found');
    }
    return mapUserToResponse(user);
  }

  async findById(id: string): Promise<IUserProfile> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('user not exists');
    }
    return mapUserToProfile(user);
  }
}