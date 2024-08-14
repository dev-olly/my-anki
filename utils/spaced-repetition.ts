import { Deck } from "@/types";

export const UPPER_BOUND = 2.5;
export const LOWER_BOUND = 1.3;



const updateData = (data: Deck, word: string, success: boolean) => {
  const current = data[word];
  const ease = current.ease;
  const interval = current.interval;

  let newInterval;
  let newEase;
  if (success) {
    newInterval = interval * ease;
    newEase = Math.min(ease + 0.15, UPPER_BOUND);
  } else {
    newInterval = 1;
    newEase = Math.max(ease - 0.2, LOWER_BOUND);
  }

  const newNextReview = new Date(new Date().getTime() + newInterval * 24 * 60 * 60 * 1000).toISOString();

  data[word] = {
    ...current,
    ease: newEase,
    interval: newInterval,
    lastReview: new Date().toISOString(),
    nextReview: newNextReview
  }
}