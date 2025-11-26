import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMeetingMinuteDto } from './dto/create-meeting-minute.dto';
import { UpdateMeetingMinuteDto } from './dto/update-meeting-minute.dto';

@Injectable()
export class MeetingMinutesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMeetingMinuteDto) {
    return this.prisma.meetingMinute.create({
      data: {
        ...dto,
        // ensure members stored as JSON
        members: dto.members,
      },
    });
  }

  async findAll() {
    return this.prisma.meetingMinute.findMany({
      include: { results: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const minute = await this.prisma.meetingMinute.findUnique({
      where: { id },
      include: { results: true },
    });
    if (!minute) throw new NotFoundException('MeetingMinute not found');
    return minute;
  }

  async update(id: number, dto: UpdateMeetingMinuteDto) {
    await this.findOne(id); // will throw if missing
    return this.prisma.meetingMinute.update({
      where: { id },
      data: {
        ...dto,
      },
      include: { results: true },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    // depending on cascade rules you might want to delete results too; Prisma will handle via foreign key constraints
    return this.prisma.meetingMinute.delete({ where: { id } });
  }
}
