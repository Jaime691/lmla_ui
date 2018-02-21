import { FETCH_ORDER } from "../types";

export default function order(state = {}, action = {}) {
	switch (action.type) {
		case FETCH_ORDER:
			return action.order;
		default:
			return state;
	}
}

