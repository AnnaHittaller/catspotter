import { createContext, useEffect, useReducer } from "react";
import useLocalStorage from "../customHooks/useLocalStorage";

export const AppContext = createContext();

export default function ContextProvider({ children }) {
	const reducer = (state, action) => {
		switch (action.type) {
			case "LOGIN":
				return {
					...state,
					user: action.payload,
				};
			case "LOGOUT":
				return {
					user: {},
					cats: [],
				};
			case "UPDATE_USER":
				return {
					...state,
					user: action.payload,
				};
			case "LIST_CATS":
				return {
					...state,
					cats: action.payload,
				};
			case "ADD_CAT":
				return {
					...state,
					cats: [...state.cats, action.payload],
				};
			case "DELETE_CAT":
				return {
					...state,
					cats: [...state.cats.filter((cat) => cat._id !== action.payload)],
				};
			case "UPDATE_CAT":
				return {
					...state,
					cats: state.cats.map((cat) =>
						cat._id === action.payload._id ? action.payload : cat
					),
				};
			default:
				return state;
		}
	};
	
	const [state, dispatch] = useReducer(reducer, {
		user: {},
		cats: [],
	});

	const [storedState, setStoredState] = useLocalStorage("state", null);

  useEffect(() => {
		if (storedState) {
			dispatch({ type: "LOGIN", payload: storedState.user });
			dispatch({type: "LIST_CATS", payload: storedState.cats})
		}
	}, []);

	useEffect(() => {
		setStoredState(state);
	}, [state, setStoredState]);

	return (
		<AppContext.Provider value={{ state, dispatch }}>
			{children}
		</AppContext.Provider>
	);
}
