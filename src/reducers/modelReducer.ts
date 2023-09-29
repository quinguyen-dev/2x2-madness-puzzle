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
  let { type, direction, key } = action;

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
      let matching = true;
      for (let sq of selected) {
        matching = matching && sq.color === selected[0].color;
      }

      /* Update array is quadrant is solved */
      if (matching) {
        for (let sq of selected) {
          sq = sq as Square;
          squares[size * sq.row + sq.column].color = "undefined";
        }

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

    case ControllerActionType.RESET_GAME: {
      const { configs, currentConfig } = state;
      const board = new Board(configs[currentConfig]);
      return { ...state, board: board };
    }

    default:
      return state;
  }
}

// /* Create map of values */
// const offset = size * point.y + point.x;
// let map = [4];
// map[0] = offset;
// map[1] = offset + 1;
// map[2] = offset + size;
// map[3] = offset + size + 1;

// let mapTemp = map[a];
// map[a] = map[b];
// map[b] = mapTemp;

// /* Rotate color values in array */
// let [l, r] = [0, 3];
// while (l < r) {
//   let temp = selected[l];

//   /* [null -> null, Square -> null] */
//   if (temp === null) {
//     /* [Square -> null] */
//     squares[map[l]] = squares[map[r]];

//     if (squares[map[l]] !== null) {
//       let [x, y] = [
//         map[l] % (clone.size - 1),
//         Math.floor(map[l] / (clone.size - 1)),
//       ];
//       squares[map[l]]!.row = x;
//       squares[map[l]]!.column = y;
//     }

//     selected[l] = selected[r];
//     selected[r] = temp;
//   } else if (selected[r] === null) {
//     /* [null -> Square ] */
//     selected[l] = selected[r];
//     squares[map[l]] = null;
//     selected[r] = temp;
//   } else {
//     /* [Square -> Square ] */
//     let color = temp.color;
//     selected[l]!.color = selected[r]!.color;
//     selected[r]!.color = color;
//   }
//   l++;
// }
