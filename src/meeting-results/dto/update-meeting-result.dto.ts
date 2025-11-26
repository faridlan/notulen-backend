import { PartialType } from '@nestjs/mapped-types';
import { CreateMeetingResultDto } from './create-meeting-result.dto';

export class UpdateMeetingResultDto extends PartialType(
  CreateMeetingResultDto,
) {}
