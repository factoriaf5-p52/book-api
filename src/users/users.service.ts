import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Encrypt } from 'src/tools/encrypt.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private encryptService: Encrypt,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      // console.log(createUserDto.password);

      // const encryptPassword = await this.encryptService.encrypt(
      //   createUserDto.password,
      // );
      // console.log(encryptPassword);

      // const userEncrypted = { password: encryptPassword, ...createUserDto };
      const result = await this.userRepository.save(createUserDto);

      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
