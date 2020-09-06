import { GameLoop, bindKeys } from "kontra";
import { GameState } from "../enums";
import { makeTextNode } from "../utils";
import Level from "./level";

const Title = (game) => {
  const gameTitle = makeTextNode("Treasure Hunter", 32, 0, 100);
  const instruction = makeTextNode("Press ENTER to start the game", 12, 0, 200);

  const loop = GameLoop({
    render() {
      gameTitle.render();
      instruction.render();
    },
  });
  loop.start();

  bindKeys("enter", () => {
    loop.stop();
    game.state = GameState.PLAY;
    Level(game);
  });
};

export default Title;
