import { Deck } from "@/types";

export const UPPER_BOUND = 2.5;
export const LOWER_BOUND = 1.3;

export const Levels = {
  'easy': 'easy',
  'medium': 'medium',
  'hard': 'hard'
} as const;

export type Level = typeof Levels[keyof typeof Levels];

export const updateData = (data: Deck, word: string, level: Level) => {
  const current = data[word];
  const ease = current.ease;
  const interval = current.interval;

  let newInterval  = 1;
  let newEase = UPPER_BOUND;
  if (level === Levels.easy) {
    newInterval = interval * ease;
    newEase = Math.min(ease + 0.15, UPPER_BOUND);
  }else if (level === Levels.medium) {
    newInterval = 1;
    newEase = Math.max(ease - 0.1, LOWER_BOUND);
  }else{
    newInterval = 1;
    newEase = Math.max(ease - 0.3, LOWER_BOUND);
  }

  const newNextReview = new Date(new Date().getTime() + newInterval * 24 * 60 * 60 * 1000).toISOString();

  data[word] = {
    ...current,
    ease: newEase,
    interval: newInterval,
    lastReview: new Date().toISOString(),
    nextReview: newNextReview
  }

  return data;
}