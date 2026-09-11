-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_StreakState" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "currentStreak" INTEGER NOT NULL DEFAULT 0,
    "longestStreak" INTEGER NOT NULL DEFAULT 0,
    "lastActiveDate" DATETIME,
    "streakStartDate" DATETIME,
    "freezesAvailable" INTEGER NOT NULL DEFAULT 6,
    "freezesRenewedAt" DATETIME,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_StreakState" ("currentStreak", "freezesAvailable", "id", "lastActiveDate", "longestStreak", "streakStartDate", "updatedAt") SELECT "currentStreak", "freezesAvailable", "id", "lastActiveDate", "longestStreak", "streakStartDate", "updatedAt" FROM "StreakState";
DROP TABLE "StreakState";
ALTER TABLE "new_StreakState" RENAME TO "StreakState";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
