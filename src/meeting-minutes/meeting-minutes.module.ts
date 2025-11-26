import { Module } from '@nestjs/common';
import { MeetingMinutesController } from './meeting-minutes.controller';
import { MeetingMinutesService } from './meeting-minutes.service';

@Module({
  controllers: [MeetingMinutesController],
  providers: [MeetingMinutesService]
})
export class MeetingMinutesModule {}
