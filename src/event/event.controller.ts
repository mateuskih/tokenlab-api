import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { EventService } from './event.service';
import { EventModel } from './event.model';
import { ConviteStatusEnum } from 'src/invitation/convite-status.enum';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async addEvent(
    @Body('description') description: string,
    @Body('startTime') startTime: Date,
    @Body('endTime') endTime: Date,
    @Body('userId') userId: number,
    @Body('invitedUserIds') invitedUserIds: number[] = [],
  ): Promise<EventModel> {
    return this.eventService.addEvent(
      description,
      startTime,
      endTime,
      userId,
      invitedUserIds,
    );
  }

  @Post('respond/:userId/:eventId')
  async respondToEventInvitation(
    @Param('eventId') eventId: number,
    @Param('userId') userId: number,
    @Body('response') response: 'accept' | 'decline',
  ): Promise<{ event: string; status: ConviteStatusEnum }> {
    return this.eventService.respondToEventInvitation(
      eventId,
      userId,
      response,
    );
  }

  @Get(':userId')
  async getEventsByUserId(
    @Param('userId') userId: number,
  ): Promise<EventModel[]> {
    return await this.eventService.getEventsByUserId(userId);
  }

  @Put(':eventId')
  async editEvent(
    @Param('eventId') eventId: number,
    @Body('description') description: string,
    @Body('startTime') startTime: Date,
    @Body('endTime') endTime: Date,
  ): Promise<EventModel> {
    return await this.eventService.editEvent(
      eventId,
      description,
      startTime,
      endTime,
    );
  }

  @Delete(':eventId')
  async removeEvent(@Param('eventId') eventId: number): Promise<void> {
    return await this.eventService.removeEvent(eventId);
  }
}
