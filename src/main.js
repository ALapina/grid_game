import { load } from "kontra";
import { initGame } from "./init";
import initialState from "./state";

import Title from "./scenes/title";

initGame();
const game = initialState;

load("assets/js13kb-tileset.png", "assets/hero.png", "assets/ground.json").then(
  (assets) => {
    Title(game);
  }
);
