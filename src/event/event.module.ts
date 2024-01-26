import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { EventController } from './event.controller';
import { EventModel } from './event.model';
import { EventService } from './event.service';
import { UserModel } from '../user/user.model'; // Import UserModel

@Module({
  imports: [TypeOrmModule.forFeature([EventModel, UserModel]), UserModule],
  providers: [EventService, UserService],
  controllers: [EventController],
  exports: [EventService],
})
export class EventModule {}
