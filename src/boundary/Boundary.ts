import Model from "../model/Model";

export default function redrawCanvas(
  model: Model,
  canvasObj: HTMLCanvasElement,
  appObj: any
) {
  const ctx = canvasObj.getContext("2d") as CanvasRenderingContext2D;

  // clear the canvas area before rendering the coordinates held in state
  ctx.clearRect(0, 0, canvasObj.width, canvasObj.height); // assume square region

  // DRAW SQUARES....
  let sq1 = model.board.squares[0];
  let sq2 = model.board.squares[1];

  // (1) SOMEHOW DRAW BOARD!!!

  // 400 x 400 AND this must support up to 6x6
  // if a square were 60 pixels
  ctx.fillStyle = sq1.color;
  ctx.fillRect(sq1.column * 60, sq1.row * 60, 60, 60);

  ctx.fillStyle = sq2.color;
  ctx.fillRect(sq2.column * 60, sq1.row * 60, 60, 60);

  // (2) DRAW THE SELECTED GROUP IF ANY
  ctx.strokeStyle = "red";
  ctx.lineWidth = 4;
  ctx.rect(sq1.column * 60, sq1.row * 60, 60, 60);
  ctx.stroke();

  // NOTHING colored for the stroke
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;

  // (3) SOMEHOW DRAW CIRCLES!!!
  ctx.beginPath();
  ctx.arc(60, 60, 10, 0, 2 * Math.PI, false);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.stroke();
}
