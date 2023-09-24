import Model from "../../../../model/Model";
import redrawCanvas from "../boundary/Boundary";

export default function processClick(
  model: Model,
  canvas: HTMLCanvasElement,
  x: number,
  y: number
) {
  console.log({ x: x, y: y });
}
