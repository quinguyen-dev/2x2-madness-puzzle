import { ControllerActionType } from "./modelReducer";

export type ModelActions = {
  type: ControllerActionType;
  config?: number;
  direction?: number;
  key?: number;
};
