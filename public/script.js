import createPuzzlepieces from "./image.mjs"

let home = document.getElementById("home");
let username = document.getElementById("username");
let password = document.getElementById("password");
let loginBtn = document.getElementById("loginBtn");
let register = document.getElementById("register");

let sec = 55;
let min = 0;

//testing
// window.addEventListener("load", ()=>{
//   createDashboard("gameDash");
//     createPuzzlepieces()
// });



loginBtn.addEventListener(`click`, async () => {
  let data = await fetch("/login", {
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
    console.log("acses granted");
    dashBoard();
  }
  console.log(data.status);
});

function dashBoard() {
  createDashboard("dashboard");

  document.getElementById("profile").addEventListener("click", () => {
    createDashboard("profileDash");
  });

  document.getElementById("highscore").addEventListener("click", () => {
    createDashboard("highscoreDash");
  });

  document.getElementById("game").addEventListener("click", () => {
    createDashboard("gameDash");
    createPuzzlepieces();
    setInterval(myTimer, 1000);

  });
}

register.addEventListener(`click`, () => {
  createDashboard("registerDash");
});

function createDashboard(dash) {
  home.innerHTML = "";
  const dashboardTemplate = document.getElementById(dash);
  const clone = dashboardTemplate.content.cloneNode(true);
  home.appendChild(clone);
  console.log(dash);
}

      function myTimer() {
        

        if (sec%60 == 0) {
          min++
          sec = 0;
        }
        
        document.getElementById("timer").innerHTML = `Time: 0${min}: ${sec}`;

        sec++
      };


        
