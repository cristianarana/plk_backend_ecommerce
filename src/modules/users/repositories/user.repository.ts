import { inject, injectable } from 'tsyringe';
import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';

@injectable()
export class UserRepository {
  constructor(@inject(DataSource) private readonly dataSource: DataSource) {}

  async get(email: string): Promise<User[]> {
    return this.dataSource.getRepository(User).findBy({ email });
  }

  async findById(id: string): Promise<User | null> {
    return this.dataSource.getRepository(User).findOneBy({ id });
  }
}