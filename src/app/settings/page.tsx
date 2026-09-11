import SettingsClient from "./SettingsClient";
import { getOrCreateStreak } from "@/lib/streak";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const streak = await getOrCreateStreak();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">設定</h1>
      <SettingsClient
        streak={{
          currentStreak: streak.currentStreak,
          longestStreak: streak.longestStreak,
          lastActiveDate: streak.lastActiveDate ? streak.lastActiveDate.toISOString().slice(0, 10) : "",
          freezesAvailable: streak.freezesAvailable,
        }}
      />
    </div>
  );
}
