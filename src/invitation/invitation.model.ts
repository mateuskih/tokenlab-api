import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { UserModel } from '../user/user.model';
import { EventModel } from '../event/event.model';
import { ConviteStatusEnum } from './convite-status.enum';

@Entity('invitations')
export class Invitation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserModel, (user) => user.invitations)
  @JoinColumn({ name: 'invited_user_id' })
  invitedUser: UserModel;

  @ManyToOne(() => EventModel, (event) => event.invitations)
  @JoinColumn({ name: 'event_id' })
  event: EventModel;

  @Column({
    type: 'enum',
    enum: ConviteStatusEnum,
    default: ConviteStatusEnum.PENDING,
  })
  status: ConviteStatusEnum;
}
