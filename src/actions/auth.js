import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../types";
import api from "../api";
import axios from 'axios';

export const userLoggedIn = user => ({
	type: USER_LOGGED_IN,
	user
});

export const userLoggedOut = () => ({
	type: USER_LOGGED_OUT
});

export const setToken = token => {
	localStorage.user_token = token;
};

export const deleteToken = () => {
	localStorage.removeItem("user_token");
};

export const getToken = () => {
	return localStorage.user_token;
};

export const logout = () => dispatch => {
	deleteToken();
	axios.defaults.headers.common['Authorization'] = '';
	dispatch(userLoggedOut());
};

export const login = credentials => dispatch =>
	api.user.login(credentials).then(user => {
		setToken(user.token);
		axios.defaults.headers.common['Authorization'] = user.token;
		dispatch(userLoggedIn(user));
		return user;
	});

export const signup = user => dispatch =>
	api.user.signup(user).then(user => {
		setToken(user.token);
		axios.defaults.headers.common['Authorization'] = user.token;
		dispatch(userLoggedIn(user));
	});

export const validateUser = user => api.user.validateUser(user);

export const resetPasswordRequest = ({username}) => api.user.resetPasswordRequest(username);

export const resetPassword = data => api.user.resetPassword(data);

export const validateToken = token => api.user.validateToken(token);
