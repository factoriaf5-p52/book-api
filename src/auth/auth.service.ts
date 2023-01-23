import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { IUser } from 'src/users/interfaces/user.interface';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<IUser> {
    try {
      const user = await this.usersService.findOneByEmail(email);

      console.log(user.password, password);

      if (user && user.password === password) {
        const { password, ...result } = user;
        console.log(result);

        return result;
      }
      return null;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async login(user: User) {
    try {
    //   const validatedUser = await this.validateUser(user.email, user.password);
    //   const payload = { email: validatedUser.email, sub: validatedUser.id };
      return {
        access_token: this.jwtService.sign(user),
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
