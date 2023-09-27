import type Model from "../model/Model";

/* Boundary */
export default function redrawCanvas(model: Model, canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  /* Clear canvas content */
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  /* Draw board on canvas */
  for (let square of model.board.squares) {
    ctx.fillStyle = square.color;
    ctx.fillRect(square.column * 60, square.row * 60, 60, 60);
    ctx.strokeStyle = "#2F528F";
    ctx.lineWidth = 4;
    ctx.rect(square.column * 60, square.row * 60, 60, 60);
    ctx.stroke();
  }

  /* Draw highlight around squares */
  ctx.beginPath();
  for (let square of model.board.selected) {
    ctx.fillStyle = square.color;
    ctx.fillRect(square.column * 60, square.row * 60, 60, 60);
    ctx.strokeStyle = "red";
    ctx.rect(square.column * 60, square.row * 60, 60, 60);
    ctx.stroke();
  }
}

// todo click solved adds a move
