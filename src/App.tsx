import { useEffect, useRef, useState } from "react";
import Model from "./model/Model";
import redrawCanvas from "./utils/redrawCanvas";
import processClick from "./utils/processClick";
import rotateSquare from "./utils/rotateSquare";

export default function App() {
  const [model, _] = useState(new Model());
  const [redraw, forceDraw] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const size = model.board.size;

  useEffect(() => {
    if (canvasRef.current !== null) redrawCanvas(model, canvasRef.current);
  }, [redraw]);

  function nodeClicked(key: number) {
    processClick(model, key);
    forceDraw(!redraw);
  }

  function rotate(direction: number) {
    rotateSquare(model, direction);
    forceDraw(!redraw);
  }

  return (
    <main className="h-screen flex justify-center items-center flex-col bg-black">
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
      <div className="space-x-4 pt-4">
        <button className="bg-white p-2 rounded-md" onClick={() => rotate(0)}>
          Rotate left
        </button>
        <button className="bg-white p-2 rounded-md" onClick={() => rotate(1)}>
          Rotate right
        </button>
      </div>
    </main>
  );
}
