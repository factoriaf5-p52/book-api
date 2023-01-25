import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { LoginController } from './login.controller';

describe('LoginController', () => {
  let controller: LoginController;
  const mockAuthService = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
    })
    .overrideProvider(AuthService)
    .useValue(mockAuthService)
    .compile();

    controller = module.get<LoginController>(LoginController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
