import { useEffect, useRef, useState } from "react";
import Model from "../../model/Model";
import redrawCanvas from "./mvc/boundary/Boundary";
import processClick from "./mvc/controller/ProcessClick";

export default function Canvas({ model }: { model: Model }) {
  const size = model.board.size;

  const [redraw, forceDraw] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current !== null) redrawCanvas(model, canvasRef.current);
  }, [model, redraw]);

  function nodeClicked(key: number) {
    processClick(model, key);
    forceDraw(!redraw);
  }

  return (
    <div className="flex justify-center items-center">
      <div
        className={`z-10 absolute flex flex-wrap`}
        style={{ height: size * 60 - 96, width: size * 60 - 96 }}
      >
        {[...Array(Math.pow(size - 1, 2)).keys()].map((key) => (
          <button
            key={key}
            className="bg-white rounded-xl h-6 w-6 border-2 border-black hover:bg-red-300 absolute"
            style={{
              left: (key % (size - 1)) * 60,
              top: Math.floor(key / (size - 1)) * 60,
            }}
            onClick={() => nodeClicked(key)}
          />
        ))}
      </div>
      <canvas
        className="border-blue-700 border-2 bg-white"
        tabIndex={1}
        ref={canvasRef}
        width={size * 60}
        height={size * 60}
      />
    </div>
  );
}
