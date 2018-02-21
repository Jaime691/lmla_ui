import { FETCH_HISTORIC, ADD_TO_LIST } from "../types";

import api from "../api";

export const addToList = graph => {
  return {
    type: ADD_TO_LIST,
    graph
  };
};
export const fetchHistoricData = historic_data => ({
  type: FETCH_HISTORIC,
  historic_data
});

export const historic = (field,test) => dispatch =>
  api.order.historic(field,test).then(historic_data => {
    dispatch(fetchHistoricData(historic_data));
    dispatch(addToList(historic_data));
  });
