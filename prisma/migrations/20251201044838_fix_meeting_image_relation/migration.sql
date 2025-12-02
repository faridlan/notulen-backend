/*
  Warnings:

  - Made the column `meetingMinuteId` on table `MeetingImage` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MeetingImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "meetingMinuteId" INTEGER NOT NULL,
    CONSTRAINT "MeetingImage_meetingMinuteId_fkey" FOREIGN KEY ("meetingMinuteId") REFERENCES "MeetingMinute" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MeetingImage" ("createdAt", "id", "meetingMinuteId", "url") SELECT "createdAt", "id", "meetingMinuteId", "url" FROM "MeetingImage";
DROP TABLE "MeetingImage";
ALTER TABLE "new_MeetingImage" RENAME TO "MeetingImage";
CREATE INDEX "MeetingImage_meetingMinuteId_idx" ON "MeetingImage"("meetingMinuteId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
