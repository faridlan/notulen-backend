import { MeetingMinute, MeetingResult } from 'generated/prisma/client';
import { MeetingMinuteResponseDto } from '../../meeting-minutes/dto/meeting-minute-response.dto';
import { MeetingResultMapper } from './meeting-result.mapper';
import { MeetingImage } from 'generated/prisma/browser';

export class MeetingMinuteMapper {
  static toDto(
    entity: MeetingMinute & {
      results?: MeetingResult[];
      images?: MeetingImage[];
    },
  ): MeetingMinuteResponseDto {
    return {
      id: entity.id,
      division: entity.division,
      title: entity.title,
      notes: entity.notes,
      speaker: entity.speaker,
      numberOfParticipants: entity.numberOfParticipants,
      members: entity.members as any[],
      createdAt: entity.createdAt,
      results: entity.results?.map((r) => MeetingResultMapper.toDto(r)) || [],
      images:
        entity.images?.map((img) => ({
          id: img.id,
          url: img.url,
          createdAt: img.createdAt,
        })) || [],
    };
  }
}
