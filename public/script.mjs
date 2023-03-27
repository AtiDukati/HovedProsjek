import createPuzzlepieces from "./image.mjs";

let home = document.getElementById("home");
let navbar = document.getElementById("navbar");
let loginBtn = document.getElementById("loginBtn");
let register = document.getElementById("register");
let test = document.getElementById("test");

let finish = false;
let finishTime = "";
let timer;
let sec = 0;
let min = 0;

localStorage.clear();

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
      authorization: createBasicAuthString(username.value, password.value),
    },
  });

  if (response.status === 200) {
    console.log("access granted");
    let data = await response.json();
    localStorage.setItem("token", data);
    console.log(data);

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
  let score = (document.getElementById("score").innerHTML = finishTime);
  let submitScoreBtn = document
    .getElementById("submitScoreBtn")
    .addEventListener("click", async () => {
      let response = await fetch("/submitScore", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
          score: finishTime,
        }),
      });

      if (response.status === 200) {
        console.log("New score added");
        //dashBoard();
      }
    });
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

  document.getElementById("profile").addEventListener("click", async () => {
    stopTimer();
    createDashboard("profileDash");

    // let response = await fetch("/getProfile", {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application.json",
    //   },
    //   body: JSON.stringify({
    //     token: localStorage.getItem("token")
    //   })
    // });

    // let data = await response.json();
    

    // const list = document.getElementById("listProfile");

    // data.forEach((element) => {
    //   const instance = document.createElement("li");
    //   instance.innerHTML = `${element.username}: ${element.score}`;
    //   list.appendChild(instance);
    // });
  });

  document.getElementById("highscore").addEventListener("click", async () => {
    stopTimer();
    createDashboard("highscoreDash");

    let response = await fetch("/scorboard", {
      method: "GET",
      headers: {
        "content-type": "application.json",
      },
    });

    let data = await response.json();
    console.log(data);

    const list = document.getElementById("listScorebord");

    data.forEach((element) => {
      const instance = document.createElement("li");
      instance.innerHTML = `${element.username}: ${element.score}`;
      list.appendChild(instance);
    });
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
  sec = 0;
  min = 0;

  timer = setInterval(start, 1000);

  function start() {
    let secFinal;
    let minFinal;

    if (min < 10) {
      minFinal = `0${min}`;
    } else {
      minFinal = ` ${min}`;
    }

    if (sec < 10) {
      secFinal = `0${sec}`;
    } else {
      secFinal = ` ${sec}`;
    }

    document.getElementById(
      "timer"
    ).innerHTML = `Time: ${minFinal}: ${secFinal}`;

    sec++;
    if (sec % 60 == 0) {
      min++;
      sec = 0;
    }
  }
}

function stopTimer() {
  clearInterval(timer);
  finishTime = `${min}:${sec}`;
  sec = 0;
  min = 0;
  console.log(finishTime);
}

function createBasicAuthString(username, password) {
  let combinedStr = `${username}:${password}`;
  let b64Str = btoa(combinedStr);
  return "basic " + b64Str;
}

export { createDashboard, startTimer, stopTimer, submitScoreScreen };
