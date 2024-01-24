import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserModel } from './user.model';

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

  @Get('id/:id')
  async findUserById(@Param('id') id: number): Promise<UserModel> {
    return this.userService.findUserById(id);
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
