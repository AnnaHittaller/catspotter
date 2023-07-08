import { createContext, useState } from "react";

export const LocationContext = createContext();

export default function LocationProvider({ children }) {
	const [location, setLocation] = useState({
		loaded: false,
		error: "",
		lat: "",
		lng: "",
	});

	return (
		<LocationContext.Provider value={{ location, setLocation }}>
			{children}
		</LocationContext.Provider>
	);
}
