import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import decode from "jwt-decode";
import axios from 'axios';
import { BrowserRouter, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import rootReducer from "./rootReducer";
import { getToken, userLoggedIn } from "./actions/auth";
// 

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

if (getToken()) {
	const user = decode(getToken());
	user.token = getToken();
	axios.defaults.headers.common['Authorization'] = user.token;
	store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<Route component={App}/>
		</Provider>
	</BrowserRouter>,
	document.getElementById("root")
);
registerServiceWorker();
