import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventModel } from './event.model';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { UserModel } from '../user/user.model';
import { ConviteStatusEnum } from '../invitation/convite-status.enum';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventModel)
    private readonly eventRepository: Repository<EventModel>,
    private readonly userService: UserService,
  ) {}

  async addEvent(
    description: string,
    startTime: Date,
    endTime: Date,
    userId: number,
    invitedUserIds: number[] = [],
  ): Promise<EventModel> {
    const invitedUsers: UserModel[] = [];
    const conflictingEvent = await this.eventRepository.findOne({
      where: {
        user: { id: userId },
        startTime: MoreThanOrEqual(startTime),
        endTime: LessThanOrEqual(endTime),
      },
    });

    if (conflictingEvent) {
      throw new ConflictException(
        'Conflito de eventos: um evento já existe neste intervalo de tempo.',
      );
    }

    for (const invitedUserId of invitedUserIds) {
      const invitedUser = await this.userService.findUserById(invitedUserId);
      invitedUsers.push(invitedUser);
    }

    const event = this.eventRepository.create({
      description,
      startTime,
      endTime,
      user: { id: userId },
      invitations: invitedUsers.map((user) => ({ invitedUser: user })),
    });

    return await this.eventRepository.save(event);
  }
  async respondToEventInvitation(
    eventId: number,
    userId: number,
    response: 'accept' | 'decline',
  ): Promise<{ event: string; status: ConviteStatusEnum }> {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
      relations: ['invitations', 'invitations.invitedUser'],
    });

    if (!event) {
      throw new NotFoundException('Evento não encontrado');
    }

    const invitation = event.invitations.find(
      (invitation) => invitation.invitedUser.id == userId,
    );

    if (!invitation) {
      throw new NotFoundException('Convite não encontrado para este usuário');
    }

    if (response === 'accept') {
      invitation.status = ConviteStatusEnum.ACCEPTED;
    } else if (response === 'decline') {
      invitation.status = ConviteStatusEnum.DECLINED;
    }

    await this.eventRepository.save(event);
    return { event: event.description, status: invitation.status };
  }

  async getEventsByUserId(userId: number): Promise<EventModel[]> {
    return await this.eventRepository.find({
      where: { user: { id: userId } },
      relations: ['invitations', 'invitations.invitedUser'],
    });
  }

  async editEvent(
    eventId: number,
    description: string,
    startTime: Date,
    endTime: Date,
  ): Promise<EventModel> {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    event.description = description;
    event.startTime = startTime;
    event.endTime = endTime;

    return await this.eventRepository.save(event);
  }

  async removeEvent(eventId: number): Promise<void> {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    await this.eventRepository.remove(event);
  }
}
