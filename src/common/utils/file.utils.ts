import { unlink } from 'fs';
import { promisify } from 'util';
import { join } from 'path';

const unlinkAsync = promisify(unlink);

export class FileUtils {
  static async deleteLocalFile(url: string) {
    if (!url) return;

    // Remove leading slash like "/uploads/..."
    const cleanedUrl = url.startsWith('/') ? url.substring(1) : url;

    // Path from project root, not dist/
    const filePath = join(process.cwd(), cleanedUrl);

    try {
      await unlinkAsync(filePath);
      console.log(`🗑 Deleted file: ${filePath}`);
    } catch (e) {
      console.error(`❌ Failed to delete file: ${filePath}`, e);
    }
  }
}
