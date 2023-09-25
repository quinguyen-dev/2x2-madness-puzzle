import { config_4x4, config_5x5, config_6x6 } from "../data/configs";
import type { Configuration } from "../data/config.types";

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
  size: number;
  point: Point;

  constructor(config: Configuration) {
    this.squares = [];
    this.size = parseInt(config.numColumns);
    this.point = new Point(-2, -2);

    for (let csq of config.baseSquares) {
      let sq = new Square(parseInt(csq.row), parseInt(csq.column), csq.color);
      this.squares.push(sq);
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
