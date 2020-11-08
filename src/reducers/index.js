import { combineReducers } from "redux";

import { Student } from "./Student";

//This is the root reducer where multiple rudcers are combined
export const reducers = combineReducers({
  Student,
});
