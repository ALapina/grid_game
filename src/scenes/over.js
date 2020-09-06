/* Game Over Screen */
import { GameLoop, bindKeys } from "kontra";
import { makeTextNode } from "../utils";

const GameOver = (game) => {
  const screenTitle = makeTextNode("Treasure Not Found", 32, 0, 100);

  const loop = GameLoop({
    render() {
      screenTitle.render();
    },
  });
  loop.start();

  bindKeys("enter", () => {
    loop.stop();
  });
};

export default GameOver;
