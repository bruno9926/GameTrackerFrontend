export const GAME_STATUSES = {
  playing: "Playing",
  completed: "Completed",
  wishlist: "Wishlist",
  paused: "Paused",
} as const;

export type GameStatus = keyof typeof GAME_STATUSES;

export type Game = {
  id: number | string;
  name: string;
  status: GameStatus;
};

export const DEFAULT_GAME_STATUS = "playing" as GameStatus;
