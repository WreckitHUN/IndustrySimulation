const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.moveTo(5, 5);
ctx.lineTo(105, 5);
ctx.lineTo(125, 50);
ctx.lineTo(5, 50);
ctx.lineTo(5, 5);

ctx.stroke();
