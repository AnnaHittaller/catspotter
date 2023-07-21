import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";


//CAN BE DELETED ******************************************
// export const AuthContext = createContext();

// export default function AuthContextFunction({ children }) {
// 	const navigate = useNavigate();
// 	const [isLoggedIn, setIsLoggedIn] = useState(false);
// 	const login = (email, password) => {
// 		if (email === "user4@example.com" && password === "1234") {
// 			setIsLoggedIn(true);
// 			navigate("/");
// 		}
// 	};
// 	const logout = () => {
// 		setIsLoggedIn(false);
// 	};

// 	return (
// 		<AuthContext.Provider value={{ isLoggedIn, login, logout }}>
// 			{children}
// 		</AuthContext.Provider>
// 	);
// }
