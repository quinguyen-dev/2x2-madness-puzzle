import { cloneDeep } from "lodash";
import type Model from "../model/Model";
import type { ModelActions } from "./types";

export enum ControllerActionType {
  PROCESS_CLICK = "PROCESS_CLICK",
  ROTATE_GROUP = "ROTATE_GROUP",
  RESET_GAME = "RESET_GAME",
}

export default function modelReducer(state: Model, action: ModelActions) {
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
          selected: selected,
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
