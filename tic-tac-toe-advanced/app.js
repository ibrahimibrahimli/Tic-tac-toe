let message = document.getElementById("winner-header");
let boxes = Array.from(document.querySelectorAll(".toe"));
let refreshButton = document.getElementById("refresh");
let initValue = "0";
let playerX = [];
let player0 = [];
let initmessage = "Winner: "

message.textContent = initmessage

eventListeners();

function eventListeners() {
  boxes.forEach((box) => {
    box.addEventListener("click", handleGameController);
  });
  
  refreshButton.addEventListener("click", refreshGame);
}

function handleGameController(e) {
  let targetSpace = e.target;
  if (initValue === "0") {
    initValue = "X";
  } else {
    initValue = "0";
  }
  if (targetSpace.textContent === "" && message.textContent.length <= 8) {
    targetSpace.textContent = initValue;
    clickController(numControl, targetSpace, initValue);
  }
}

function refreshGame() {
  if (confirm("Oyunu yenileyeceyinizden eminsiniz?")) {
    location.reload();
  } else {
    message.textContent = "Oyun yenilenmedi";
    setTimeout(()=>{
      message.textContent = initmessage
    },2000)
  }
}

function clickController(paramsNumControl, paramsTarget, paramsInitValue) {
  let { playerX, player0 } = paramsNumControl(paramsTarget, paramsInitValue);
  let minReq = playerX.length >= 3;
  if (minReq) {
    winnerController(playerX, player0);
  }
}

function numControl(paramsTarget, paramsInitValue) {
  let number = boxes.indexOf(paramsTarget);
  number += 1;
  if (paramsInitValue === "X") {
    playerX.push(number);
  } else {
    player0.push(number);
  }

  return {
    playerX: playerX.sort(),
    player0: player0.sort()
  };
}

function winnerController(paramsX, params0) {
  if (paramsX[2] - paramsX[1] === paramsX[1] - paramsX[0]) {
    message.textContent = `${initmessage} Player X Win`
  } 
  else if (params0[2] - params0[1] === params0[1] - params0[0]) {
    message.textContent = `${initmessage} Player 0 Win`
  }
}


