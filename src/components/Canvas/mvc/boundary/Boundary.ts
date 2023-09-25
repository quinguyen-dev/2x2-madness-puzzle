import Model, { Square } from "../../../../model/Model";

export default function redrawCanvas(model: Model, canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  /* Clear canvas content */
  ctx.clearRect(0, 0, canvas.width, canvas.height); // assume square region

  /* Draw board on canvas */
  for (let square of model.board.squares) {
    ctx.fillStyle = square.color;
    ctx.fillRect(square.column * 60, square.row * 60, 60, 60);
    ctx.strokeStyle = "#2F528F";
    ctx.lineWidth = 4;
    ctx.rect(square.column * 60, square.row * 60, 60, 60);
    ctx.stroke();
  }

  /* Highlight selected pieces */
  const { point, squares } = model.board;

  let selected: Square[] = [];
  for (let square of squares) {
    if (
      point.y <= square.row &&
      square.row < point.y + 2 &&
      point.x <= square.column &&
      square.column < point.x + 2
    ) {
      selected.push(square);
    }

    if (selected.length === 4) break;
  }

  ctx.beginPath();
  for (let square of selected) {
    ctx.strokeStyle = "magenta";
    ctx.rect(square.column * 60, square.row * 60, 60, 60);
    ctx.stroke();
  }
}
