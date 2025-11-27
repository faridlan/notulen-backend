export class MeetingResultResponseDto {
  id: number;
  target: string;
  achievement: number;
  targetCompletionDate?: Date | null;
  description?: string | null;
  createdAt: Date;

  // Optional: include minimal minute info
  minute?: {
    id: number;
    title: string;
  };
}
