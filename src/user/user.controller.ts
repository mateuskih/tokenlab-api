import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserModel } from './user.model';
import { EventModel } from '../event/event.model';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body() body: { username: string; password: string },
  ): Promise<UserModel> {
    const { username, password } = body;
    return this.userService.createUser(username, password);
  }

  @Get()
  async findAllUsers(): Promise<UserModel[]> {
    return this.userService.findAllUsers();
  }

  @Get('id/:id')
  async findUserById(@Param('id') id: number): Promise<UserModel> {
    return this.userService.findUserById(id);
  }

  @Get('invited/:userId')
  async getInvitedEvents(
    @Param('userId') userId: number,
  ): Promise<EventModel[]> {
    try {
      const invitedEvents = await this.userService.getInvitedEvents(userId);
      return invitedEvents;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new NotFoundException('Error getting invited events');
    }
  }

  @Get('username/:username')
  async findUserByUsername(
    @Param('username') username: string,
  ): Promise<UserModel> {
    return this.userService.findUserByUsername(username);
  }

  @Put(':id')
  async updateUser(
    @Param('id') userId: number,
    @Body() body: { username: string; password: string },
  ): Promise<UserModel> {
    const { username, password } = body;
    return this.userService.updateUser(userId, username, password);
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: number): Promise<void> {
    return this.userService.deleteUser(userId);
  }
}
