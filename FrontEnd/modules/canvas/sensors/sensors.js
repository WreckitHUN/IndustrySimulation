import eventBus from "../../eventBus.js";
import createInput from "../../inputs/inputEvent.js";
import { workpieces } from "../workpiece/workpiece.js";
import { inputs } from "../../inputs/inputs.js";

// I0 Workpiece at the beginning of the conveyor belt - Opt1
// I1 Director1 extended
// I2 Falling sensor
// I3 Director2 extended
// I4 Capacitive - Senses a piece
// I5 Color sensor - Piece is not black
// I6 Inductive sensor - Piece is metallic

const sensorWidth = 35;
const workpieceWidth = 100;
// Sensor distances on the x axis
const opt1X = 5;
const capacitiveX = 105;
const opticalX = 175;
const inductiveX = 180;
const fallingSX = 250;

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
  ctx.drawImage(fallingSImage, fallingSX, 270);

  let lastWorkpiece = workpieces[workpieces.length - 1];
  // There is no workpiece
  if (lastWorkpiece === undefined) {
    // draw the laser to the end
    ctx.drawImage(
      laserImage,
      365,
      304,
      laserImage.width / 1,
      laserImage.height
    );
  } else {
    let [x, y] = lastWorkpiece.getPosition();
  }
}
