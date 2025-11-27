import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MeetingMinutesModule } from './meeting-minutes/meeting-minutes.module';
import { PrismaModule } from './prisma/prisma.module';
import { MeetingResultsModule } from './meeting-results/meeting-results.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [PrismaModule, MeetingMinutesModule, MeetingResultsModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
