import {
  createDashboard,
  startTimer,
  stopTimer,
  submitScoreScreen,
} from "./script.mjs";

let currTile;
let otherTile;

let imagePeaces = [];
let blankImagePeaces = [];

function createPuzzlepieces() {
  imagePeaces = [];
  blankImagePeaces = [];

  const originalImage = new Image();
  originalImage.src = "./Images/robocop.jpg";

  originalImage.onload = function () {
    const tileSize = originalImage.width / (40 / 8);

    const numRows = originalImage.height / tileSize;
    const numCols = originalImage.width / tileSize;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = tileSize;
    canvas.height = tileSize;
    let id = 0;

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        let x = col * tileSize;
        let y = row * tileSize;

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

        const tileImage = new Image();
        tileImage.src = canvas.toDataURL();
        tileImage.id = `img ${id}`;

        actions(tileImage);

        imagePeaces.push(tileImage);

        ctx.clearRect(0, 0, tileSize, tileSize);
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, tileSize, tileSize);

        const tileEmptyImage = new Image();
        tileEmptyImage.src = canvas.toDataURL();
        tileEmptyImage.id = `blank ${id}`;

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

  
  };
}

function actions(elm) {
  elm.addEventListener("dragstart", (e) => {
    currTile = e.target;
  });

  elm.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  elm.addEventListener("mouseover", (e) => {
    if (e.target.id.includes("blank")) {
      e.target.draggable = false;
    }
  });

  elm.addEventListener("mouseout", (e) => {
    e.target.draggable = true;
  });

  elm.addEventListener("drop", (e) => {
    otherTile = e.target;
    let temp = otherTile.id;

    otherTile.id = currTile.id;

    currTile.id = temp;
    gameStatusCheck();
  });

  elm.addEventListener("dragend", () => {
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

  if (tempArr.length === 40 && checkIfSorted(tempArr)) {
    console.log("you won");
    stopTimer();
    createDashboard("gameFinish");
    submitScoreScreen();
  } else {
  }
}

function checkIfSorted(arr) {
  for (let i = 1; i <= arr.length; i++) {
    if (arr[i] - arr[i - 1] < 0) {
      return false;
    }
  }

  return true;
}

export default createPuzzlepieces;
