import Model from "../../../../model/Model";

export default function processClick(model: Model, key: number) {
  const { size, point } = model.board;

  point.x = key % (size - 1);
  point.y = Math.floor(key / (size - 1));
}
