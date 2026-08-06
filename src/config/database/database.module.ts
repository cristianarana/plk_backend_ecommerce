import { container } from 'tsyringe';
import { DataSource } from 'typeorm';
import { AppDataSource } from './datasource';

export async function connectDatabase(): Promise<DataSource> {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  container.register(DataSource, { useValue: AppDataSource });

  return AppDataSource;
}