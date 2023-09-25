import Model from "../model/Model";

export default function redrawCanvas(model: Model, canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  /* Clear canvas content */
  ctx.clearRect(0, 0, canvas.width, canvas.height); // assume square region

  /* Find selected squares */
  const { point, squares } = model.board;
  let { selected } = model.board;
  selected.length = 0;

  let matching = true;
  for (let square of squares) {
    if (
      point.y <= square.row &&
      square.row < point.y + 2 &&
      point.x <= square.column &&
      square.column < point.x + 2
    ) {
      selected.push(square);

      matching = matching && square.color === selected[0].color;
    }

    if (selected.length === 4) break;
  }

  /* Check if quadrant is valid to remove */
  if (matching && selected.length !== 0) {
    selected = selected.map((square) => {
      square.color = "white";
      return square;
    });
    model.board.quadrantsLeft--;
    selected.length = 0;
  }

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
  for (let square of selected) {
    ctx.strokeStyle = "red";
    ctx.rect(square.column * 60, square.row * 60, 60, 60);
    ctx.stroke();
  }
}
