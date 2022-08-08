



export const GAME_VERSION = "1.0.0";
export const DEVELOPMENT_MODE = false;

export const MAX_NUMBERS_AVAILABLE = 59;
export const NUMBERS_REQUIRED = 6;

export const DEFAULT_ASSET_DIR = "assets";

export const RESOURCES = {
  background: "background.svg",
  ball: "ball.png",
  ball_red: "ball_red.png",
  jar: "jar.png"
};

export const MATCH_PRIZE_TABLE: PrizeTable = {
  3: 50,
  4: 100,
  5: 200,
  6: 500
};

export enum GameState {
  IDLE = "idle",
  LOADING = "loading",
  RUNNING = "running",
  PAUSED = "paused"
};



