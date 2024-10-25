const I0 = document.querySelector("#I0");
const Q0 = document.querySelector("#Q0");
const enableButton = document.querySelector("#enable");
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const CANVASWIDTH = canvas.width;
const CANVASHEIGHT = canvas.height;
let valveX = 0;
speed = 0.5;

let enable = false;
let inputs = [0, 0, 0, 0, 0, 0, 0, 0];
let outputs = [0, 0, 0, 0, 0, 0, 0, 0];

enableButton.addEventListener("mousedown", () => {
  enable = !enable;
  enableButton.classList.toggle("on");
  animateValve();
});

I0.addEventListener("mousedown", () => {
  inputs[0] = 1;
  changeInputs(inputs);
});

I0.addEventListener("mouseup", () => {
  inputs[0] = 0;
  changeInputs(inputs);
});

async function changeInputs(inputs) {
  if (enable === false) return;
  const response = await fetch("/inputs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: inputs }),
  });

  const data = await response.json();
  console.log(data);
}

async function changeOutputs() {
  if (enable === false) return;
  const response = await fetch("/outputs");
  outputs = await response.json(); // [0, 0, ...]
  if (outputs[0]) {
    Q0.classList.add("on");
  } else Q0.classList.remove("on");
}
setInterval(changeOutputs, 100);

function drawValve() {
  // Clear the canvas
  ctx.clearRect(0, 0, CANVASWIDTH, CANVASHEIGHT);
  // Draw the valve
  ctx.fillStyle = "orange";
  ctx.beginPath();
  ctx.rect(valveX, 50, 100, 30);
  ctx.fill();
}

function updateValvePosition() {
  switch (outputs[0]) {
    case false:
      valveX -= speed;
      if (valveX < 0) valveX = 0;
      break;
    case true:
      valveX += speed;
      if (valveX > CANVASWIDTH - 100) valveX = CANVASWIDTH - 100;
      break;
  }
}

function animateValve() {
  if (!enable) return;
  updateValvePosition();
  console.log(valveX);
  drawValve();
  requestAnimationFrame(animateValve);
}

animateValve();
