import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Injectable()
export class Encrypt {
  async encrypt(password: string) {
    const saltOrRounds = 10;
    console.log(password);
    
    const result = await bcrypt.hash(password, saltOrRounds);
    console.log(result);

    return result;
  }
  async compare(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}
