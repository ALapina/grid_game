const TILE_SIZE = 32;
const TILE_MAP_SIZE = 7;
const SCREEN_SIZE_PX = TILE_SIZE * (TILE_MAP_SIZE + 1);

const GAME_STATE_START_SCREEN = "start-screen";
const GAME_STATE_PLAY = "play";
const GAME_STATE_GAME_OVER = "game-over";
const GAME_STATE_VICTORY = "victory";

export {
  TILE_SIZE,
  TILE_MAP_SIZE,
  SCREEN_SIZE_PX,
  GAME_STATE_START_SCREEN,
  GAME_STATE_PLAY,
  GAME_STATE_GAME_OVER,
  GAME_STATE_VICTORY,
};
