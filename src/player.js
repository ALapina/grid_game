import { Sprite } from "kontra";
import { TILE_SIZE, TILE_MAP_SIZE } from "./constants";

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
 * @param {Array} objectsOnMap - Visible objects on the island
 * @param {Array} imgArray - List of images of items that can be placed on the map
 * @returns {Array}
 */
function digTreasure(player, objectsOnMap, imgArray) {
  for (let element of objectsOnMap) {
    if (player.x === element.x && player.y === element.y) {
      return;
    }
  }

  let randomNUmber = Math.floor(Math.random() * imgArray.length);
  let item = Sprite({
    x: player.x,
    y: player.y,
    image: imgArray[randomNUmber],
  });
  objectsOnMap.push(item);
  return item;
}

export { movePlayer, digTreasure };
