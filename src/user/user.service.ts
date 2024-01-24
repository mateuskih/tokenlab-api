import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './user.model';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
  ) {}

  async createUser(username: string, password: string): Promise<UserModel> {
    const user = this.userRepository.create({ username, password });
    return await this.userRepository.save(user);
  }

  async findUserById(id: number): Promise<UserModel> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findUserByUsername(username: string): Promise<UserModel> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findUserByUsernameAndPassword(
    username: string,
    password: string,
  ): Promise<UserModel> {
    const user = await this.userRepository.findOne({
      where: { username, password },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    return user;
  }

  async updateUser(
    userId: number,
    username: string,
    password: string,
  ): Promise<UserModel> {
    const user = await this.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.username = username;
    user.password = password;

    return await this.userRepository.save(user);
  }

  async deleteUser(userId: number): Promise<void> {
    const user = await this.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.remove(user);
  }
}
