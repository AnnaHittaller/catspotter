import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
//import AuthContext from "./context/AuthContext";
import SidebarProvider from "./context/SidebarContext";
import LocationProvider from "./context/LocationContext";
import ContextProvider from "./context/AppContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<ContextProvider>
		<BrowserRouter>
			{/* <AuthContext> */}
				<LocationProvider>
					<SidebarProvider>
						<App />
					</SidebarProvider>
				</LocationProvider>
			{/* </AuthContext> */}
		</BrowserRouter>
	</ContextProvider>
);
