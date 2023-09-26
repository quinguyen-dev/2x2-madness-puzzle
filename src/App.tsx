import { useEffect, useReducer, useRef } from "react";
import { cloneDeep } from "lodash";
import Model from "./model/Model";
import redrawCanvas from "./utils/redrawCanvas";

enum ControllerActionType {
  PROCESS_CLICK = "PROCESS_CLICK",
  ROTATE_GROUP = "ROTATE_GROUP",
  RESET_GAME = "RESET_GAME",
}

// An interface for our actions
// todo unions or index typing
interface ModelActions {
  type: ControllerActionType;
  config?: number;
  direction?: number;
  key?: number;
}

// Our reducer function that uses a switch statement to handle our actions
function reducer(state: Model, action: ModelActions) {
  let { type, direction, key } = action;

  switch (type) {
    case ControllerActionType.PROCESS_CLICK: {
      const clone = cloneDeep(state.board);
      let { selected, squares } = clone;
      selected.length = 0;

      key = key as number;
      let [x, y] = [key % (clone.size - 1), Math.floor(key / (clone.size - 1))];

      /* Determine the group */
      let matching = true;
      for (let sq of squares) {
        if (
          y <= sq.row &&
          sq.row < y + 2 &&
          x <= sq.column &&
          sq.column < x + 2
        ) {
          selected.push(sq);
          matching = matching && sq.color === selected[0].color;

          if (selected.length === 4) break;
        }
      }

      /* Check if valid quadrant */
      if (matching && selected.length !== 0) {
        selected = selected.map((square) => {
          square.color = "white";
          return square;
        });

        clone.quadrantsLeft--;
        selected.length = 0;
        x = -2;
        y = -2;
      }

      return {
        ...state,
        board: {
          ...clone,
          moves: clone.moves + (matching ? 1 : 0),
          point: {
            x: x,
            y: y,
          },
        },
      };
    }

    case ControllerActionType.ROTATE_GROUP: {
      direction = direction as number;

      const clone = cloneDeep(state.board);
      const { selected } = clone;

      if (selected.length === 4) {
        const [a, b] = direction ? [2, 3] : [0, 1];

        /* Swap two indexes for cyclic rotate */
        let squareTemp = selected[a];
        selected[a] = selected[b];
        selected[b] = squareTemp;

        /* Rotate color values in array */
        let [l, r] = [0, 3];
        while (l < r) {
          let temp = selected[l].color;
          selected[l].color = selected[r].color;
          selected[r].color = temp;
          l++;
        }

        /* Reverse index swap */
        squareTemp = selected[a];
        selected[a] = selected[b];
        selected[b] = squareTemp;
      }

      return { ...state, board: { ...clone, moves: clone.moves + 1 } };
    }

    default:
      return state;
  }
}

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, dispatch] = useReducer(reducer, new Model());

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
