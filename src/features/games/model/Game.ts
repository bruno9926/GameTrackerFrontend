export const GAME_STATUSES = {
  playing: "playing",
  completed: "completed",
  wishlist: "wishlist",
  paused: "paused",
} as const;

export type GameStatus = typeof GAME_STATUSES[keyof typeof GAME_STATUSES];

export const gameStatuses = Object.keys(GAME_STATUSES) as GameStatus[];

export const GAME_STATUS_LABELS = {
  playing: "Playing",
  completed: "Completed",
  wishlist: "Wishlist",
  paused: "Paused",
} as const;

export type Game = {
  id: string;
  name: string;
  status: GameStatus;
  coverUrl?: string
};

export const DEFAULT_GAME_STATUS = GAME_STATUSES.playing;

export type GameToCreate = Omit<Game, "id">;
export type GameToUpdate = Partial<Game> & { id: string };
