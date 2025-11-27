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
    "imageUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_MeetingMinute" ("createdAt", "division", "id", "imageUrl", "members", "notes", "numberOfParticipants", "speaker", "title", "updatedAt") SELECT "createdAt", "division", "id", "imageUrl", "members", "notes", "numberOfParticipants", "speaker", "title", "updatedAt" FROM "MeetingMinute";
DROP TABLE "MeetingMinute";
ALTER TABLE "new_MeetingMinute" RENAME TO "MeetingMinute";
CREATE TABLE "new_MeetingResult" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "minuteId" INTEGER NOT NULL,
    "target" TEXT NOT NULL,
    "achievement" INTEGER NOT NULL DEFAULT 0,
    "targetCompletionDate" DATETIME,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "MeetingResult_minuteId_fkey" FOREIGN KEY ("minuteId") REFERENCES "MeetingMinute" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MeetingResult" ("achievement", "createdAt", "description", "id", "minuteId", "target", "targetCompletionDate", "updatedAt") SELECT "achievement", "createdAt", "description", "id", "minuteId", "target", "targetCompletionDate", "updatedAt" FROM "MeetingResult";
DROP TABLE "MeetingResult";
ALTER TABLE "new_MeetingResult" RENAME TO "MeetingResult";
CREATE INDEX "MeetingResult_minuteId_idx" ON "MeetingResult"("minuteId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
