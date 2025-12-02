/* eslint-disable @typescript-eslint/unbound-method */
import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMeetingMinuteDto } from './dto/create-meeting-minute.dto';
import { UpdateMeetingMinuteDto } from './dto/update-meeting-minute.dto';
import { MeetingMinuteMapper } from 'src/common/mappers/meeting-minute.mapper';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { FileUtils } from '../common/utils/file.utils';

@Injectable()
export class MeetingMinutesService {
  private logger = new Logger(MeetingMinutesService.name);

  constructor(private prisma: PrismaService) {}

  // ============================
  // CREATE
  // ============================
  async create(dto: CreateMeetingMinuteDto) {
    this.logger.log(`Creating minute "${dto.title}"`);

    const m = await this.prisma.meetingMinute.create({
      data: {
        division: dto.division,
        title: dto.title,
        notes: dto.notes,
        speaker: dto.speaker,
        numberOfParticipants: dto.numberOfParticipants ?? 0,
        members: dto.members,
      },
      include: { results: true, images: true },
    });

    return MeetingMinuteMapper.toDto(m);
  }

  // ============================
  // FIND ALL
  // ============================
  async findAll(query: PaginationQueryDto) {
    const {
      page = 1,
      limit = 10,
      search,
      sort = 'createdAt',
      order = 'desc',
    } = query;

    const skip = (page - 1) * limit;

    const minutes = await this.prisma.meetingMinute.findMany({
      where: {
        isDeleted: false,
        OR: search
          ? [
              { title: { contains: search } },
              { notes: { contains: search } },
              { division: { contains: search } },
              { speaker: { contains: search } },
            ]
          : undefined,
      },
      include: { results: true, images: true },
      skip,
      take: limit,
      orderBy: { [sort]: order },
    });

    return minutes.map(MeetingMinuteMapper.toDto);
  }

  // ============================
  // FIND ONE
  // ============================
  async findOne(id: number) {
    const minute = await this.prisma.meetingMinute.findUnique({
      where: { id, isDeleted: false },
      include: { results: true, images: true },
    });

    if (!minute) throw new NotFoundException('MeetingMinute not found');

    return MeetingMinuteMapper.toDto(minute);
  }

  // ============================
  // UPDATE MEETING DATA (not images)
  // ============================
  async update(id: number, dto: UpdateMeetingMinuteDto) {
    const existing = await this.prisma.meetingMinute.findUnique({
      where: { id },
    });

    if (!existing) throw new NotFoundException('MeetingMinute not found');

    const updated = await this.prisma.meetingMinute.update({
      where: { id },
      data: {
        division: dto.division,
        title: dto.title,
        notes: dto.notes,
        speaker: dto.speaker,
        numberOfParticipants: dto.numberOfParticipants,
        members: dto.members,
      },
      include: { results: true, images: true },
    });
    if (!updated) throw new NotFoundException('MeetingMinute not found');

    return MeetingMinuteMapper.toDto(updated);
  }

  // ============================
  // ADD IMAGES TO MEETING
  // ============================
  async addImages(minuteId: number, urls: string[]) {
    const minute = await this.prisma.meetingMinute.findUnique({
      where: { id: minuteId, isDeleted: false },
    });

    if (!minute) throw new NotFoundException('MeetingMinute not found');
    if (!urls?.length) throw new BadRequestException('No image URLs provided');

    await this.prisma.meetingImage.createMany({
      data: urls.map((url) => ({
        meetingMinuteId: minuteId,
        url,
      })),
    });

    const updated = await this.prisma.meetingMinute.findUnique({
      where: { id: minuteId },
      include: { images: true, results: true },
    });

    if (!updated) throw new NotFoundException('MeetingMinute not found');

    return MeetingMinuteMapper.toDto(updated);
  }

  // ============================
  // REMOVE SPECIFIC IMAGE
  // ============================
  async removeImage(minuteId: number, imageId: number) {
    const img = await this.prisma.meetingImage.findUnique({
      where: { id: imageId },
    });

    if (!img) throw new NotFoundException('Image not found');
    if (img.meetingMinuteId !== minuteId)
      throw new BadRequestException('Image does not belong to this meeting');

    // Delete the file
    await FileUtils.deleteLocalFile(img.url);

    // Delete DB row
    await this.prisma.meetingImage.delete({
      where: { id: imageId },
    });

    return { message: 'Image deleted successfully' };
  }

  // ============================
  // REPLACE AN IMAGE
  // ============================
  async replaceImage(minuteId: number, imageId: number, newUrl: string) {
    const img = await this.prisma.meetingImage.findUnique({
      where: { id: imageId },
    });

    if (!img) throw new NotFoundException('Image not found');
    if (img.meetingMinuteId !== minuteId)
      throw new BadRequestException('Image does not belong to this meeting');

    // Delete old file
    await FileUtils.deleteLocalFile(img.url);

    // Update DB with new URL
    const updated = await this.prisma.meetingImage.update({
      where: { id: imageId },
      data: { url: newUrl },
    });

    return updated;
  }

  // ============================
  // SOFT DELETE — DELETE ALL IMAGES TOO
  // ============================
  async remove(id: number) {
    this.logger.warn(`Soft deleting minute #${id}`);

    const minute = await this.prisma.meetingMinute.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!minute) throw new NotFoundException('MeetingMinute not found');

    // Delete all image files
    for (const img of minute.images) {
      await FileUtils.deleteLocalFile(img.url);
    }

    // Delete all MeetingImage rows
    await this.prisma.meetingImage.deleteMany({
      where: { meetingMinuteId: id },
    });

    // Soft delete meeting
    return this.prisma.meetingMinute.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
