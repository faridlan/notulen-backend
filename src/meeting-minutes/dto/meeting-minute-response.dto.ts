import { MeetingResultResponseDto } from '../../meeting-results/dto/meeting-result-response.dto';

export class MeetingMinuteResponseDto {
  id: number;
  division: string;
  title: string;
  notes: string;
  speaker?: string | null;
  numberOfParticipants: number;
  members: any[];
  imageUrl?: string | null;
  createdAt: Date;

  results?: MeetingResultResponseDto[];
}
