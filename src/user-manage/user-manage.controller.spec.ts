import { Test, TestingModule } from '@nestjs/testing';
import { UserManageController } from './user-manage.controller';
import { UserManageService } from './user-manage.service';

describe('UserManageController', () => {
  let controller: UserManageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserManageController],
      providers: [UserManageService],
    }).compile();

    controller = module.get<UserManageController>(UserManageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
