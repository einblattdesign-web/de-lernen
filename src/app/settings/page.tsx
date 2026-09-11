import SettingsClient from "./SettingsClient";
import { MAX_FREEZES, reconcileStreak } from "@/lib/streak";
import { addDays, diffInDays, today } from "@/lib/date";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const { state: streak } = await reconcileStreak();
  const freezesRenewedAt = streak.freezesRenewedAt ?? streak.streakStartDate ?? today();
  const nextRenewalDate = addDays(freezesRenewedAt, 365);
  const daysUntilRenewal = diffInDays(nextRenewalDate, today());

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">設定</h1>
      <SettingsClient
        streak={{
          currentStreak: streak.currentStreak,
          longestStreak: streak.longestStreak,
          lastActiveDate: streak.lastActiveDate ? streak.lastActiveDate.toISOString().slice(0, 10) : "",
          freezesAvailable: streak.freezesAvailable,
          freezesRenewedAt: freezesRenewedAt.toISOString().slice(0, 10),
        }}
        maxFreezes={MAX_FREEZES}
        nextRenewalDate={nextRenewalDate.toISOString().slice(0, 10)}
        daysUntilRenewal={daysUntilRenewal}
      />
    </div>
  );
}
