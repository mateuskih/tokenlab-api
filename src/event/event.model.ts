import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserModel } from '../user/user.model';

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
}
