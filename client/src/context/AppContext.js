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
					//posts: [], // what should come here
				};
			default:
				return state;
		}
	};
	
	const [state, dispatch] = useReducer(reducer, {
		user: {},
		//posts: [],
	});

	 const [storedState, setStoredState] = useLocalStorage("state", null);

	 
  useEffect(() => {
		if (storedState) {
			dispatch({ type: "LOGIN", payload: storedState.user });
			// Dispatch other actions to update state based on storedState
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
