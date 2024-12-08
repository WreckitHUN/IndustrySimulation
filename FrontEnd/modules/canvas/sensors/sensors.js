import eventBus from "../../eventBus.js";
import { workpieces } from "../workpiece/workpiece.js";
import { inputs } from "../../inputs/inputEvent.js";

// I0 Workpiece at the beginning of the conveyor belt - Opt1
// I1 Director1 extended
// I2 Falling sensor
// I3 Director2 extended
// I4 Capacitive - Senses a piece
// I5 Color sensor - Piece is not black
// I6 Inductive sensor - Piece is metallic

const sensorWidth = 35;
const sensorOffset = 11;
const workpieceWidth = 100;
// Sensor distances on the x axis
const opt1X = 5;
const capacitiveX = 105;
const opticalX = 175;
const inductiveX = 180;
const fallingSX = 250;
const fallingSY = 230;

export default function sensorController(
  ctx,
  capacitiveImage,
  opticalImage,
  inductiveImage,
  fallingSImage,
  laserImage
) {
  // Draw the opt1 sensor
  ctx.drawImage(opticalImage, opt1X, 483);
  // Draw the capacitive sensor
  ctx.drawImage(capacitiveImage, capacitiveX, 483);
  // Draw the color sensor
  ctx.drawImage(opticalImage, opticalX, 483);
  // Draw the inductive sensor
  ctx.drawImage(inductiveImage, inductiveX, 226);
  // Draw the falling sensor
  ctx.drawImage(fallingSImage, fallingSX, fallingSY);
  ctx.drawImage(laserImage, 365, fallingSY + 34);

  let lastWorkpiece = workpieces[workpieces.length - 1];
  // There is no workpiece
  if (lastWorkpiece === undefined) {
    // draw the laser to the end
    // There is a workpiece on the conveyor
  } else {
    let [x, y] = lastWorkpiece.getPosition();
    let type = lastWorkpiece.getType();
    //OPT1
    // Check if the workpiece is within the opt1 sensor range
    if (withinSensorRange(x, opt1X)) {
      // If the sensor is not already activated, activate it
      if (!inputs[0].value) {
        inputs[0].value = 1;
        eventBus.emit("changeInput", inputs[0]);
        console.log("OPT1on");
      }
    } else {
      // If the sensor is activated and the workpiece is out of range, deactivate it
      if (inputs[0].value) {
        inputs[0].value = 0;
        eventBus.emit("changeInput", inputs[0]);
        console.log("OPT1off");
      }
    }
    //CAPACITIVE
    // Check if the workpiece is within the capacitive sensor range
    if (withinSensorRange(x, capacitiveX)) {
      // If the sensor is not already activated, activate it
      if (!inputs[4].value) {
        inputs[4].value = 1;
        eventBus.emit("changeInput", inputs[4]);
        console.log("CAPon");
      }
    } else {
      // If the sensor is activated and the workpiece is out of range, deactivate it
      if (inputs[4].value) {
        inputs[4].value = 0;
        eventBus.emit("changeInput", inputs[4]);
        console.log("CAPoff");
      }
    }
    //COLOR
    // Check if the workpiece is within the color sensor range and not black
    if (withinSensorRange(x, opticalX) && type !== "black") {
      // If the sensor is not already activated, activate it
      if (!inputs[5].value) {
        inputs[5].value = 1;
        eventBus.emit("changeInput", inputs[5]);
        console.log("COLORon");
      }
    } else {
      // If the sensor is activated and the workpiece is out of range, deactivate it
      if (inputs[5].value) {
        inputs[5].value = 0;
        eventBus.emit("changeInput", inputs[5]);
        console.log("COLORoff");
      }
    }
    //INDUCTIVE
    // Check if the workpiece is within the inductive sensor range and is metallic
    if (withinSensorRange(x, inductiveX) && type === "alu") {
      // If the sensor is not already activated, activate it
      if (!inputs[6].value) {
        inputs[6].value = 1;
        eventBus.emit("changeInput", inputs[6]);
        console.log("ALUon");
      }
    } else {
      // If the sensor is activated and the workpiece is out of range, deactivate it
      if (inputs[6].value) {
        inputs[6].value = 0;
        eventBus.emit("changeInput", inputs[6]);
        console.log("ALUof");
      }
    }
    //FALLING
    // Check if the workpiece is within the Falling sensor range
    if (
      y <= fallingSY + sensorOffset + sensorWidth &&
      y + workpieceWidth >= fallingSY + sensorOffset
    ) {
      // If the sensor is not already activated, activate it
      if (!inputs[2].value) {
        inputs[2].value = 1;
        eventBus.emit("changeInput", inputs[2]);
        console.log("FALLINGon");
      }
    } else {
      // If the sensor is activated and the workpiece is out of range, deactivate it
      if (inputs[2].value) {
        inputs[2].value = 0;
        eventBus.emit("changeInput", inputs[2]);
        console.log("FALLINGof");
      }
    }
  }
}

function withinSensorRange(x, sensorsX) {
  return (
    x + workpieceWidth >= sensorsX + sensorOffset &&
    sensorsX + sensorOffset + sensorWidth >= x
  );
}
