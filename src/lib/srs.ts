import { addDays, today } from "./date";

export type Grade = 0 | 1 | 2 | 3; // again, hard, good, easy

export interface SrsState {
  easeFactor: number;
  intervalDays: number;
  repetitions: number;
}

export interface SrsResult extends SrsState {
  dueDate: Date;
}

// SM-2 style scheduler, simplified for a 4-button (again/hard/good/easy) UI
// instead of Anki's raw 0-5 quality score.
export function schedule(state: SrsState, grade: Grade): SrsResult {
  let { easeFactor, intervalDays, repetitions } = state;

  if (grade === 0) {
    // "Again": reset progress, review again today/tomorrow.
    repetitions = 0;
    intervalDays = 1;
    easeFactor = Math.max(1.3, easeFactor - 0.2);
  } else {
    const easeDelta = { 1: -0.15, 2: 0, 3: 0.15 }[grade];
    easeFactor = Math.max(1.3, easeFactor + easeDelta);

    if (repetitions === 0) {
      intervalDays = grade === 1 ? 1 : grade === 2 ? 2 : 4;
    } else if (repetitions === 1) {
      intervalDays = grade === 1 ? 3 : grade === 2 ? 6 : 10;
    } else {
      const multiplier = grade === 1 ? easeFactor * 0.8 : grade === 2 ? easeFactor : easeFactor * 1.3;
      intervalDays = Math.round(intervalDays * multiplier);
    }
    repetitions += 1;
  }

  return {
    easeFactor,
    intervalDays,
    repetitions,
    dueDate: addDays(today(), intervalDays),
  };
}
