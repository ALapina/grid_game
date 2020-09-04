import {
  Sprite,
  GameLoop,
  TileEngine,
  load,
  dataAssets,
  initKeys,
  bindKeys,
  init,
  Scene,
} from "kontra";
import { TILE_SIZE, TILE_MAP_SIZE, GAME_STATE_VICTORY } from "./constants";
import {
  GAME_STATE_START_SCREEN,
  GAME_STATE_PLAY,
  GAME_STATE_GAME_OVER,
} from "./constants";
import { makeTextNode } from "./utils";
import imgArray from "./items";
import { movePlayer, digTreasure } from "./player";

let { context } = init("game");
initKeys();

// увеличиваем скейл что бы тайл мап помещался в игровое поле
context.scale(3, 3);

let score = 0;
let is_failure = false;
let is_victory = false;
let game_state = GAME_STATE_START_SCREEN;
let objectsOnMap = [];

const startGameText = makeTextNode("Start Game", 32, 0, 100);
const pressToStart = makeTextNode("Press ENTER to start the game", 12, 0, 200);
const playScoreText = makeTextNode("Score: 100", 8, 10, 10, "left", "black");
const gameOverText = makeTextNode("Game Over!", 32, 0, 100);
const gameVictoryText = makeTextNode("Victory!", 32, 0, 100);
const finalScoreText = makeTextNode("Your Score: 100", 18, 0, 130);

load("assets/js13kb-tileset.png", "assets/hero.png", "assets/ground.json").then(
  function (assets) {
    let data = dataAssets["assets/ground"];
    // A hack to fix a bug in kontra engine
    // when it can't read tileset from the JSON file
    data.tilesets[0] = {
      firstgid: 1,
      image: assets[0],
    };
    const tileEngine = TileEngine(data);
    const player = Sprite({
      x: TILE_SIZE * 3,
      y: TILE_SIZE * (TILE_MAP_SIZE - 1),
      image: assets[1],
    });

    const StartGameScene = Scene({
      id: "start-game",
      children: [startGameText, pressToStart],
      onShow() {
        score = 0;
        bindKeys("enter", () => {
          game_state = GAME_STATE_PLAY;
        });
      },
    });

    const GameBackground = Scene({
      id: "game-background",
      children: [tileEngine],
      cullObjects: false,
    });

    const GameForeground = Scene({
      id: "game-foreground",
      children: [player, playScoreText],
      update() {
        if (is_failure) {
          game_state = GAME_STATE_GAME_OVER;
        } else if (is_victory) {
          game_state = GAME_STATE_VICTORY;
        }
      },
      onShow() {
        bindKeys("up", function () {
          movePlayer(tileEngine, player, player.x, player.y - TILE_SIZE);
        });
        bindKeys("down", function () {
          movePlayer(tileEngine, player, player.x, player.y + TILE_SIZE);
        });
        bindKeys("left", function (e) {
          movePlayer(tileEngine, player, player.x - TILE_SIZE, player.y);
        });
        bindKeys("right", function () {
          movePlayer(tileEngine, player, player.x + TILE_SIZE, player.y);
        });
        bindKeys("space", function () {
          const treasure = digTreasure(player, objectsOnMap, imgArray);
          if (treasure) {
            GameBackground.addChild(treasure);
          }
        });
      },
    });

    const GameOverScene = Scene({
      id: "game-over",
      children: [gameOverText, finalScoreText, pressToStart],
      onShow() {
        bindKeys("enter", () => {
          game_state = GAME_STATE_START_SCREEN;
        });
      },
    });

    const GameVictoryScene = Scene({
      id: "victory",
      children: [gameVictoryText, finalScoreText, pressToStart],
      onShow() {
        bindKeys("enter", () => {
          game_state = GAME_STATE_START_SCREEN;
        });
      },
    });

    const screens = [
      StartGameScene,
      GameBackground,
      GameOverScene,
      GameVictoryScene,
    ];

    const loop = GameLoop({
      fps: 15,
      update: function () {},
      render: function () {
        screens.forEach((screen) => screen.hide());

        switch (game_state) {
          case GAME_STATE_START_SCREEN:
            StartGameScene.show();
            StartGameScene.render();
            break;
          case GAME_STATE_VICTORY:
            GameVictoryScene.show();
            GameVictoryScene.render();
            break;
          case GAME_STATE_GAME_OVER:
            GameOverScene.show();
            GameOverScene.render();
            break;
          case GAME_STATE_PLAY:
            GameBackground.show();
            GameForeground.show();
            GameBackground.render();
            GameForeground.render();
            break;
        }
      },
      context: context,
    });

    loop.start();
  }
);
