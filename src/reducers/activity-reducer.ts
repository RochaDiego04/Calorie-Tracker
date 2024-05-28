import { Activity } from "../types";

export type ActivityActions = {};

type ActivityState = {
  activities: Activity[];
};

export const initialState: ActivityState = {
  // El hook inicia como arreglo vacío
  activities: [],
};

// Se encarga de conectar las acciones y el state
export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
) => {};
