import { Activity } from "../types";

export type ActivityActions =
  // payload son los datos que se agregarán al state
  // podemos agregar mas actions con |
  { type: "save-activity"; payload: { newActivity: Activity } };

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
) => {
  if (action.type === "save-activity") {
    // Aqui se maneja la logica para actualizar el state
    // usamos spread ... por si tuvieramos mas cosas en initialState ademas del arreglo []
    return {
      ...state,
      activities: [...state.activities, action.payload.newActivity],
    };
  }

  return state;
};
