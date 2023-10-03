import type Model from "../model/Model";

/* Boundary */
export default function redrawCanvas(model: Model, canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  /* Clear canvas content */
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  /* Draw board on canvas */
  const { squares } = model.board;
  for (let csq of squares) {
    ctx.fillStyle = csq.color === "undefined" ? "white" : csq.color;
    ctx.fillRect(csq.column * 60, csq.row * 60, 60, 60);
    ctx.strokeStyle = "#2F528F";
    ctx.lineWidth = 2;
    ctx.rect(csq.column * 60, csq.row * 60, 60, 60);
    ctx.stroke();
  }

  ctx.beginPath();
  for (let sq1 of model.board.selected) {
    ctx.strokeStyle = "red";
    ctx.lineWidth = 1;
    ctx.rect(sq1.column * 60, sq1.row * 60, 60, 60);
    ctx.stroke();
  }
}
