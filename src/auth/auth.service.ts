import { Injectable } from '@nestjs/common';
import { IUser } from 'src/users/interfaces/user.interface';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { EncryptService } from 'src/tools/encrypt.service';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private encryptService: EncryptService,
  ) {}

  async validateUser(email: string, password: string): Promise<IUser> {
    const user = await this.usersService.findOneByEmail(email);

    if (user) {
      const isValidPassword = await this.encryptService.compare(
        password,
        user.password,
      );

      //to-do comparar passwords
      if (isValidPassword) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result as IUser;
      }
    }
    return null;

    // if (user && user.password === password) {
    //   const { password, ...result } = user;

    //   return result as IUser;
    // }
    // return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
