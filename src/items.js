/**
 * Game Items that can be placed on the Island
 */

const loadImg = (imgPath) => {
  const img = new Image();
  img.src = imgPath;
  return img;
};

export default [
  { image: loadImg("/assets/hole.png"), score: 0 },
  { image: loadImg("/assets/money.png"), score: 100 },
  { image: loadImg("/assets/chest.png"), score: 0 },
  { image: loadImg("/assets/bomb.png"), score: -100 },
  { image: loadImg("/assets/webdeveloper.png"), score: -100 },
];
