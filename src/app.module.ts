import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MeetingMinutesModule } from './meeting-minutes/meeting-minutes.module';
import { PrismaModule } from './prisma/prisma.module';
import { MeetingResultsModule } from './meeting-results/meeting-results.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    PrismaModule,
    MeetingMinutesModule,
    MeetingResultsModule,
    UploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
