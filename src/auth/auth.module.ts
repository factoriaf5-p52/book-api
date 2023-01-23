import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { LoginController } from './login.controller';
import { AuthService } from './auth.service';

import { LocalStrategy } from './strategies/local.strategy';
import { jwtConstants } from './constants/constant';
import { EncryptService } from 'src/tools/encrypt.service';
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1s' },
    }),
    UsersModule,
  ],
  controllers: [LoginController],
  providers: [JwtStrategy, LocalStrategy, AuthService, EncryptService],
  exports: [AuthService],
})
export class AuthModule {}
