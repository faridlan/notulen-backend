/* eslint-disable @typescript-eslint/no-unsafe-call */
import { PartialType } from '@nestjs/mapped-types';
import { CreateMeetingMinuteDto } from './create-meeting-minute.dto';

export class UpdateMeetingMinuteDto extends PartialType(
  CreateMeetingMinuteDto,
) {}
