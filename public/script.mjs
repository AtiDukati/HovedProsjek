import createPuzzlepieces from "./image.mjs";

let home = document.getElementById("home");
let navbar = document.getElementById("navbar");
let loginBtn = document.getElementById("loginBtn");
let register = document.getElementById("register");
let logout;
let deleteUser;
let no;
let en;
let chosenLanguage = "En";

let finish = false;
let finishTime = "";
let timer;
let sec = 0;
let min = 0;
let secFinal;
let minFinal;

localStorage.clear();

//=============================LOGIN===========================================================
loginBtn.addEventListener(`click`, async () => {
  let username = document.getElementById("username");
  let password = document.getElementById("password");
  let loginResponse = document.getElementById("respons");

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
    profile();
    loginResponse.innerHTML = "";
    let loggedinAs = document.getElementById("name").innerHTML = `${username.value}`
  }else{
    loginResponse.innerHTML = `${response.status}: Invalid username or password`;
  }
  console.log(response.status);
});

//=============================REGISTER===========================================================
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
      window.location.reload();
    }
  });
});

//=============================SUBMIT SCORE===========================================================
function submitScoreScreen() {
  let score = (document.getElementById("score").innerHTML = finishTime);
  let submitScoreBtn = document.getElementById("submitScoreBtn").addEventListener("click", async () => {
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

async function setLanguage() {
  let response = await fetch(`/get${chosenLanguage}`);
  let data = await response.json();
  console.log(data);

  for (let [id, text] of Object.entries(data)) {
    let element = document.getElementById(id);

    console.log(element);
    if (element !== null) {
      console.log(id);
      element.innerHTML = text;
    }
  }
}

async function dashBoard() {
  
  const dashboardTemplate = document.getElementById("dashboard");
  const clone = dashboardTemplate.content.cloneNode(true);
  navbar.appendChild(clone);

  

  createDashboard("profileDash");

  document.getElementById("no").addEventListener("click", async () => {
    chosenLanguage = "No";
    setLanguage();
  });

  document.getElementById("en").addEventListener("click", async () => {
    chosenLanguage = "En";
    setLanguage();
  });

  logout = document.getElementById("logOut");
  logout.addEventListener("click", () => {
    window.location.reload();
  });

  document.getElementById("profile").addEventListener("click", async () => {
    stopTimer();
    profile();
    setLanguage();
  });

  document.getElementById("highscoreBtn").addEventListener("click", async () => {
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
    setLanguage();
  });

  document.getElementById("gameBtn").addEventListener("click", () => {
    finish = false;
    startTimer();
    createDashboard("gameDash");
    createPuzzlepieces();
    setLanguage();
  });
//=======================================DELETE USER========================================================================
  deleteUser = document.getElementById("deleteUser").addEventListener("click", async ()=>{

    let response = await fetch("/deleteUser", {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token")
      })
    });

    // let data = await response.json();
    // console.log(data);
  })

};

function createDashboard(dash) {
  home.innerHTML = "";
  const dashboardTemplate = document.getElementById(dash);
  const clone = dashboardTemplate.content.cloneNode(true);
  home.appendChild(clone);
  console.log(dash);
}

async function profile(params) {
  createDashboard("profileDash");

  let response = await fetch("/getProfile", {
    method: "GET",
    headers: {
      "content-type": "application.json",
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  let data = await response.json();
  console.log(data);

  const list = document.getElementById("listProfile");

  data.forEach((element) => {
    const instance = document.createElement("li");
    instance.innerHTML = `${element.username}: ${element.score}`;
    list.appendChild(instance);
  });
}

function startTimer() {
  sec = 0;
  min = 0;

  timer = setInterval(start, 1000);

  function start() {
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
  finishTime = `${minFinal}:${secFinal}`;
  sec = 0;
  min = 0;
}

function createBasicAuthString(username, password) {
  let combinedStr = `${username}:${password}`;
  let b64Str = btoa(combinedStr);
  return "basic " + b64Str;
}

export { createDashboard, startTimer, stopTimer, submitScoreScreen };
