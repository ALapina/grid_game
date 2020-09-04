import { Text } from "kontra";
import { SCREEN_SIZE_PX } from "./constants";

/**
 * Creates new text object
 *
 * @param {string} text - Displayed text
 * @param {number} fontsize - Size of the font
 * @param {number} x - position horizontal, defaults to 0
 * @param {number} y - position vertical, defaults to 0
 * @param {string} textAlign - center (default), right, left, start or end
 * @param {string} color - text color, white by default
 * @param {number} width - width of the text block, usefull for centering the text, by default playground size
 */
const makeTextNode = (
  text,
  fontsize,
  x = 0,
  y = 0,
  textAlign = "center",
  color = "white",
  width = SCREEN_SIZE_PX
) =>
  new Text({
    text,
    font: `${fontsize}px Arial`,
    x,
    y,
    width,
    color,
    textAlign,
  });

export { makeTextNode };
