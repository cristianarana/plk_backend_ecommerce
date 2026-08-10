import { Roles } from '../../../../shared/enums/roles.enum';
import { User } from '../../../../modules/users/entities/user.entity';
import { IUserResponse } from '../../../../modules/users/interfaces/user-response.interface';
import { UserRepository } from '../../../../modules/users/repositories/user.repository';
import { UserService } from '../../../../modules/users/services/user.service';

describe('UserService', () => {
  let service: UserService;
  let repository: jest.Mocked<UserRepository>;

  const user = {
    id: '7f9a3c1e-5b2d-4f8a-9c4e-2f6d0a1b8c3d',
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
    repository = { get: jest.fn() } as unknown as jest.Mocked<UserRepository>;
    service = new UserService(repository);
  });

  it('returns the mapped user when the email matches an existing user', async () => {
    repository.get.mockResolvedValue([user]);

    const result = await service.getUserByEmail('testuser@server.com');

    expect(repository.get).toHaveBeenCalledWith('testuser@server.com');
    expect(result).toEqual({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    } as IUserResponse);
  });

  it('throws "User not found" when no user matches the email', async () => {
    repository.get.mockResolvedValue([]);

    await expect(service.getUserByEmail('ghost@server.com')).rejects.toThrow(
      'User not found',
    );
  });
});