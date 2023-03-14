let currTile;
let otherTile;

let imagePeaces = [];
let blankImagePeaces = [];

function createPuzzlepieces() {

// create an image object for the original image
const originalImage = new Image();
originalImage.src = './Images/robocop.jpg';

const numberOfPieces = 40;

// wait for the original image to load
originalImage.onload = function() {
// set the size of each tile
const tileSize = originalImage.width/(numberOfPieces/8);

// get the dimensions of the original image
const imageWidth = originalImage.width;
const imageHeight = originalImage.height;

// calculate the number of rows and columns of tiles needed
const numRows = imageHeight / tileSize;
const numCols = imageWidth / tileSize;

// create a canvas element to draw the tiles
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = tileSize;
canvas.height = tileSize;
let id = 0;
// loop through each row and column of tiles
for(let row = 0; row < numRows; row++) {
for(let col = 0; col < numCols; col++) {
// get the position of the current tile
let x = col * tileSize;
let y = row * tileSize;

// draw the current tile onto the canvas
ctx.clearRect(0,0,tileSize,tileSize)
ctx.drawImage(originalImage, x, y, tileSize, tileSize, 0, 0, tileSize, tileSize);

// create a new img element for the tile
const tileImage = new Image();
tileImage.src = canvas.toDataURL();
tileImage.id = `img ${id}`;


// add the tile to the page
//puzzlePieces.appendChild(tileImage);

actions(tileImage);

imagePeaces.push(tileImage)

ctx.clearRect(0,0,tileSize,tileSize)
ctx.fillStyle = "#FFFFFF";
ctx.fillRect(0,0,tileSize,tileSize)


const tileEmptyImage = new Image();
tileEmptyImage.src = canvas.toDataURL();
tileEmptyImage.id = `blank ${id}`;
//board.appendChild(tileEmptyImage);
    
actions(tileEmptyImage);
blankImagePeaces.push(tileEmptyImage)

id++
}
}
imagePeaces.sort(function(){return 0.5 - Math.random()});
imagePeaces.forEach(element => {
    puzzlePieces.appendChild(element)
});


blankImagePeaces.forEach(element => {
    board.appendChild(element)
});

};

}


function actions(elm) {
    elm.addEventListener("dragstart", (e)=>{ //click on image to drag
        currTile = e.target;
        console.log(currTile);
    }); 
    elm.addEventListener("dragover", (e)=>{ //drag an image
        e.preventDefault();
    });   
    elm.addEventListener("dragenter", (e)=>{ //dragging an image into another one
        e.preventDefault();
    }); 
    elm.addEventListener("dragleave", ()=>{ //dragging an image away from another one
        
    }); 
    elm.addEventListener("drop", (e)=>{ //drop an image onto another one
        //console.log(e.target)
        otherTile = e.target
        // currTile.id = otherTile.id;
        otherTile.id = currTile.id;
        currTile.id = otherTile.id;
        console.log(otherTile);

        console.log("drop");
    });       
    elm.addEventListener("dragend", ()=>{ //after you completed dragDrop
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;
        

        //console.log("hei");
    
    });
}

export default createPuzzlepieces
