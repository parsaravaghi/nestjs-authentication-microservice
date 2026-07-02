import { User } from '@app/database';
import { QueryFailedError, Repository } from 'typeorm';
import { UsersService } from '../src/users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RegisterDto } from '@app/constracts';
import { UserDuplicateException } from '../src/exceptions/user-duplicate.exception';
import { InternalServerException, UnknownDbError } from '@app/common';

describe('UserService (unit)', () => {
  let userRepo: jest.Mocked<Partial<Repository<User>>>;
  let service: UsersService;

  beforeEach(async () => {
    userRepo = {
      create: jest.fn(),
      save: jest.fn(),
    };

    const modules: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: userRepo,
        },
      ],
    }).compile();

    service = modules.get(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    const userDto: RegisterDto = {
      username: 'parsa',
      password: '1234',
      email: 'p@gmail.com',
    };
    const user = {
      id: 1,
      ...userDto,
      isActive: true,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
      password: undefined,
    } as User;
    it('should return user entity', async () => {
      userRepo.create!.mockReturnValue(user);
      userRepo.save!.mockResolvedValue(user);

      const result = await service.createUser(userDto);

      expect(result).toBe(user);
    });
    it('should throw duplicate error', async () => {
      userRepo.create!.mockReturnValue(user);
      const queryError = new QueryFailedError(
        '',
        [],
        new Error(),
      ) as QueryFailedError & {
        code: string;
      };
      queryError.code = '23505';
      userRepo.save!.mockRejectedValue(queryError);

      await expect(service.createUser(userDto)).rejects.toThrow(
        UserDuplicateException,
      );
    });

    it('should throw duplicate error', async () => {
      userRepo.create!.mockReturnValue(user);
      const queryError = new Error('connection error');
      queryError.code = '23505';
      userRepo.save!.mockRejectedValue(queryError);

      await expect(service.createUser(userDto)).rejects.toThrow(
        InternalServerException,
      );
    });
    it('should throw duplicate error', async () => {
      userRepo.create!.mockReturnValue(user);
      const queryError = new QueryFailedError(
        '',
        [],
        new Error(),
      ) as QueryFailedError & {
        code: string;
      };
      queryError.code = '23502';
      userRepo.save!.mockRejectedValue(queryError);

      await expect(service.createUser(userDto)).rejects.toThrow(UnknownDbError);
    });
  });
});
