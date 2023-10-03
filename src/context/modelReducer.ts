import { cloneDeep } from "lodash";
import { Board } from "../model/Model";
import type { Square } from "../model/Model";
import type Model from "../model/Model";

export enum ControllerActionType {
  PROCESS_CLICK,
  ROTATE_GROUP,
  RESET_GAME,
}

// todo change this to be better and direction to enum
export type ModelActions = {
  type: ControllerActionType;
  config?: number;
  direction?: number;
  key?: number;
};

export default function modelReducer(state: Model, action: ModelActions) {
  let { type, direction, key, config } = action;

  switch (type) {
    case ControllerActionType.PROCESS_CLICK: {
      const clone = cloneDeep(state.board);
      let { selected, squares, size } = clone;
      selected.length = 0;

      /* Calculate point location */
      key = key as number;
      let [x, y] = [key % (clone.size - 1), Math.floor(key / (clone.size - 1))];

      /* Push squares to selected piece */
      const offset = size * y + x;
      selected.push(
        squares[offset],
        squares[offset + 1],
        squares[offset + size],
        squares[offset + size + 1]
      );

      /* Determine if quadrant is solved */
      let matching = true,
        isAlreadySolved = true;
      for (let sq of selected) {
        matching = matching && sq.color === selected[0].color;
        isAlreadySolved = isAlreadySolved && sq.color === "undefined";
      }

      /* Update array is quadrant is solved */
      if (matching && !isAlreadySolved) {
        for (let sq of selected) {
          sq = sq as Square;
          squares[size * sq.row + sq.column].color = "undefined";
        }
        clone.quadrantsLeft--;
      }

      /* If the quadrant matched or was already solved, unselect point and group */
      if (matching || isAlreadySolved) {
        // x = -2;
        // y = -2;
        selected.length = 0;
      }

      return {
        ...state,
        board: {
          ...clone,
          selected: selected,
          moves: clone.moves + (matching && !isAlreadySolved ? 1 : 0),
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

      const validSelection = selected.length === 4;
      if (validSelection) {
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

      return {
        ...state,
        board: { ...clone, moves: clone.moves + (validSelection ? 1 : 0) },
      };
    }

    case ControllerActionType.RESET_GAME: {
      const { configs } = state;

      config = config as number;
      localStorage.setItem("config", config.toString());

      const board = new Board(configs[config]);
      return { ...state, board: board };
    }

    default:
      return state;
  }
}
