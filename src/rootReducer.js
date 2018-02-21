import appReducer from './reducers/appReducer';
import {USER_LOGGED_OUT} from './types';

const rootReducer = (state, action) => {
    if (action.type === USER_LOGGED_OUT) {
        state = {}
      }
    return appReducer(state, action)
  }

export default rootReducer;