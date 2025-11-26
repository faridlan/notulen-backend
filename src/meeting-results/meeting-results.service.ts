/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMeetingResultDto } from './dto/create-meeting-result.dto';
import { UpdateMeetingResultDto } from './dto/update-meeting-result.dto';

@Injectable()
export class MeetingResultsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMeetingResultDto) {
    // Convert date string to Date if provided
    const data: any = {
      minuteId: dto.minuteId,
      target: dto.target,
      achievement: dto.achievement ?? 0,
      description: dto.description,
    };
    if (dto.targetCompletionDate)
      data.targetCompletionDate = new Date(dto.targetCompletionDate);

    return this.prisma.meetingResult.create({ data });
  }

  async findAll() {
    return this.prisma.meetingResult.findMany({
      include: { minute: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const r = await this.prisma.meetingResult.findUnique({
      where: { id },
      include: { minute: true },
    });
    if (!r) throw new NotFoundException('MeetingResult not found');
    return r;
  }

  async update(id: number, dto: UpdateMeetingResultDto) {
    await this.findOne(id);
    const data: any = { ...dto };
    if (dto.targetCompletionDate)
      data.targetCompletionDate = new Date(dto.targetCompletionDate);
    return this.prisma.meetingResult.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.meetingResult.delete({ where: { id } });
  }
}
