import { MeetingMinute, MeetingResult } from 'generated/prisma/client';
import { MeetingResultResponseDto } from '../../meeting-results/dto/meeting-result-response.dto';

export class MeetingResultMapper {
  static toDto(
    entity: MeetingResult & { minute?: MeetingMinute | null },
  ): MeetingResultResponseDto {
    return {
      id: entity.id,
      target: entity.target,
      achievement: entity.achievement,
      targetCompletionDate: entity.targetCompletionDate,
      description: entity.description,
      createdAt: entity.createdAt,
      minute: entity.minute
        ? {
            id: entity.minute.id,
            title: entity.minute.title,
          }
        : undefined,
    };
  }
}
