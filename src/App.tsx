import { useEffect, useReducer, useRef, useState } from "react";
import Model from "./model/Model";
import redrawCanvas from "./utils/redrawCanvas";
import modelReducer, { ControllerActionType } from "./reducers/modelReducer";
import { Group } from "./components";

// todo move this somewhere else
enum Direction {
  COUNTERCLOCKWISE = 0,
  CLOCKWISE = 1,
}

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, dispatch] = useReducer(modelReducer, new Model());
  const [point, setPoint] = useState(-1);

  const size = state.board.size;

  useEffect(() => {
    /* Redraw underlying canvas */
    if (canvasRef.current !== null) redrawCanvas(state, canvasRef.current);

    /* Check game win state here */
    if (state.board.quadrantsLeft === 0) console.log("You win!!");
  }, [state]);

  const nodeClicked = (key: number) =>
    dispatch({ type: ControllerActionType.PROCESS_CLICK, key: key });

  const rotateGroup = (direction: Direction) => {
    if (state.board.point.x >= 0)
      dispatch({
        type: ControllerActionType.ROTATE_GROUP,
        direction: direction,
      });
  };

  const resetGame = () => dispatch({ type: ControllerActionType.RESET_GAME });

  return (
    <main className="h-screen flex justify-center items-center flex-col bg-black space-y-6">
      <div className="flex justify-center items-center relative">
        <div
          className="absolute aspect-square grid justify-items-center items-center w-full p-[30px]"
          style={{
            gridTemplate: `repeat(${size - 1}, 1fr) / repeat(${size - 1}, 1fr)`,
          }}
        >
          {[...Array(Math.pow(size - 1, 2)).keys()].map((key) => {
            return (
              <button
                key={key}
                style={{
                  backgroundColor:
                    point === key && state.board.selected.length !== 0
                      ? "red"
                      : "",
                }}
                className="bg-white rounded-xl z-20 w-6 aspect-square border-2 border-black hover:bg-red-300 "
                onClick={() => {
                  setPoint(key);
                  nodeClicked(key);
                }}
              />
            );
          })}
          <div className="absolute w-full h-full">
            <Group
              group={state.board.selected}
              style={{
                left: state.board.point.x * 60,
                top: state.board.point.y * 60,
              }}
            />
          </div>
        </div>
        <canvas ref={canvasRef} width={size * 60} height={size * 60} />
      </div>
      <div className="space-x-4">
        <button
          className="bg-white p-2 rounded-md"
          onClick={() => rotateGroup(Direction.COUNTERCLOCKWISE)}
        >
          Rotate left
        </button>
        <button
          className="bg-red-700 p-2 rounded-md text-white"
          onClick={resetGame}
        >
          Reset
        </button>
        <button
          className="bg-white p-2 rounded-md"
          onClick={() => rotateGroup(Direction.CLOCKWISE)}
        >
          Rotate right
        </button>
      </div>
      <div className="text-white font-bold">Moves: {state.board.moves}</div>
    </main>
  );
}
