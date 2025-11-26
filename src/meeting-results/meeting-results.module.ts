import { Module } from '@nestjs/common';
import { MeetingResultsController } from './meeting-results.controller';
import { MeetingResultsService } from './meeting-results.service';

@Module({
  controllers: [MeetingResultsController],
  providers: [MeetingResultsService]
})
export class MeetingResultsModule {}
