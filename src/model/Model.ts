import { config_4x4, config_5x5, config_6x6 } from "../data/configs";
import type { Configuration } from "../data/types";

export class Square {
  row: number;
  column: number;
  color: string;

  constructor(r: number, c: number, color: string) {
    this.row = r;
    this.column = c;
    this.color = color;
  }
}

export class Board {
  squares: Square[];
  selected: Square[];
  size: number;
  point: Point;
  quadrantsLeft: number;
  moves: number;

  constructor(config: Configuration) {
    const size = parseInt(config.numRows);
    const totalSquares = Math.pow(size, 2);

    this.size = size;
    this.selected = [];
    this.point = new Point(-2, -2);
    this.quadrantsLeft = Math.floor(totalSquares / 4);
    this.moves = 0;
    this.squares = new Array(totalSquares).fill(undefined).map((_, i) => {
      let [x, y] = [i % size, Math.floor(i / size)];
      return new Square(x, y, "undefined");
    });

    for (let csq of config.baseSquares) {
      let [row, col] = [parseInt(csq.row), parseInt(csq.column)];
      let square = new Square(row, col, csq.color);

      this.squares[this.size * row + col] = square;
    }
  }
}

export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export default class Model {
  configs: Configuration[];
  currentConfig: number;
  board: Board;

  constructor() {
    this.configs = [config_4x4, config_5x5, config_6x6];
    this.currentConfig = 0;
    this.board = new Board(this.configs[this.currentConfig]);
  }
}
