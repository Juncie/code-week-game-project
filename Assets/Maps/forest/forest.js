const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const grass = new Image ();
grass.src = 'forest tiles.png'
grass.onload = draw;


let tileSize = 32;
let tileOutputSize = .9;
let updatedTileSize = tileSize * tileOutputSize;

let tileCol = 36;
let tileRow = 32;

let mapCols = 32;
let mapRows = 32;

let mapHeight = mapRows * tileSize;
let mapWidth = mapCols * tileSize;


let layerTwoMap = [
   0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
   0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
   0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
   0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
   0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
   1096,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1025,0,0,0,1064,1065,0,0,0,1096,
   0,0,1025,0,0,355,356,357,0,0,0,0,355,356,357,0,0,0,0,0,355,356,357,0,743,744,1100,1101,0,0,0,0,
   358,359,360,0,0,391,392,393,358,359,360,0,391,392,393,0,358,359,360,0,391,392,393,0,779,780,1136,1137,0,1025,0,0,
   394,395,396,0,0,427,428,429,394,395,396,0,427,428,429,0,394,395,396,0,427,428,429,0,0,2147483856,2147483856,244,406,0,0,0,
   430,431,432,0,0,463,464,465,430,431,432,0,463,464,465,0,430,431,432,0,463,464,465,0,0,0,0,0,355,356,357,0,
   0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,391,392,393,0,
   0,1096,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,427,428,429,0,
   0,0,0,0,355,356,357,1025,0,0,0,0,0,0,0,0,355,356,357,1025,0,0,355,356,357,0,0,0,463,464,465,0,
   0,0,0,0,391,392,393,0,0,355,356,357,0,0,0,0,391,392,393,0,0,0,391,392,393,0,0,0,355,356,357,2147484054,
   358,359,360,0,427,428,429,0,2147484054,391,392,393,0,634,635,636,427,428,429,355,356,357,427,428,429,0,0,0,391,392,393,0,
   394,395,396,0,463,464,465,0,0,427,428,429,0,670,671,672,463,464,465,391,392,393,463,464,465,0,0,0,427,428,429,0,
   430,431,432,0,1025,0,355,356,357,463,464,465,1096,706,707,708,0,0,0,427,428,429,0,0,0,0,0,0,463,464,465,0,
   0,638,639,0,0,0,391,392,393,0,0,0,0,0,0,406,0,0,1025,463,464,465,0,0,0,0,0,0,355,356,357,0,
   0,674,675,834,835,0,427,428,429,0,0,0,0,834,835,0,638,639,0,0,0,0,0,2147484054,0,0,0,0,391,392,393,0,
   0,0,0,870,871,0,463,464,465,0,0,834,835,870,871,0,674,675,0,0,0,1124,0,0,0,0,0,0,427,428,429,0,
   0,0,0,0,0,0,0,0,0,0,0,870,871,834,835,0,0,0,0,0,0,0,0,0,0,0,0,0,463,464,465,0,
   0,0,0,0,0,0,0,0,0,0,638,639,0,870,871,0,0,0,0,0,0,358,359,360,0,0,0,0,0,0,1025,0,
   0,0,0,358,359,360,0,0,0,0,674,675,0,0,0,0,638,639,0,0,0,394,395,396,0,0,0,358,359,360,0,0,
   358,359,360,394,395,396,0,0,0,0,0,0,0,0,0,0,674,675,0,0,0,430,431,432,358,359,360,394,395,396,0,0,
   394,395,396,430,431,432,1025,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,394,395,396,430,431,432,0,0,
   430,431,432,406,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,355,356,357,0,430,431,432,355,356,357,0,1096,
   0,0,0,0,355,356,357,0,0,0,0,0,0,0,0,0,0,0,0,0,391,392,393,0,0,0,0,391,392,393,0,0,
   0,355,356,357,391,392,393,0,0,0,0,0,355,356,357,0,0,0,0,0,427,428,429,0,0,1025,0,427,428,429,0,0,
   0,391,392,393,427,428,429,0,355,356,357,0,391,392,393,0,1096,0,355,356,357,464,465,355,356,357,0,0,464,465,0,0,
   0,427,428,429,463,464,465,0,391,392,393,0,427,428,429,0,0,0,391,392,393,0,0,391,392,393,0,1096,0,0,0,0,
   0,463,464,465,0,1096,0,0,427,428,429,1025,463,464,465,0,0,0,427,428,429,0,0,427,428,429,0,0,0,0,0,0,
   0,0,0,0,0,0,0,0,463,464,465,0,0,0,0,0,0,0,463,464,465,0,0,463,464,465,0,0,0,0,0,0
   
]
   

let layerOneMap = [
   454,454,454,454,454,454,454,454,454,454,454,454,454,454,454,454,454,454,454,454,454,454,454,454,454,454,454,454,454,454,454,454,
   454,454,454,454,454,454,454,454,454,454,454,454,454,454,454,454,454,454,454,454,454,454,454,454,454,454,454,454,454,454,454,454,
   454,454,454,454,454,454,454,454,454,454,454,454,454,454,454,454,454,454,523,524,454,454,454,454,454,454,454,454,454,454,454,454,
   454,454,454,454,454,454,454,454,454,454,454,454,454,454,454,454,454,454,559,560,454,454,454,454,454,454,454,454,454,454,454,454,
   408,408,409,408,409,409,408,409,408,409,409,409,408,409,408,409,408,409,183,183,408,408,408,408,408,408,408,409,408,409,409,409,
   409,409,409,183,182,182,183,183,182,182,183,183,183,183,183,183,183,183,183,183,408,409,409,408,409,409,409,408,408,409,409,409,
   409,409,409,182,182,182,183,182,182,183,183,182,183,182,183,183,182,183,183,182,408,408,409,408,409,409,408,408,408,409,409,408,
   408,409,408,183,183,409,409,409,409,408,408,408,409,409,409,408,408,408,408,408,408,409,409,409,409,408,408,408,408,408,408,409,
   408,408,409,182,182,409,409,408,408,408,409,409,409,408,408,409,408,408,408,409,409,409,408,408,409,409,409,408,408,409,408,409,
   409,409,409,183,182,409,409,409,408,408,409,409,408,408,409,409,409,408,408,408,409,409,409,408,409,408,409,409,409,408,409,408,
   408,408,408,182,182,183,182,183,182,183,183,183,183,183,183,183,183,182,182,182,182,182,183,182,183,182,183,182,409,408,408,409,
   409,409,409,182,183,182,183,183,183,182,183,183,182,183,183,182,182,183,183,183,182,183,183,183,182,182,183,183,409,409,409,408,
   409,409,408,409,408,409,409,409,409,408,408,408,409,408,409,409,409,409,409,409,409,408,408,408,409,408,182,182,408,408,408,409,
   408,409,408,408,408,408,408,409,408,408,409,408,409,409,409,409,408,408,408,409,409,409,408,409,408,408,183,182,408,408,409,408,
   408,408,409,408,409,409,409,408,408,409,408,408,409,408,409,408,408,409,409,409,409,409,408,408,409,409,183,182,409,409,408,408,
   409,409,408,408,409,408,408,409,408,409,409,408,409,408,408,409,409,408,408,408,408,409,408,409,408,409,183,182,408,408,409,408,
   408,409,409,409,409,409,408,408,408,409,409,409,409,408,409,408,409,408,409,409,409,409,409,409,409,409,183,183,408,409,409,408,
   408,408,409,408,409,408,408,409,408,409,409,408,409,408,409,408,408,408,408,408,409,409,408,408,408,409,182,183,408,408,408,409,
   409,408,408,408,408,408,409,409,409,408,409,409,409,409,408,409,409,409,409,408,409,408,408,408,409,409,183,182,409,408,409,408,
   408,409,408,408,408,408,409,408,408,408,409,409,408,408,409,408,409,409,408,409,409,409,409,409,409,408,183,182,409,409,408,408,
   182,182,182,183,183,183,182,183,182,183,409,408,408,408,409,409,409,408,182,183,182,183,183,182,182,183,182,183,409,409,408,408,
   182,183,182,182,183,182,182,182,183,182,408,408,408,409,408,408,408,409,182,183,183,182,182,183,183,183,183,183,409,408,408,408,
   408,409,409,408,409,409,408,409,182,183,408,408,409,409,408,409,409,409,183,183,408,409,408,409,409,408,409,408,409,409,408,408,
   408,409,409,408,408,409,408,408,183,183,408,409,408,409,408,408,408,408,182,182,408,408,409,409,408,408,408,409,409,408,409,409,
   408,409,409,408,408,408,409,408,183,182,182,183,183,182,183,182,183,182,182,182,409,408,409,409,409,409,409,408,408,408,408,409,
   408,409,408,408,409,408,409,409,183,182,183,183,182,182,182,183,182,182,182,182,409,408,408,409,408,409,408,408,409,409,409,409,
   409,408,408,409,409,408,408,409,409,408,409,408,408,409,408,409,409,409,409,408,408,408,409,408,408,408,408,409,409,408,408,408,
   409,409,409,408,409,409,409,409,408,408,408,408,408,408,409,409,408,408,409,408,408,409,409,409,409,408,408,408,408,409,409,409,
   408,408,409,409,408,408,409,408,409,408,408,408,409,408,408,408,409,408,409,409,408,408,408,408,409,408,409,409,408,408,408,408,
   409,408,408,409,409,408,409,408,408,408,408,408,409,408,408,409,408,408,409,409,408,409,409,408,409,408,409,409,408,409,408,409,
   409,408,409,409,408,409,408,408,409,409,409,409,408,408,409,408,409,408,409,409,409,409,409,409,408,408,409,408,409,408,408,409,
   408,408,408,408,409,408,409,409,408,409,408,408,408,408,409,408,408,408,409,408,408,408,409,409,408,408,408,408,409,408,409,408
   ]
   let mapIndex = 0;
   let sourceX = 0;
   let sourceY = 0;

//DRAW THE MAP
function draw () {
  
   let mapIndex = 0;

   for (let col = 0; col < mapHeight; col += tileSize) {
      for (let row = 0; row < mapWidth; row += tileSize) {
        let tileVal = layerOneMap[mapIndex];
        if (tileVal != 0) {
          tileVal -= 1;
          sourceY = Math.floor(tileVal / tileCol) * tileSize;
          sourceX = (tileVal % tileCol) * tileSize;
          ctx.drawImage(grass, sourceX, sourceY, tileSize, tileSize, row * tileOutputSize, col * tileOutputSize, updatedTileSize, updatedTileSize);
  
//LINK TO SECOND LAYER
            
            tileVal = layerTwoMap[mapIndex];
            if(tileVal !=0) {
            tileVal -= 1;
            sourceY = Math.floor(tileVal/tileCol) * tileSize;
            sourceX = (tileVal % tileCol) * tileSize;
            ctx.drawImage(grass, sourceX, sourceY, tileSize, tileSize, row * tileOutputSize, col * tileOutputSize, updatedTileSize, updatedTileSize);
         }

          if (currentPos === mapIndex - 32) {
            newWarrior.x = (row * tileOutputSize) - 16
            newWarrior.y = (col - 1.8* tileSize) * tileOutputSize
            // newWarrior.w = updatedTileSize
            // newWarrior.h = updatedTileSize
  
            newWarrior.draw();
          }
          mapIndex ++;
    }
   }
}
}

// DRAWING AND ANIMATING THE CHARACTER

class Character {
   constructor(name, img, strength, health, x, y, sx, sy, w, h) {
     this.img = img;
     this.name = name,
       this.strength = strength,
       this.health = health,
       this.x = x,
       this.y = y,
       this.sx = sx,
       this.sy = sy
       this.w = w
       this.h = h
   }
 
   draw = () => {
     ctx.drawImage(this.img, this.sx, this.sy, 50, 65, this.x, this.y, this.w, this.h);
   }
 }
 
// let defaultPos = 1011;
 let defaultPos = 640;
 
 
 let currentPos = defaultPos;
 
//  warrior image
 let character = new Image();
 character.src = "../../../images/warrior.png";
 
// INSTANCES OF CLASSES
 let newWarrior = new Character('Warrior', character, 0, 0, ((defaultPos / 32) % tileSize) * 32, defaultPos / 32 * tileSize, 0, 0, tileSize *1.5, tileSize * 1.5);
 
 
 function animate() {
   requestAnimationFrame(animate);
   // WATCH OUT FOR CLEAR
   ctx.clearRect(0, 0, canvas.width, canvas.height)
   // newWarrior.draw();
   draw();
 }
 
 window.onload = animate;
 
 window.onkeydown = function (e) {
 
   // MOVEMENT OF THE MAIN CHARACTER
   if (e.key === "ArrowLeft") {
     if (layerOneMap[currentPos - 1] === 182 || layerOneMap[currentPos - 1] === 183) {
       currentPos -= 1;
  
      }
      console.log(layerOneMap[currentPos + 1])
   }
   if (e.key === "ArrowRight") {
     if (layerOneMap[currentPos + 1] === 182 || layerOneMap[currentPos + 1] === 183) {
       //newWarrior.x += 16;
       currentPos += 1;
       
      }
      console.log(layerOneMap[currentPos - 1])
   }
   if (e.key === "ArrowUp") {
     if (layerOneMap[currentPos - 32] === 182 || layerOneMap[currentPos - 32] === 183) {
       currentPos -= 32;
       
      }
      console.log(layerOneMap[currentPos + 32])
   }
   if (e.key === "ArrowDown") {
     if (layerOneMap[currentPos + 32] === 182 || layerOneMap[currentPos + 32] === 183) {
       currentPos += 32;
      }
      // console.log(layerOneMap[currentPos - 32])
   }
 };