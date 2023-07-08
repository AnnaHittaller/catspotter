import { createContext, useState } from "react";

export const SidebarContext = createContext();

export default function SidebarProvider({ children }) {
	const [sidebaropen, setsidebaropen] = useState(false);

	return (
		<SidebarContext.Provider value={{ sidebaropen, setsidebaropen }}>
			{children}
		</SidebarContext.Provider>
	);
}
