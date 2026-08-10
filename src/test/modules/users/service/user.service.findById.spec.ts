import { Roles } from '../../../../shared/enums/roles.enum';
import { User } from '../../../../modules/users/entities/user.entity';
import { IUserProfile } from '../../../../modules/users/interfaces/user-profile.interface';
import { UserRepository } from '../../../../modules/users/repositories/user.repository';
import { UserService } from '../../../../modules/users/services/user.service';

describe('UserService.findById', () => {
  let service: UserService;
  let repository: jest.Mocked<UserRepository>;

  const userId = '7f9a3c1e-5b2d-4f8a-9c4e-2f6d0a1b8c3d';

  const user = {
    id: userId,
    name: 'Test User',
    username: 'testuser',
    email: 'testuser@server.com',
    password: 'hashed-password',
    role: Roles.Customer,
    birthdate: new Date('2000-01-01'),
    address: 'Av. Siempre Viva 123',
    city: 'Buenos Aires',
    country: 'Argentina',
    createdAt: new Date('2026-01-01T00:00:00.000Z'),
    deletedAt: null,
  } as User;

  beforeEach(() => {
    repository = { findById: jest.fn() } as unknown as jest.Mocked<UserRepository>;
    service = new UserService(repository);
  });

  it('returns the user profile when a user matches the id', async () => {
    repository.findById.mockResolvedValue(user);

    const result = await service.findById(userId);

    expect(repository.findById).toHaveBeenCalledWith(userId);
    expect(result).toEqual({
      username: user.username,
      email: user.email,
      birthdate: user.birthdate,
      address: user.address,
      country: user.country,
      role: user.role,
    } as IUserProfile);
  });

  it('throws "user not exists" when no user matches the id', async () => {
    repository.findById.mockResolvedValue(null);

    await expect(service.findById(userId)).rejects.toThrow('user not exists');
  });
});