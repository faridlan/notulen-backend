import { IsString, IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMeetingResultDto {
  @IsInt()
  @Type(() => Number)
  minuteId: number;

  @IsString()
  target: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  achievement?: number;

  @IsOptional()
  // Expect ISO datetime string from client
  targetCompletionDate?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
