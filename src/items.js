/**
 * Game Items that can be placed on the Island
 */

const images = [
  "/assets/hole.png",
  "/assets/money.png",
  "/assets/chest.png",
  "/assets/bomb.png",
  "/assets/webdeveloper.png",
];

export default images.map((src) => {
  const item = new Image();
  item.src = src;
  return item;
});
