import { ACTION_TYPES } from "../actions/Student";

const initialState = {
  //  object to pass as the initial state.
  list: [],
};

export const Student = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_ALL:
      return {
        ...state,
        list: [...action.payload],
      };
    case ACTION_TYPES.CREATE:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case ACTION_TYPES.UPDATE:
      return {
        ...state,
        list: state.list.map(
          (x) => (x.code === action.payload.id ? action.payload : x) //check if the passed id exist int he table
        ),
      };
    case ACTION_TYPES.DELETE:
      return {
        ...state,
        list: state.list.filter((x) => x.code !== action.payload), //Update the table records after deleting a student
      };
    default:
      return state;
  }
};
