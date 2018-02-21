import { SHOW_ORDER_LIST } from "../types";

const INITIAL_SATE = { showList: true }

export default function showList(state = INITIAL_SATE, action) {
    switch (action.type) {
        case SHOW_ORDER_LIST:
            return { ...state, showList: !action.payload };
        default:
            return state;
    }
}
