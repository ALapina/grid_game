import {
  init,
  Sprite,
  GameLoop,
  TileEngine,
  load,
  dataAssets,
  initKeys,
  bindKeys,
} from "kontra";

let {
  canvas,
  context
} = init();

console.log(canvas);
console.log(context);

// увеличиваем скейл что бы тайл мап помещался в игровое поле
context.scale(3, 3);

const TILE_SIZE = 32;
const TILE_MAP_WIDTH = 7;




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

  let objectsOnMap = new Array();

  let imgArray = new Array();

  imgArray[0] = new Image();
  imgArray[0].src = "/assets/hole.png";

  imgArray[1] = new Image();
  imgArray[1].src = "/assets/money.png";

  imgArray[2] = new Image();
  imgArray[2].src = "/assets/chest.png";

  imgArray[3] = new Image();
  imgArray[3].src = "/assets/bomb.png";

  imgArray[4] = new Image();
  imgArray[4].src = "/assets/webdeveloper.png";

  console.log(imgArray);

  let player = Sprite({
    x: TILE_SIZE * 3,
    y: TILE_SIZE * (TILE_MAP_WIDTH - 1),
    // anchor: {
    //   x: 0.5,
    //   y: 0.5
    // },
    image: img,
  });

  initKeys();

  function movePlayer(player, x, y) {
    const nextPlayerPosition = {
      x: x,
      y: y,
      width: player.width,
      height: player.height,
    };
    if (nextPlayerPosition.x > TILE_SIZE * TILE_MAP_WIDTH) {
      return;
    }
    if (nextPlayerPosition.x < 0) {
      return;
    }
    if (nextPlayerPosition.y > TILE_SIZE * TILE_MAP_WIDTH) {
      return;
    }
    if (nextPlayerPosition.y < 0) {
      return;
    }
    if (tileEngine.layerCollidesWith("collision_objects", nextPlayerPosition)) {
      //console.log('THIS IS COLLISION');
      return;
    } else {
      player.y = y;
      player.x = x;
      //console.log('good');
    }


  }

  function dig(player) {

    for (let element of objectsOnMap) {
      if (player.x === element.x && player.y === element.y) {
        return;
      }
    }

    // console.log(objectsOnMap.map(function (element) {
    //   return [element.x, element.y]
    // }));

    let randomNUmber = Math.floor(Math.random() * imgArray.length);
    //console.log(randomNUmber);
    let item = Sprite({
      x: player.x,
      y: player.y,
      image: imgArray[randomNUmber],
    });
    //console.log(item);
    objectsOnMap.push(item);
  }


  bindKeys('up', function (e) {
    movePlayer(player, player.x, player.y - 32);
  });
  bindKeys('down', function (e) {
    movePlayer(player, player.x, player.y + 32);
  });
  bindKeys('left', function (e) {
    movePlayer(player, player.x - 32, player.y);
  });
  bindKeys('right', function (e) {
    movePlayer(player, player.x + 32, player.y);
  });
  bindKeys('space', function (e) {
    dig(player);
  })

  let loop = GameLoop({
    update: function () {},
    render: function () {
      tileEngine.render();
      objectsOnMap.forEach(element => {
        element.render();
      });
      player.render();
    },
  });

  loop.start();
});