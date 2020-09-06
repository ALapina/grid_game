import { TileEngine } from "kontra";

const initLevelTileset = (data, image) => {
  data.tilesets[0] = { firstgid: 1, image };
  return TileEngine(data);
};

export default initLevelTileset;
