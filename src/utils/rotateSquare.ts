import Model from "../model/Model";

/* Controller */
export default function rotateSquare(model: Model, direction: number) {
  const { selected } = model.board;

  const [a, b] = direction ? [2, 3] : [0, 1];

  if (selected.length === 4) {
    let squareTemp = selected[a];
    selected[a] = selected[b];
    selected[b] = squareTemp;

    let l = 0,
      r = 3,
      temp;
    while (l < r) {
      temp = selected[l].color;
      selected[l].color = selected[r].color;
      selected[r].color = temp;
      l++;
    }
  }
}
