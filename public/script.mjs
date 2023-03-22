import createPuzzlepieces from "./image.mjs";

let home = document.getElementById("home");
let username = document.getElementById("username");
let password = document.getElementById("password");
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
  let data = await fetch("/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
  });

  if (data.status === 200) {
    console.log("acses granted");

    dashBoard();
  }
  console.log(data.status);
});



test.addEventListener("click", async () => {
  let response = await fetch("/getProfile", {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
  let data = await response.json();
  let tester = data;

  console.log(data);
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


register.addEventListener(`click`, () => {
  createDashboard("registerDash");

  let username = document.getElementById("registerUsername");
  let password = document.getElementById("registerPassword");

  document.getElementById("registerBtn").addEventListener("click", async () => {
    let data = await fetch("/registerUser", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });

    if (data.status === 200) {
      console.log("New user created");
      dashBoard();
    }
    console.log(data.status);
  });





});

function createDashboard(dash) {
  home.innerHTML = "";
  const dashboardTemplate = document.getElementById(dash);
  const clone = dashboardTemplate.content.cloneNode(true);
  home.appendChild(clone);
  console.log(dash);
}

export { createDashboard };
