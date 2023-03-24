import createPuzzlepieces from "./image.mjs";

let home = document.getElementById("home");

let loginBtn = document.getElementById("loginBtn");
let register = document.getElementById("register");
let test = document.getElementById("test");

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

async function dashBoard() {
  createDashboard("dashboard");

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
    createDashboard("profileDash");
  });

  document.getElementById("highscore").addEventListener("click", () => {
    createDashboard("highscoreDash");
  });

  document.getElementById("game").addEventListener("click", () => {
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

export { createDashboard };
