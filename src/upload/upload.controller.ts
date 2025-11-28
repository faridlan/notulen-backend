/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../common/upload/multer.config';

@Controller('upload')
export class UploadController {
  @Post('images')
  @UseInterceptors(FilesInterceptor('files', 10, multerConfig))
  uploadMultipleImages(@UploadedFiles() files: Express.Multer.File[]) {
    return files.map((file) => ({
      url: `/uploads/meeting-images/${file.filename}`,
      filename: file.filename,
    }));
  }
}
