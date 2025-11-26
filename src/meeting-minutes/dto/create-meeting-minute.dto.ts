import { IsString, IsOptional, IsInt, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMeetingMinuteDto {
  @IsString()
  division: string;

  @IsString()
  title: string;

  @IsString()
  notes: string;

  @IsOptional()
  @IsString()
  speaker?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  numberOfParticipants?: number;

  // members as JSON array -- let client send array
  @IsArray()
  members: any[];

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
