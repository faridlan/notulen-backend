/* eslint-disable @typescript-eslint/unbound-method */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMeetingMinuteDto } from './dto/create-meeting-minute.dto';
import { UpdateMeetingMinuteDto } from './dto/update-meeting-minute.dto';
import { MeetingMinuteMapper } from 'src/common/mappers/meeting-minute.mapper';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

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

  async findAll(query: PaginationQueryDto) {
    const {
      page = 1,
      limit = 10,
      search,
      sort = 'createdAt',
      order = 'desc',
    } = query;

    const skip = (page - 1) * limit;

    return (
      await this.prisma.meetingMinute.findMany({
        where: {
          isDeleted: false,

          // SEARCH fields
          OR: search
            ? [
                { title: { contains: search } },
                { notes: { contains: search } },
                { division: { contains: search } },
                { speaker: { contains: search } },
              ]
            : undefined,
        },

        include: { results: true },
        skip,
        take: limit,
        orderBy: { [sort]: order },
      })
    ).map(MeetingMinuteMapper.toDto);
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

    return this.prisma.meetingMinute.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
