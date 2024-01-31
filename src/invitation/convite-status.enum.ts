import { EventModel } from 'src/event/event.model';

/**
 * Enum representing the status of an invitation.
 */
export enum ConviteStatusEnum {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
}

export interface InvitationWithStatus {
  event: EventModel;
  status: ConviteStatusEnum;
}
