import {
  init,
  Sprite,
  GameLoop,
  TileEngine,
  load,
  dataAssets,
  initKeys,
} from "kontra";

let { canvas, context } = init();

console.log(canvas);
console.log(context);

// увеличиваем скейл что бы тайл мап помещался в игровое поле
context.scale(3, 3);

/*
document.addEventListener("keydown", event => {
  if (event.key === 'ArrowRight') {
    console.log('Right pressed');
    player.x += 0.1;
  } else if (event.key === 'ArrowLeft') {
    console.log('Left pressed');
    player.x -= 0.1;
  } else if (event.key === 'ArrowUp') {
    console.log('Up pressed');
    player.y -= 0.1;
  } else if (event.key === 'ArrowDown') {
    console.log('Down pressed');
    player.y += 0.1;
  }
})
*/

load("assets/js13kb-tileset.png", "assets/ground.json").then(function (assets) {
  let data = dataAssets["assets/ground"];
  // A hack to fix a bug in kontra engine
  // when it can't read tileset from the JSON file
  data.tilesets[0] = {
    firstgid: 1,
    image: assets[0],
  };
  let tileEngine = TileEngine(data);

  let img = new Image();
  img.src = "/assets/hero.png";

  let player = Sprite({
    x: 0,
    y: 0,
    // anchor: {
    //   x: 0.5,
    //   y: 0.5
    // },
    image: img,
  });

  //tileEngine.addObject(player);

  initKeys();

  bindKeys(["d", "right_arrow"], function (e) {
    e.preventDefault();
    player.x += 34;
  });

  //const isCollide = tileEngine.layerCollidesWith('collision_objects', player);
  //console.log(isCollide);

  let loop = GameLoop({
    update: function () {
      /*
      if (keyPressed('up')) {
        player.y -= 4;
      } else if (keyPressed('down')) {
        player.y += 4;
      } else if (keyPressed('left')) {
        player.x -= 4;
      } else if (keyPressed('right')) {
        player.x += 4;
      }
      */

      if (tileEngine.layerCollidesWith("collision_objects", player)) {
        //player.x = 0;
        //console.log('THIS IS COLLISION');
        //console.log(isCollide);
      }
    },
    render: function () {
      tileEngine.render();
      player.render();
    },
  });

  loop.start();
});

//let sprite2 = null;

// let img2 = new Image();
// img2.src = '/assets/player.png';

// let sprite2 = Sprite({
//   x: 200,
//   y: 200,
//   anchor: {
//     x: 0.5,
//     y: 0.5
//   },
//   image: img2,
// });
//sprite2.render();
// console.log(sprite2);

/*
let img = new Image();
img.src = 'assets/mapPack_tilesheet.png';
img.onload = function () {
  let tileEngine = TileEngine({
    //tile size
    tilewidth: 64,
    tileheight: 64,

    //map size in tiles
    //считала от 1, возможно не правильно
    width: 9,
    height: 9,

    //tileset object
    tilesets: [{
      firstgid: 1,
      image: img
    }],

    //layer object
    layers: [{
      name: 'ground',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 10, 7, 7, 8, 0, 0, 0,
        0, 6, 27, 24, 24, 25, 0, 0, 0,
        0, 23, 24, 24, 24, 26, 8, 0, 0,
        0, 23, 24, 24, 24, 24, 26, 8, 0,
        0, 23, 24, 24, 24, 24, 24, 25, 0,
        0, 40, 41, 41, 10, 24, 24, 25, 0,
        0, 0, 0, 0, 40, 41, 41, 42, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0
      ]
    }]
  });
  tileEngine.render();
}
*/

// let sprite = Sprite({
//   x: 100,
//   y: 100,
//   color: 'lightgreen',
//   width: 20,
//   height: 20,
// });
