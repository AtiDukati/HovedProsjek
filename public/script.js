let home = document.getElementById("home");
let username = document.getElementById("username");
let password = document.getElementById("password");
let loginBtn = document.getElementById("loginBtn");
let register = document.getElementById("register");
let rob = new Image;
rob.src = "/Images/robocop.jpg";

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
