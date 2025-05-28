import * as bcrypt from 'bcrypt';
import { AppDataSource } from './config/data-source';
import { User } from './modules/user/entities/user.entity';

async function seed() {
  await AppDataSource.initialize();
  const userRepo = AppDataSource.getRepository(User);

  const hashedPassword = await bcrypt.hash('password123', 10);

  await userRepo.save({
    id: 1,
    email: 'test@mail.com',
    password: hashedPassword,
    name: 'Seeder User',
  });

  console.log('✅ Seeder done');
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
