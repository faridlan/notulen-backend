/*
  Warnings:

  - You are about to drop the column `minuteId` on the `MeetingImage` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MeetingImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "meetingMinuteId" INTEGER,
    CONSTRAINT "MeetingImage_meetingMinuteId_fkey" FOREIGN KEY ("meetingMinuteId") REFERENCES "MeetingMinute" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_MeetingImage" ("createdAt", "id", "url") SELECT "createdAt", "id", "url" FROM "MeetingImage";
DROP TABLE "MeetingImage";
ALTER TABLE "new_MeetingImage" RENAME TO "MeetingImage";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
