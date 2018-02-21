import { SHOW_ORDER_LIST } from "../types";

export const toogleShowList = (show) => ({
    type: SHOW_ORDER_LIST,
    payload: show
});