import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { genSalt, hash, compare } from 'bcrypt';
@Injectable()
export class EncryptService {
  async encrypt(password: string) {
    try {
      const salt = await genSalt(10);
      const hashPassword = await hash(password, salt);
      return hashPassword;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  async compare(password: string, hash: string) {
    return compare(password, hash);
  }
}
