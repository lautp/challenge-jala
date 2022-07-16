import React, { useReducer } from 'react';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	CLEAR_ERRORS,
	LOGOUT,
} from '../types';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
	registerUser,
	loginUser,
	continueRegister,
} from '../../service/userService';

const AuthState = props => {
	const initialState = {
		token: '',
		user: null,
		isAuthenticated: null,
		error: null,
	};

	const [state, dispatch] = useReducer(authReducer, initialState);

	//Load User
	const loadUser = async () => {
		setAuthToken(localStorage.token);

		try {
			//aca podria ir una logica para traer al objeto user que se loguee

			dispatch({ type: USER_LOADED, payload: res.data });
		} catch (err) {
			dispatch({ type: AUTH_ERROR });
		}
	};

	const continueReg = async data => {
		continueRegister(data);
	};

	//Register User
	const register = async formData => {
		try {
			const res = await registerUser(formData);

			dispatch({ type: REGISTER_SUCCESS, payload: res.data });
			setTimeout(() => {
				loadUser();
			}, 100);
		} catch (err) {
			if (err.response.data.msg !== undefined) {
				dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
			} else {
				const msg = err.response.data.error.errors.map(err => {
					return err.msg;
				});
				const comma = /,/gi;
				const message = msg.toString().replace(comma, ', ');

				dispatch({ type: REGISTER_FAIL, payload: message });
			}
		}
	};

	//Login
	const login = async formData => {
		try {
			const res = await loginUser(formData);

			dispatch({ type: LOGIN_SUCCESS, payload: res.data });

			setTimeout(() => {
				loadUser();
			}, 100);
		} catch (err) {
			if (err.response.data.msg !== undefined) {
				dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg });
			} else {
				const msg = err.response.data.error.errors.map(err => {
					return err.msg;
				});
				const comma = /,/gi;
				const message = msg.toString().replace(comma, ', ');

				dispatch({ type: LOGIN_FAIL, payload: message });
			}
		}
	};

	//Logout
	const logout = () => {
		dispatch({ type: LOGOUT });
	};

	//Clear Errors
	const clearErrors = () => {
		dispatch({ type: CLEAR_ERRORS });
	};

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				user: state.user,
				isAuthenticated: state.isAuthenticated,
				error: state.error,
				register,
				continueReg,
				loadUser,
				login,
				logout,
				clearErrors,
			}}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
