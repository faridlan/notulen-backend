/* eslint-disable @typescript-eslint/unbound-method */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMeetingResultDto } from './dto/create-meeting-result.dto';
import { UpdateMeetingResultDto } from './dto/update-meeting-result.dto';
import { MeetingResultMapper } from 'src/common/mappers/meeting-result.mapper';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Injectable()
export class MeetingResultsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMeetingResultDto) {
    const r = await this.prisma.meetingResult.create({
      data: {
        minuteId: dto.minuteId,
        target: dto.target,
        achievement: dto.achievement,
        targetCompletionDate: dto.targetCompletionDate
          ? new Date(dto.targetCompletionDate)
          : null,
        description: dto.description,
      },
      include: { minute: true },
    });

    return MeetingResultMapper.toDto(r);
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
      await this.prisma.meetingResult.findMany({
        where: {
          isDeleted: false,

          OR: search
            ? [
                { target: { contains: search } },
                { description: { contains: search } },
              ]
            : undefined,
        },
        include: { minute: true },
        skip,
        take: limit,
        orderBy: { [sort]: order },
      })
    ).map(MeetingResultMapper.toDto);
  }

  async findOne(id: number) {
    const r = await this.prisma.meetingResult.findUnique({
      where: { id },
      include: { minute: true },
    });

    if (!r) throw new NotFoundException('MeetingResult not found');

    return MeetingResultMapper.toDto(r);
  }

  async update(id: number, dto: UpdateMeetingResultDto) {
    const r = await this.prisma.meetingResult.update({
      where: { id },
      data: {
        ...dto,
        targetCompletionDate: dto.targetCompletionDate
          ? new Date(dto.targetCompletionDate)
          : undefined,
      },
      include: { minute: true },
    });

    return MeetingResultMapper.toDto(r);
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.meetingResult.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
