import createPuzzlepieces from "./image.mjs";

let home = document.getElementById("home");
let navbar = document.getElementById("navbar");
let loginBtn = document.getElementById("loginBtn");
let register = document.getElementById("register");
let test = document.getElementById("test");

let finish = false;
let finishTime = "";
let timer;
let sec = 1;
let min = 0;

// let intervalId = setInterval(myTimer, 1000);

//testing
// window.addEventListener("load", ()=>{
//   createDashboard("gameDash");
//     createPuzzlepieces();
//     setInterval(myTimer, 1000);
// });

loginBtn.addEventListener(`click`, async () => {
  let username = document.getElementById("username");
  let password = document.getElementById("password");

  let response = await fetch("/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
  });

  if (response.status === 200) {
    console.log("acses granted");
    // let data = await response.json();
    // console.log(data);

    dashBoard();
  }
  console.log(response.status);
});

register.addEventListener(`click`, () => {
  createDashboard("registerDash");

  let username = document.getElementById("registerUsername");
  let password = document.getElementById("registerPassword");

  document.getElementById("registerBtn").addEventListener("click", async () => {
    let response = await fetch("/registerUser", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });

    if (response.status === 200) {
      console.log("New user created");
      dashBoard();
    }
  });
});

test.addEventListener("click", async () => {
  let response = await fetch("/getProfile", {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
});

function submitScoreScreen() {

  let endTime = document.getElementById("score").innerHTML = finishTime;
  let submitBtn = document.getElementById("submitScore").addEventListener("click", async ()=>{
    
    let response = await fetch("/registerScore", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        score: finishTime
      }),
    });

    if (response.status === 200) {
      console.log("New score added");
      //dashBoard();
    }
  })
  
}

async function dashBoard() {
  const dashboardTemplate = document.getElementById("dashboard");
  const clone = dashboardTemplate.content.cloneNode(true);
  navbar.appendChild(clone);

  createDashboard("profileDash");

  // let response = await fetch("/getProfile", {
  //   method: "GET",
  //   headers: {
  //     "content-type": "application/json",
  //   },
  // });
  // let data = await response.json();
  // let tester = data;

  // console.log(data);

  document.getElementById("profile").addEventListener("click", () => {
    //finish = true;
    stopTimer();
    createDashboard("profileDash");
  });

  document.getElementById("highscore").addEventListener("click", () => {
    //finish = true;
    stopTimer();
    createDashboard("highscoreDash");
  });

  document.getElementById("game").addEventListener("click", () => {
    finish = false;
    startTimer();
    createDashboard("gameDash");
    createPuzzlepieces();
  });
}

function createDashboard(dash) {
  home.innerHTML = "";
  const dashboardTemplate = document.getElementById(dash);
  const clone = dashboardTemplate.content.cloneNode(true);
  home.appendChild(clone);
  console.log(dash);
}

function startTimer() {
  sec = 1;
  min = 0;

  timer = setInterval(start, 1000);

  function start() {
    document.getElementById("timer").innerHTML = `Time: 0${min}: ${sec}`;

    if (sec % 60 == 0) {
      min++;
      sec = 0;
    }
    sec++;
  }
};



function stopTimer() {
  clearInterval(timer);
  finishTime = `${min}:${sec}`;
  sec = 1;
  min = 0;
  console.log(finishTime);
}

export { createDashboard, startTimer, stopTimer, submitScoreScreen };
