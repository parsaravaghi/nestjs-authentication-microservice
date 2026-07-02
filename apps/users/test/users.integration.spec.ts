import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../src/users.service';
import { UsersModule } from '../src/users.module';
import { UserDuplicateException } from '../src/exceptions/user-duplicate.exception';
import bcrypt from 'bcrypt';

describe('UserService (integration)', () => {
  let service: UsersService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();

    service = module.get(UsersService);
  });

  describe('register', () => {
    it('should register a user and return it without password', async () => {
      const dto = {
        username: Math.random().toString(30).slice(5),
        password: '1234',
        email: `${Math.random().toString(30).slice(5)}@gmail.com`,
      };

      const result = await service.createUser(dto);
      expect({ username: result.username, email: result.email }).toEqual({
        username: dto.username,
        email: dto.email,
      });
      expect(bcrypt.compare(dto.password, result.password)).toBeTruthy();
    });

    it('should throw duplicate username error', async () => {
      const userDto = {
        username: Math.random().toString(30),
        password: '1234',
        email: `${Math.random().toString(30)}@gmail.com`,
      };

      await service.createUser(userDto);
      await expect(service.createUser(userDto)).rejects.toThrow(
        UserDuplicateException,
      );
    });
  });
});
