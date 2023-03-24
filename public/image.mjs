import { createDashboard, startTimer, stopTimer, submitScoreScreen } from "./script.mjs";

let currTile;
let otherTile;

let imagePeaces = [];
let blankImagePeaces = [];
// const numberOfPieces = 40;

// let finish = false;
// let finishTime = "";

function createPuzzlepieces() {
    imagePeaces = [];
    blankImagePeaces = [];

  // create an image object for the original image
  const originalImage = new Image();
  originalImage.src = "./Images/robocop.jpg";

  // wait for the original image to load
  originalImage.onload = function () {
    // set the size of each tile
    const tileSize = originalImage.width / (40 / 30);
    //const tileSize = originalImage.width / (40 / 8);

    // calculate the number of rows and columns of tiles needed
    const numRows = originalImage.height / tileSize;
    const numCols = originalImage.width / tileSize;

    // create a canvas element to draw the tiles
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = tileSize;
    canvas.height = tileSize;
    let id = 0;
    // loop through each row and column of tiles
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        // get the position of the current tile
        let x = col * tileSize;
        let y = row * tileSize;

        // draw the current tile onto the canvas
        ctx.clearRect(0, 0, tileSize, tileSize);
        ctx.drawImage(
          originalImage,
          x,
          y,
          tileSize,
          tileSize,
          0,
          0,
          tileSize,
          tileSize
        );

        // create a new img element for the tile
        const tileImage = new Image();
        tileImage.src = canvas.toDataURL();
        tileImage.id = `img ${id}`;

        // add the tile to the page
        //puzzlePieces.appendChild(tileImage);

        actions(tileImage);

        imagePeaces.push(tileImage);

        ctx.clearRect(0, 0, tileSize, tileSize);
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, tileSize, tileSize);

        const tileEmptyImage = new Image();
        tileEmptyImage.src = canvas.toDataURL();
        tileEmptyImage.id = `blank ${id}`;
        //board.appendChild(tileEmptyImage);

        actions(tileEmptyImage);
        blankImagePeaces.push(tileEmptyImage);

        id++;
      }
    }
    imagePeaces.sort(function () {
      return 0.5 - Math.random();
    });
    imagePeaces.forEach((element) => {
      puzzlePieces.appendChild(element);
    });

    blankImagePeaces.forEach((element) => {
      board.appendChild(element);
    });

    console.log(imagePeaces);
  };
}

function actions(elm) {
  elm.addEventListener("dragstart", (e) => {
    //click on image to drag
    currTile = e.target;
  });

  elm.addEventListener("dragover", (e) => {
    //drag an image
    e.preventDefault();
  });

  elm.addEventListener("mouseover", (e) => {
    //e.preventDefault();
    if (e.target.id.includes("blank")) {
      e.target.draggable = false;
    }
  });

  elm.addEventListener("mouseout", (e) => {
    //e.preventDefault();
    e.target.draggable = true;
  });
  // elm.addEventListener("dragenter", (e)=>{ //dragging an image into another one
  //     e.preventDefault();
  // });
  // elm.addEventListener("dragleave", ()=>{ //dragging an image away from another one

  // });
  elm.addEventListener("drop", (e) => {
    //drop an image onto another one
    otherTile = e.target;
    let temp = otherTile.id;

    otherTile.id = currTile.id;

    currTile.id = temp;
    gameStatusCheck();
  });

  elm.addEventListener("dragend", () => {
    //after you completed dragDrop
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;
    console.log("dragend");
  });
}

function gameStatusCheck(params) {
  const tempArr = [];

  blankImagePeaces.forEach((e) => {
    if (e.id.includes("img")) {
      tempArr.push(parseInt(e.id.substr(-2, 2)));
    } else {
      return;
    }
  });

  if (tempArr.length === 6 && checkIfSorted(tempArr)) {
  //if (tempArr.length === 40 && checkIfSorted(tempArr)) {
    console.log("you won");
    stopTimer();
    createDashboard("gameFinish");
    submitScoreScreen();
    
  } else {
    console.log("not yet");
  }
  console.log(tempArr);
}

function checkIfSorted(arr) {
  for (let i = 1; i <= arr.length; i++) {
    if (arr[i] - arr[i - 1] < 0) {
      return false;
    }
  }

  return true;
}



// function clearGame(params) {
//   document.getElementById("score").innerHTML = `You finished in: ${finishTime}`;
// }

export default createPuzzlepieces;


