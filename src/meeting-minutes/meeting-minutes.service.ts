/* eslint-disable @typescript-eslint/unbound-method */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMeetingMinuteDto } from './dto/create-meeting-minute.dto';
import { UpdateMeetingMinuteDto } from './dto/update-meeting-minute.dto';
import { MeetingMinuteMapper } from 'src/common/mappers/meeting-minute.mapper';

@Injectable()
export class MeetingMinutesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMeetingMinuteDto) {
    const m = await this.prisma.meetingMinute.create({
      data: dto,
      include: { results: true },
    });

    return MeetingMinuteMapper.toDto(m);
  }

  async findAll() {
    const minutes = await this.prisma.meetingMinute.findMany({
      include: { results: true },
      orderBy: { createdAt: 'desc' },
    });

    return minutes.map(MeetingMinuteMapper.toDto);
  }

  async findOne(id: number) {
    const minute = await this.prisma.meetingMinute.findUnique({
      where: { id },
      include: { results: true },
    });

    if (!minute) throw new NotFoundException('MeetingMinute not found');

    return MeetingMinuteMapper.toDto(minute);
  }

  async update(id: number, dto: UpdateMeetingMinuteDto) {
    const m = await this.prisma.meetingMinute.update({
      where: { id },
      data: dto,
      include: { results: true },
    });

    return MeetingMinuteMapper.toDto(m);
  }

  async remove(id: number) {
    await this.findOne(id);
    // depending on cascade rules you might want to delete results too; Prisma will handle via foreign key constraints
    return this.prisma.meetingMinute.delete({ where: { id } });
  }
}
