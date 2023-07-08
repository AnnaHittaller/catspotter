import {
	useState,
	useMemo,
	useCallback,
	useRef,
	useContext,
	useEffect,
} from "react";
import { StyledMapContainer } from "../styles/styled/Styled_MapContainer";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { Icon, divIcon, point } from "leaflet";
import "leaflet/dist/leaflet.css";
import { LuGlobe } from "react-icons/lu";
import { StyledPrimaryButton } from "../styles/styled/Styled_Button";
import { LocationContext } from "../context/LocationContext";
import useGeolocation from "../customHooks/useGeolocation";
import toast from "./Toast";
import MarkerClusterGroup from "react-leaflet-cluster";
import { markerIconLost, markerIconSeen } from "../components/MapMarkers";

export default function MapForOneCat({ height, type }) {
	console.log("rerender from map for one component");
	const mapRef = useRef();
	//const [showtoast, setShowtoast] = useState(false);
	//const center = useMemo(() => ({ lat: 51.64535, lng: -0.15448 }), []);

	const { location, setLocation } = useContext(LocationContext);
	//useGeolocation();
	const [center, setCenter] = useState({
		lat: 50.93537370438491,
		lng: 6.904795084331814,
	});

	//console.log("location:", location);

	const ZOOM_LEVEL_DEFAULT = 16;
	//let ZOOM_LEVEL = 13;

	//if (location?.accuracy > 5000) {
	//  ZOOM_LEVEL = 10;
	//} else if (location?.accuracy > 10000) {
	//  ZOOM_LEVEL = 5;
	//} else if (location?.accuracy > 20000) {
	//   ZOOM_LEVEL = 2;
	// } else if (location?.accuracy > 30000) {
	//   ZOOM_LEVEL = 0;
	// }

	//const center = { lat: 51.64535, lng: -0.15448 };

	//console.log(location);

	//const showMyLocation = () => {
	//   console.log("Button clicked");
	//  console.log("Loaded:", location.loaded);
	//   console.log("Error:", location.error);
	//  console.log(location);
	//   const radius = location.accuracy;
	//  const circle = L.circle([location.lat, location.lng], radius);
	//   if (location.loaded && !location.error) {
	//     if (location.accuracy > 1000) {
	//       setShowtoast(true);
	//    }
	//    circle.addTo(mapRef.current);
	//     mapRef.current.flyTo([location.lat, location.lng], ZOOM_LEVEL, {
	//       animate: true,
	//       duration: 2,
	//     });
	//   } else {
	//     alert(location.error);
	//   }
	// };

	// useEffect(() => {
	//   if (showtoast) {
	//     const timer = setTimeout(() => {
	//       setShowtoast(false);
	//     }, 7000);

	//     return () => {
	//       clearTimeout(timer);
	//     };
	//   }
	// }, [showtoast]);

	const markerRef = useRef(null);
	// const eventHandlers = useMemo(
	//   () => ({
	//     dragend() {
	//       const marker = markerRef.current;
	//       if (marker != null) {
	//         console.log("LatLng", marker.getLatLng());
	//         setLocation({
	//           ...location,
	//          lat: marker.getLatLng().lat,
	//           lng: marker.getLatLng().lng,
	//           accuracy: 10,
	//         });
	//       }
	////     },
	//   }),
	//   []
	// );

	return (
		<>
			<StyledMapContainer height={height}>
				<MapContainer
					//key={`${location.lat}-${location.lng}`}
					center={center}
					zoom={ZOOM_LEVEL_DEFAULT}
					ref={mapRef}>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>

					<Marker icon={markerIconSeen} position={center}></Marker>
				</MapContainer>
			</StyledMapContainer>
		</>
	);
}
