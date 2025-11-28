/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `MeetingMinute` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "MeetingImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "minuteId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "MeetingImage_minuteId_fkey" FOREIGN KEY ("minuteId") REFERENCES "MeetingMinute" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MeetingMinute" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "division" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "speaker" TEXT,
    "numberOfParticipants" INTEGER NOT NULL DEFAULT 0,
    "members" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_MeetingMinute" ("createdAt", "division", "id", "isDeleted", "members", "notes", "numberOfParticipants", "speaker", "title", "updatedAt") SELECT "createdAt", "division", "id", "isDeleted", "members", "notes", "numberOfParticipants", "speaker", "title", "updatedAt" FROM "MeetingMinute";
DROP TABLE "MeetingMinute";
ALTER TABLE "new_MeetingMinute" RENAME TO "MeetingMinute";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
