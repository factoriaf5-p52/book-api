import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { IUser } from 'src/users/interfaces/user.interface';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { EncryptService } from '../tools/encrypt.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private encryptService: EncryptService,
  ) {}

  async validateUser(email: string, password: string): Promise<IUser> {
    try {
      const user = await this.usersService.findOneByEmail(email);

      if (user) {
        const isValidUser = await this.encryptService.compare(
          password,
          user.password,
        );

        if (isValidUser) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password, ...result } = user;
          return result;
        }
      }
      return null;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async login(user: User) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }
}
