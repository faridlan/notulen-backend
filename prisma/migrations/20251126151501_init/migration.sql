-- CreateTable
CREATE TABLE "MeetingMinute" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "division" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "speaker" TEXT,
    "numberOfParticipants" INTEGER NOT NULL DEFAULT 0,
    "members" JSONB NOT NULL,
    "imageUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "MeetingResult" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "minuteId" INTEGER NOT NULL,
    "target" TEXT NOT NULL,
    "achievement" INTEGER NOT NULL DEFAULT 0,
    "targetCompletionDate" DATETIME,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "MeetingResult_minuteId_fkey" FOREIGN KEY ("minuteId") REFERENCES "MeetingMinute" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "MeetingResult_minuteId_idx" ON "MeetingResult"("minuteId");
