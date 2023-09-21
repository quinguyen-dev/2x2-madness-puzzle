export type Configuration = {
  name: string;
  numRows: string;
  numColumns: string;
  baseSquares: SquareInfo[];
};

export type SquareInfo = {
  color: string;
  row: string;
  column: string;
};

// todo clean up the typings here
