import { combineReducers } from "redux";

import user from "./user";
import order from "./order";
import historic_data from "./historic_data";
import graphsList from "./graphsList";
import showList from "./orderListReducer";


const appReducer = combineReducers({
  user,
  order,
  historic_data,
  graphsList,
  showList,
});

export default appReducer;
