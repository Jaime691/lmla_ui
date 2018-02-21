import { FETCH_HISTORIC } from "../types";

export default function historic_data(state = {}, action = {}) {
	switch (action.type) {
		case FETCH_HISTORIC:
			return action.historic_data;
		default:
			return state;
	}
}

