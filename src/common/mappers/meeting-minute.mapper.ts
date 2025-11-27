import { MeetingMinute, MeetingResult } from 'generated/prisma/client';
import { MeetingMinuteResponseDto } from '../../meeting-minutes/dto/meeting-minute-response.dto';
import { MeetingResultMapper } from './meeting-result.mapper';

export class MeetingMinuteMapper {
  static toDto(
    entity: MeetingMinute & { results?: MeetingResult[] },
  ): MeetingMinuteResponseDto {
    return {
      id: entity.id,
      division: entity.division,
      title: entity.title,
      notes: entity.notes,
      speaker: entity.speaker,
      numberOfParticipants: entity.numberOfParticipants,
      members: entity.members as any[],
      imageUrl: entity.imageUrl,
      createdAt: entity.createdAt,
      results: entity.results?.map((r) => MeetingResultMapper.toDto(r)) || [],
    };
  }
}
