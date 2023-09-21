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
  size: number;

  constructor(config: Configuration) {
    this.squares = [];
    this.size = parseInt(config.numColumns);

    for (let csq of config.baseSquares) {
      let sq = new Square(parseInt(csq.row), parseInt(csq.column), csq.color);
      this.squares.push(sq);
    }
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
