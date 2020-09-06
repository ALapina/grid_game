/* Game Init functions */
import { init, initKeys } from "kontra";

const initGame = () => {
  let { context } = init("game");
  initKeys();

  // увеличиваем скейл что бы тайл мап помещался в игровое поле
  context.scale(3, 3);
};

export { initGame };
