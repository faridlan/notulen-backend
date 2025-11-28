import { MeetingImageResponseDto } from 'src/meeting-images/dto/meeting-image-response.dto';
import { MeetingResultResponseDto } from '../../meeting-results/dto/meeting-result-response.dto';

export class MeetingMinuteResponseDto {
  id: number;
  division: string;
  title: string;
  notes: string;
  speaker?: string | null;
  numberOfParticipants: number;
  members: any[];
  images?: MeetingImageResponseDto[];
  createdAt: Date;

  results?: MeetingResultResponseDto[];
}
