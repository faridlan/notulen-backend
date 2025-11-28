import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { MeetingMinutesService } from './meeting-minutes.service';
import { CreateMeetingMinuteDto } from './dto/create-meeting-minute.dto';
import { UpdateMeetingMinuteDto } from './dto/update-meeting-minute.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Controller('minutes')
export class MeetingMinutesController {
  constructor(private readonly service: MeetingMinutesService) {}

  // ============================
  // CREATE
  // ============================
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  create(@Body() dto: CreateMeetingMinuteDto) {
    return this.service.create(dto);
  }

  // ============================
  // FIND ALL
  // ============================
  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.service.findAll(query);
  }

  // ============================
  // FIND ONE
  // ============================
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  // ============================
  // UPDATE BASIC FIELDS
  // ============================
  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMeetingMinuteDto,
  ) {
    return this.service.update(id, dto);
  }

  // ============================
  // SOFT DELETE
  // ============================
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  // =========================================================
  // IMAGE MANAGEMENT ROUTES (MULTI IMAGE SYSTEM)
  // =========================================================

  // 1️⃣ Add multiple images to a meeting
  @Post(':id/images')
  addImages(
    @Param('id', ParseIntPipe) id: number,
    @Body('urls') urls: string[],
  ) {
    return this.service.addImages(id, urls);
  }

  // 2️⃣ Remove specific image from meeting
  @Delete(':id/images/:imageId')
  removeImage(
    @Param('id', ParseIntPipe) id: number,
    @Param('imageId', ParseIntPipe) imageId: number,
  ) {
    return this.service.removeImage(id, imageId);
  }

  // 3️⃣ Replace specific image
  @Put(':id/images/:imageId')
  replaceImage(
    @Param('id', ParseIntPipe) id: number,
    @Param('imageId', ParseIntPipe) imageId: number,
    @Body('url') newUrl: string,
  ) {
    return this.service.replaceImage(id, imageId, newUrl);
  }
}
