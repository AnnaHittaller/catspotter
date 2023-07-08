import { createContext, useReducer } from "react";

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

	return (
		<AppContext.Provider value={{ state, dispatch }}>
			{children}
		</AppContext.Provider>
	);
}
