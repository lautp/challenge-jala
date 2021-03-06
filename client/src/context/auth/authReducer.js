import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
} from '../types';

//CLEAR_ERRORS,

export default (state, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS:
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				error: 'Exito',
			};
		case LOGIN_FAIL:
		case AUTH_ERROR:
		case REGISTER_FAIL:
		case LOGOUT:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				user: null,
				error: action.payload,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				user: action.payload,
			};
		default:
			return state;
	}
};
