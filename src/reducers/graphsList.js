import {
  ADD_TO_LIST,
  REMOVE_FROM_LIST,
  RESET_LIST,
  REMOVE_ALL
} from "../types";

export default function graphsList(state = [], action={}) {
  switch (action.type) {
    case ADD_TO_LIST:
      return state.concat(action.graph);
    case RESET_LIST:
      return action.graph;
    case REMOVE_ALL:
      return action.graph;
    case REMOVE_FROM_LIST:
      return action.newList
    default:
      return state;
  }
}
