import Model from "../../../../model/Model";

export default function redrawCanvas(
  model: Model,
  canvas: HTMLCanvasElement,
  appObj: any
) {
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

  /* Draw circles */
  for (let i = 1, n = model.board.size; i < n; i++) {
    for (let j = 1; j < n; j++) {
      /* Draw circles */
      ctx.beginPath();
      ctx.arc(60 * i, 60 * j, 10, 0, 2 * Math.PI, false);
      ctx.fillStyle = "white";
      ctx.fill();

      /* Draw circle border */
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }
}
