export type WordData = {
  translation: string;
  ease: number;
  interval: number;
  lastReview: string;
  nextReview: string;
}

export type Deck = {
  name: string;
  dateCreated: string;
  words: Record<string, WordData>;
};

