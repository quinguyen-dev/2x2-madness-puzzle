import { useEffect, useReducer, useRef, useState } from "react";
import Model from "../../model/Model";
import redrawCanvas from "./mvc/boundary/Boundary";
import processClick from "./mvc/controller/ProcessClick";

export default function Canvas({ model }: { model: Model }) {
  const size = model.board.size * 60;

  const [redraw, forceDraw] = useState(true);

  const appRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current !== null)
      redrawCanvas(model, canvasRef.current, appRef.current);
  }, [model, redraw]);

  // todo handle click needs to be for the circles only
  const handleClick = (e: any) => {
    if (canvasRef !== null && canvasRef.current !== null) {
      const canvasRect = canvasRef.current.getBoundingClientRect();

      let x = e.clientX - canvasRect.left;
      let y = e.clientY - canvasRect.top;

      processClick(model, canvasRef.current, x, y);
      forceDraw(!redraw);
    }
  };

  return (
    <canvas
      className="border-blue-700 border-2 bg-white"
      tabIndex={1}
      ref={canvasRef}
      width={size}
      height={size}
      onClick={handleClick}
    />
  );
}
