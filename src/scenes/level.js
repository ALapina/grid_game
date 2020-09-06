import { GameLoop, bindKeys, load, dataAssets, Sprite } from "kontra";
import { TILE_SIZE, TILE_MAP_SIZE } from "../constants";
import { makeTextNode } from "../utils";
import initLeveltileset from "../tiles";
import imgArray from "../items";
import { movePlayer, digTreasure } from "../player";

const imgPath = "assets/";
const assets = ["js13kb-tileset.png", "hero.png", "ground.json"].map(
  (asset) => imgPath + asset
);

const Level = (game) => {
  const playScoreText = makeTextNode("", 8, 10, 10, "left", "black");
  playScoreText.update = () => (playScoreText.text = "Score: " + game.score);

  let objectsOnMap = [];

  load(...assets).then((assets) => {
    let data = dataAssets["assets/ground"];
    const tileEngine = initLeveltileset(data, assets[0]);
    const player = Sprite({
      x: TILE_SIZE * 3,
      y: TILE_SIZE * (TILE_MAP_SIZE - 1),
      image: assets[1],
    });

    const loop = GameLoop({
      update() {
        playScoreText.update();
      },
      render() {
        tileEngine.render();
        for (let item of objectsOnMap) {
          item.render();
        }
        player.render();
        playScoreText.render();
      },
    });
    loop.start();

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
      const { islandItem, itemScore } = digTreasure(
        player,
        objectsOnMap,
        imgArray
      );
      if (islandItem) {
        objectsOnMap.push(islandItem);
        game.score += itemScore;
      }
    });
  });
};

export default Level;
