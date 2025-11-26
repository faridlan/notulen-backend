import { Module } from '@nestjs/common';
import { MeetingMinutesModule } from './meeting-minutes/meeting-minutes.module';
import { PrismaModule } from './prisma/prisma.module';
import { MeetingResultsModule } from './meeting-results/meeting-results.module';

@Module({
  imports: [PrismaModule, MeetingMinutesModule, MeetingResultsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
