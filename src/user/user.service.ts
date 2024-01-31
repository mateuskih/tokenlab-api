import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './user.model';
import { Repository } from 'typeorm';
import { Invitation } from '../invitation/invitation.model';
import { InvitationWithStatus } from 'src/invitation/convite-status.enum';

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

  async getInvitedEvents(userId: number): Promise<InvitationWithStatus[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['invitations', 'invitations.event'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const invitedEvents: InvitationWithStatus[] = user.invitations.map(
      (invitation: Invitation) => ({
        event: invitation.event,
        status: invitation.status,
      }),
    );

    return invitedEvents;
  }

  async findAllUsers(): Promise<UserModel[]> {
    const users = await this.userRepository.find();
    if (!users || users.length === 0) {
      throw new NotFoundException('No users found');
    }
    return users;
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
