import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { EventModel } from '../event/event.model';
import { Invitation } from '../invitation/invitation.model';

@Entity('users')
export class UserModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => EventModel, (event) => event.user)
  events: EventModel[];

  @OneToMany(() => Invitation, (invitation) => invitation.invitedUser)
  invitations: Invitation[];
}
