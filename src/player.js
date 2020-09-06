import { Sprite } from "kontra";
import { TILE_SIZE, TILE_MAP_SIZE } from "./config";

function movePlayer(tileEngine, player, x, y) {
  const nextPlayerPosition = {
    x: x,
    y: y,
    width: 0,
    height: 0,
  };
  if (nextPlayerPosition.x > TILE_SIZE * TILE_MAP_SIZE) {
    return;
  }
  if (nextPlayerPosition.x < 0) {
    return;
  }
  if (nextPlayerPosition.y > TILE_SIZE * TILE_MAP_SIZE) {
    return;
  }
  if (nextPlayerPosition.y < 0) {
    return;
  }
  if (tileEngine.layerCollidesWith("collision_objects", nextPlayerPosition)) {
    return;
  } else {
    player.y = y;
    player.x = x;
  }
}

/**
 * Treasure hunter dig a random treasure or empty space
 *
 * @param {object} player
 * @param {Array} foundItems - Visible objects on the island
 * @param {Array} imgArray - List of images of items that can be placed on the map
 * @returns {object}
 */
function digTreasure(player, foundItems, imgArray) {
  // First we check that this tile does not contain items already
  for (let item of foundItems) {
    if (player.x === item.x && player.y === item.y) {
      return {};
    }
  }
  // Next we will add a random item from the pool to the tile
  let randomNUmber = Math.floor(Math.random() * imgArray.length);
  let item = Sprite({
    x: player.x,
    y: player.y,
    image: imgArray[randomNUmber].image,
  });
  return { islandItem: item, itemScore: imgArray[randomNUmber].score };
}

export { movePlayer, digTreasure };
