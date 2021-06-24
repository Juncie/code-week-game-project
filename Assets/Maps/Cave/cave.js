const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const ground = new Image();
ground.src = '../../tileSets/Cave.png'

const tileSize = 16;
const tileOutputSize = 1.8;
const updatedTileSize = tileSize * tileOutputSize;

const tileCol = 32;
const tileRow = 32;

const mapCols = 32;
const mapRows = 32;

const mapHeight = mapRows * tileSize;
const mapWidth = mapCols * tileSize;

const layerOneMap = [
554,554,554,554,554,554,554,554,554,554,554,554,554,554,554,554,554,554,554,554,554,554,554,554,554,554,554,554,554,554,554,554,
554,554,611,611,611,611,611,611,611,611,611,611,611,611,611,611,611,611,611,611,611,611,611,611,611,611,611,611,611,611,611,554,
554,554,465,466,467,468,469,470,465,466,467,468,466,467,407,407,407,407,466,467,468,465,466,467,468,469,470,465,466,467,611,554,
554,554,465,466,467,468,469,470,465,466,467,468,466,467,407,407,407,407,466,467,468,465,466,467,468,469,470,465,466,467,611,554,
554,554,466,466,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,466,466,611,554,
554,554,466,466,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,466,466,611,554,
554,554,466,466,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,466,466,611,554,
554,554,466,466,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,466,466,611,554,
554,554,466,466,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,466,466,611,554,
554,554,466,466,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,466,466,611,554,
554,554,466,466,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,466,466,611,554,
554,554,466,466,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,466,466,611,554,
554,554,466,466,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,466,466,611,554,
554,554,466,466,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,466,466,611,554,
554,554,466,466,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,466,466,611,554,
554,554,466,466,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,466,466,611,554,
554,554,466,466,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,466,466,611,554,
554,554,466,466,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,466,466,611,554,
554,554,466,466,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,466,466,611,554,
554,554,466,466,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,466,466,611,554,
554,554,466,466,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,466,466,611,554,
554,554,466,466,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,466,466,611,554,
554,554,466,466,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,466,466,611,554,
554,554,466,466,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,466,466,611,554,
554,554,466,466,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,466,466,611,554,
554,554,466,466,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,466,466,611,554,
554,554,466,466,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,466,466,611,554,
554,554,466,466,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,466,466,611,554,
554,554,466,466,466,466,466,466,466,466,466,466,466,466,466,280,280,280,280,280,466,466,466,466,466,466,466,466,466,466,611,554,
554,554,466,466,466,466,466,466,466,466,466,466,466,466,466,280,280,280,280,280,466,466,466,466,466,466,466,466,466,466,611,554,
554,554,554,554,554,554,554,554,554,554,554,554,554,554,554,280,280,280,280,280,554,554,554,554,554,554,554,554,554,554,554,554,
554,554,554,554,554,554,554,554,554,554,554,554,554,554,554,280,280,280,280,280,554,554,554,554,554,554,554,554,554,554,554,554

]

const layerTwoMap = [
  0,0,0,0,0,0,0,0,541,542,0,527,528,0,916,917,918,919,0,527,528,0,541,542,0,0,0,717,541,542,720,0,
  0,0,573,574,717,0,603,604,573,574,0,559,560,0,948,949,950,951,0,559,560,0,573,574,603,604,603,604,573,574,0,0,
  0,0,605,606,603,604,635,636,605,606,0,591,592,0,980,981,982,983,0,591,592,0,605,606,635,636,635,636,605,606,0,0,
  0,0,637,638,635,636,603,604,637,638,0,623,624,0,0,0,0,0,0,623,624,0,637,638,607,603,604,0,637,638,0,0,
  0,0,541,542,0,0,635,636,0,720,0,0,0,0,0,0,0,0,0,0,0,87,0,89,0,635,636,603,604,0,0,0,
  0,0,573,574,603,604,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,635,636,542,0,0,
  0,0,605,606,635,636,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,637,638,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,542,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,657,658,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,657,658,659,660,661,662,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,689,690,691,692,693,694,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,721,722,723,724,725,726,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,753,754,755,756,757,758,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,542,0,0,0,0,0,0,0,0,0,0,858,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,717,0,0,542,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,717,0,859,860,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,859,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,525,526,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,557,558,0,0,0,657,658,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,87,88,1610612816,1610612848,0,589,590,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,655,656,0,0,0,
  0,0,655,656,119,120,1610612815,1610612847,654,621,622,0,0,0,0,0,0,0,0,0,0,0,0,0,717,718,719,687,688,0,0,0,
  0,0,687,688,151,152,153,685,686,607,608,0,860,0,0,0,0,0,0,0,0,0,0,0,749,750,751,752,0,0,0,0,
  0,0,717,718,719,607,608,607,608,639,640,0,0,0,0,0,0,0,0,0,0,0,0,0,781,782,783,784,655,656,0,0,
  0,0,749,750,751,639,640,639,640,0,0,0,0,0,0,0,0,0,0,0,0,0,655,656,813,814,815,816,687,688,0,0,
  0,0,781,782,783,784,655,656,0,0,0,0,0,0,0,0,0,0,0,0,0,0,687,688,0,655,656,0,655,656,0,0,
  0,0,813,814,815,816,687,688,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,687,688,0,687,688,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
]





let mapIndex = 0;
let sourceX = 0;
let sourceY = 0;

function draw() {

  let mapIndex = 0;

  for (let col = 0; col < mapHeight; col += tileSize) {
    for (let row = 0; row < mapWidth; row += tileSize) {
      let tileVal = layerOneMap[mapIndex];
      if (tileVal != 0) {
        tileVal -= 1;
        sourceY = Math.floor(tileVal / tileCol) * tileSize;
        sourceX = (tileVal % tileCol) * tileSize;
        ctx.drawImage(ground, sourceX, sourceY, tileSize, tileSize, row * tileOutputSize, col * tileOutputSize, updatedTileSize, updatedTileSize);

        //LINK TO SECOND LAYER
            
        tileVal = layerTwoMap[mapIndex];
        if(tileVal !=0) {
        tileVal -= 1;
        sourceY = Math.floor(tileVal/tileCol) * tileSize;
        sourceX = (tileVal % tileCol) * tileSize;
        ctx.drawImage(ground, sourceX, sourceY, tileSize, tileSize, row * tileOutputSize, col * tileOutputSize, updatedTileSize, updatedTileSize);
     }

        if (currentPos === mapIndex) {
          newWarrior.x = row * tileOutputSize
          newWarrior.y = (col - tileSize) * tileOutputSize
          newWarrior.w = updatedTileSize
          newWarrior.h = updatedTileSize

          newWarrior.draw();
        }
        //ctx.drawImage(this.img, this.sx, this.sy, 70, 65, this.x, this.y, canvas.width / 28, canvas.height / 20);

      }

      mapIndex++;
    }
  }
}

class Character {
  constructor(name, img, strength, health, x, y, sx, sy) {
    this.img = img;
    this.name = name,
      this.strength = strength,
      this.health = health,
      this.x = x,
      this.y = y,
      this.sx = sx,
      this.sy = sy
  }

  draw = () => {
    ctx.drawImage(this.img, this.sx, this.sy, 70, 65, this.x, this.y, canvas.width / 28, canvas.height / 20);
  }
}

let defaultPos = 1008;


let currentPos = defaultPos;

// warrior image
let character = new Image();
character.src = "../../../images/warrior_up.png"
let characterDown = new Image();
characterDown.src = "../../../images/warrior_down.png"
let characterLeft = new Image();
characterLeft.src = "../../../images/warrior_left.png"
let characterRight = new Image();
characterRight.src = "../../../images/warrior.png"



// INSTANCES OF CLASSES
let newWarrior = new Character('Warrior', character, 123, 100, ((defaultPos / 32) % tileSize) * 32, defaultPos / 32 * tileSize, 0, 0);




function animate() {
  requestAnimationFrame(animate);
  // WATCH OUT FOR CLEAR
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  draw();
  newWarrior.draw();
}

window.onload = animate;

window.onkeydown = function (e) {

  // MOVEMENT OF THE MAIN CHARACTER
  if (e.key === "ArrowLeft") {
    if (layerOneMap[currentPos - 1] === 280) {
      //newWarrior.x -= 16;
      newWarrior.img = characterLeft
      currentPos -= 1;

    }
  }
  if (e.key === "ArrowRight") {
    if (layerOneMap[currentPos + 1] === 280) {
      //newWarrior.x += 16;
      newWarrior.img = characterRight
      currentPos += 1;
    }
  }
  if (e.key === "ArrowUp") {
    if (layerOneMap[currentPos - 32] === 280) {
      // newWarrior.y -= 16;
      newWarrior.img = character
      currentPos -= 32;
    }
  }
  if (e.key === "ArrowDown") {
    if (layerOneMap[currentPos + 32] === 280) {
      // newWarrior.y += 16;
      newWarrior.img = characterDown
      currentPos += 32;
    }
  }
  console.log(currentPos)
  if (currentPos <= 500) {
     window.location.href = "../../../battle/battle.html";
  } 
};





// const layerTwoMap = [ 
//     0, 0, 0, 0, 0, 0, 0, 15, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
//     0, 0, 0, 0, 0, 0, 0, 47, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 720, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     657, 658, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 87, 88, 89, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 119, 120, 121, 653, 654, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 151, 152, 153, 685, 686, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 858, 859, 860, 0, 859, 860, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 655, 656, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 890, 891, 892, 0, 891, 892, 0, 0, 0, 0, 891, 892, 0, 0, 0, 0, 0, 0, 0, 687,
//     688, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 922, 923, 924, 0, 923, 924, 0, 925, 926, 0, 923, 924, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 954, 955, 956, 0, 955, 956, 0, 957, 958, 0, 955,
//     956, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 541, 542, 0, 0, 0, 0, 0, 0, 0,
//     541, 542, 0, 858, 859, 860, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 573, 574, 0, 0, 0, 0,
//     0, 0, 0, 573, 574, 0, 890, 891, 892, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 605, 606, 0,
//     0, 0, 603, 604, 0, 0, 605, 606, 0, 922, 923, 924, 0, 603, 604, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 637, 638, 0, 0, 0, 635, 636, 0, 0, 637, 638, 0, 954, 955, 956, 0, 635, 636, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 657, 658, 659, 660, 661, 662, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 689, 690, 691, 692, 693, 694, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 721, 722, 723, 724, 725, 726, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 753, 754, 755, 756, 757, 758, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
