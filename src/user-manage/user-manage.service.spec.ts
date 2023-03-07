import { Test, TestingModule } from '@nestjs/testing';
import { UserManageService } from './user-manage.service';

describe('UserManageService', () => {
  let service: UserManageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserManageService],
    }).compile();

    service = module.get<UserManageService>(UserManageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
