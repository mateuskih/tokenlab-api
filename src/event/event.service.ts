// src/event/event.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventModel } from './event.model';
import { Repository } from 'typeorm';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventModel)
    private readonly eventRepository: Repository<EventModel>,
  ) {}

  async addEvent(
    description: string,
    startTime: Date,
    endTime: Date,
    userId: number,
  ): Promise<EventModel> {
    const event = this.eventRepository.create({
      description,
      startTime,
      endTime,
      user: { id: userId },
    });
    return await this.eventRepository.save(event);
  }

  async getEventsByUserId(userId: number): Promise<EventModel[]> {
    return await this.eventRepository.find({ where: { user: { id: userId } } });
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
