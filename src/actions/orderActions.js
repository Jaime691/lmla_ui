import { FETCH_ORDER, RESET_LIST } from "../types";
import api from "../api";

export const fetchOrder = order => ({
	type: FETCH_ORDER,
	order
});

export const resetList = () => {
  return {
    type: RESET_LIST,
    graph: []
  };
};


export const select = orderNumber => dispatch =>
api.order.search({ params: { orderNumber: orderNumber } }).then((order) => {
	dispatch(fetchOrder(order));
	dispatch(resetList());
});

export const hideOrder = () => dispatch => {
    const dummyOrder = {};
    dispatch(fetchOrder(dummyOrder));
  };

export const fetchAllOrders = () => api.order.fetchAll();
