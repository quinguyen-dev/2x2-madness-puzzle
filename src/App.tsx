import { useEffect, useReducer, useRef } from "react";
import Model from "./model/Model";
import redrawCanvas from "./utils/redrawCanvas";
import modelReducer from "./reducers/modelReducer";
import { ControllerActionType } from "./reducers/modelReducer";

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, dispatch] = useReducer(modelReducer, new Model());

  const size = state.board.size;

  useEffect(() => {
    if (canvasRef.current !== null) redrawCanvas(state, canvasRef.current);
  }, [state]);

  const nodeClicked = (key: number) =>
    dispatch({ type: ControllerActionType.PROCESS_CLICK, key: key });

  const rotateGroup = (direction: number) => {
    if (state.board.point.x !== -2)
      dispatch({
        type: ControllerActionType.ROTATE_GROUP,
        direction: direction,
      });
  };

  return (
    <main className="h-screen flex justify-center items-center flex-col bg-black">
      <div className="flex justify-center items-center">
        <div
          className="z-10 absolute aspect-square"
          style={{ width: size * 60 - 96 }}
        >
          {[...Array(Math.pow(size - 1, 2)).keys()].map((key) => {
            return (
              <button
                key={key}
                className="bg-white rounded-xl w-6 aspect-square border-2 border-black hover:bg-red-300 focus:bg-red-500 absolute"
                style={{
                  left: (key % (size - 1)) * 60,
                  top: Math.floor(key / (size - 1)) * 60,
                }}
                onClick={() => nodeClicked(key)}
              />
            );
          })}
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
        <button
          className="bg-white p-2 rounded-md"
          onClick={() => rotateGroup(0)}
        >
          Rotate left
        </button>
        <button
          className="bg-white p-2 rounded-md"
          onClick={() => rotateGroup(1)}
        >
          Rotate right
        </button>
        <div className="text-white font-black">{state.board.moves}</div>
      </div>
    </main>
  );
}
