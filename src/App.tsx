import { useEffect, useState, useRef } from "react";
import Model from "./model/Model.js";
import redrawCanvas from "./boundary/Boundary";
import processClick from "./controller/Controller";
import resetHandler from "./controller/ResetController";

export default function App() {
  const [model, setModel] = useState(new Model());
  const [redraw, forceRedraw] = useState(0);

  const appRef = useRef<HTMLElement>(null); // to be able to access "top level" app object
  const canvasRef = useRef<HTMLCanvasElement>(null); // need to be able to refer to Canvas

  useEffect(() => {
    if (canvasRef.current !== null)
      redrawCanvas(model, canvasRef.current, appRef.current);
  }, [model, redraw]);

  const handleClick = (e: any) => {
    if (canvasRef !== null && canvasRef.current !== null) {
      const canvasRect = canvasRef.current.getBoundingClientRect();

      // normalizing RAW point into localized canvas coordinates.
      let x = e.clientX - canvasRect.left;
      let y = e.clientY - canvasRect.top;

      processClick(model, canvasRef.current, x, y);
    }
  };

  return (
    <div className="App">
      <canvas
        tabIndex={1}
        ref={canvasRef}
        width="400"
        height="400"
        onClick={handleClick}
      />
      <button
        className="reset_button"
        onClick={(e) => resetHandler(model, canvasRef.current!)}
      >
        Reset
      </button>
    </div>
  );
}
