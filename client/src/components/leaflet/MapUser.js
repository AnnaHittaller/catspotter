import {
	useState,
	useMemo,
	useCallback,
	useRef,
	useContext,
	useEffect,
} from "react";
import { useLocation } from "react-router-dom";
import { StyledMapContainer } from "../../styles/styled/Styled_MapContainer";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
//import marker_own from "../assets/marker_own.png";
import L, { Icon, divIcon, point } from "leaflet";
import "leaflet/dist/leaflet.css";

import { markerIconOwn } from "../../components/MapMarkers";
import { AppContext } from "../../context/AppContext";
//import AreaRangeSlider from "./AreaRangeSlider";

export default function MapUser({ height }) {
	const { state } = useContext(AppContext);
	const mapRef = useRef();
	//const circleRef = useRef();
	//const [showToast, setShowToast] = useState(false);
	const { pathname } = useLocation();

	//const [circleRadius, setCircleRadius] = useState(100);
	const center = [
		state.user.location.coordinates[1],
		state.user.location.coordinates[0],
	];
	console.log(state.user.location.coordinates);

	// const [center, setCenter] = useState({ lat: 51.64536, lng: -0.1534 });
	// const [area, setArea] = useState({
	// 	lat: 51.64536,
	// 	lng: -0.1534,
	// 	radius: 0,
	// });

	const ZOOM_LEVEL_DEFAULT = 16;

	//const [mapReady, setMapReady] = useState(false);
	//const [circleLayer, setCircleLayer] = useState(null);
	//const circleLayerRef = useRef(null);

	const markerRef = useRef(null);

	// const eventHandlers = useMemo(
	// 	() => ({
	// 		dragend() {
	// 			const marker = markerRef.current;
	// 			if (marker != null) {
	// 				setArea({
	// 					...area,
	// 					lat: marker.getLatLng().lat,
	// 					lng: marker.getLatLng().lng,
	// 				});
	// 			}
	// 		},
	// 	}),
	// 	[]
	// );

	return (
		<>
			<StyledMapContainer height={height}>
				<MapContainer
					center={center}
					zoom={ZOOM_LEVEL_DEFAULT}
					//ref={mapRef}
					whenReady={(mapInstance) => {
						mapRef.current = mapInstance;
					}}>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					{state.user.username && (
						<Marker
							icon={markerIconOwn}
							position={center}
							ref={markerRef}
							//eventHandlers={eventHandlers}
							draggable={false}></Marker>
					)}
					{state.user.areaRadius > 0 && (
						<Circle
							center={center}
							fillColor="blue"
							radius={state.user.areaRadius}
						/>
					)}
				</MapContainer>
			</StyledMapContainer>
		</>
	);
}
