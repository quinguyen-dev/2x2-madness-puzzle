import type { Square } from "../model/Model";

type ConfigSquare = Omit<Square, "row" | "column"> & {
  row: string;
  column: string;
};

export type Configuration = {
  name: string;
  numRows: string;
  numColumns: string;
  baseSquares: ConfigSquare[];
};
