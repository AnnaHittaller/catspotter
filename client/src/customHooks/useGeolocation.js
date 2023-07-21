import { useContext, useEffect } from "react";
import { LocationContext } from "../context/LocationContext";

// export default function useGeolocation() {
// 	//const { location, setLocation } = useContext(LocationContext);
// 	//console.log(location);

// 	const onSuccess = (position) => {
// 		//console.log("pos",position)
// 		setLocation({
// 			...location,
// 			lat: position.coords.latitude,
// 			lng: position.coords.longitude,
// 			accuracy: position.coords.accuracy,
// 			loaded: true,
// 			error: "",
// 		});
// 	};

// 	const onError = (error) => {
// 		setLocation({
// 			...location,
// 			lat: null,
// 			lng: null,
// 			accuracy: null,
// 			loaded: true,
// 			error: error.message,
// 		});
// 	};

// 	useEffect(() => {
// 		if (!("geolocation" in navigator)) {
// 			setLocation((prevLocation) => ({
// 				...prevLocation,
// 				loaded: true,
// 				error: "Geolocation is not supported by your browser.",
// 			}));
// 		} else {
// 			navigator.geolocation.getCurrentPosition(onSuccess, onError);
// 		}
// 	}, []);

// }
