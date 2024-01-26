import { Module, forwardRef } from '@nestjs/common'; // Import forwardRef
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from '../event/event.module';
import { UserController } from './user.controller';
import { UserModel } from './user.model';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserModel]),
    forwardRef(() => EventModule),
  ], // Use forwardRef here
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
