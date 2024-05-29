import { Activity } from "../types";

export type ActivityActions =
  // payload son los datos que se agregarán al state
  // podemos agregar mas actions con |
  | { type: "save-activity"; payload: { newActivity: Activity } }
  | { type: "set-active-id"; payload: { id: Activity["id"] } }
  | { type: "remove-activity"; payload: { id: Activity["id"] } };

export type ActivityState = {
  activities: Activity[];
  activeId: Activity["id"]; // en lugar de poner tipo de dato string, lo ponemos así por si luego cambiamos el id a int, etc. se actualice solo
};

const localStorageActivities = (): Activity[] => {
  const activities = localStorage.getItem("activities");
  return activities ? JSON.parse(activities) : [];
};

export const initialState: ActivityState = {
  // El hook inicia como arreglo vacío
  activities: localStorageActivities(),
  activeId: "",
};

// Se encarga de conectar las acciones y el state
export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
) => {
  if (action.type === "save-activity") {
    let updatedActivities: Activity[] = [];
    // si hay un activeId, es que estamos editando
    if (state.activeId) {
      updatedActivities = state.activities.map((activity) =>
        activity.id === state.activeId ? action.payload.newActivity : activity
      );
    } else {
      updatedActivities = [...state.activities, action.payload.newActivity];
    }

    // Aqui se maneja la logica para actualizar el state
    // usamos spread ... por si tuvieramos mas cosas en initialState ademas del arreglo []
    return {
      ...state,
      activities: updatedActivities,
      activeId: "",
    };
  }

  if (action.type === "set-active-id") {
    return {
      ...state,
      activeId: action.payload.id,
    };
  }

  if (action.type === "remove-activity") {
    return {
      ...state,
      activities: state.activities.filter(
        (activity) => activity.id !== action.payload.id
      ),
    };
  }

  return state;
};
