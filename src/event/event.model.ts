import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserModel } from '../user/user.model';
import { Invitation } from '../invitation/invitation.model';

@Entity('events')
export class EventModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @ManyToOne(() => UserModel, (user) => user.events)
  user: UserModel;

  @OneToMany(() => Invitation, (invitation) => invitation.event, {
    cascade: true,
  })
  invitations: Invitation[];
}
