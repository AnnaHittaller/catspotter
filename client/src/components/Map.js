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
import {
	markerIconOwn,
	markerIconSeen,
	markerIconLost,
	createCustomClusterIcon,
} from "../components/MapMarkers";
import MenuMidi from "./MenuMidi";
import LeafletControlGeocoder from "./LeafletControlGeocoder";

export default function Map({ height, type }) {
	console.log("rerender from map component");
	const mapRef = useRef();
	const [showtoast, setShowtoast] = useState("");

	const { location, setLocation } = useContext(LocationContext);
	useGeolocation();
	const [center, setCenter] = useState({ lat: 51.64536, lng: -0.1534 });

	console.log("location:", location);

	const ZOOM_LEVEL_DEFAULT = 16;
	let ZOOM_LEVEL = 13;

	if (location?.accuracy > 5000) {
		ZOOM_LEVEL = 10;
	} else if (location?.accuracy > 10000) {
		ZOOM_LEVEL = 5;
	} else if (location?.accuracy > 20000) {
		ZOOM_LEVEL = 2;
	} else if (location?.accuracy > 30000) {
		ZOOM_LEVEL = 0;
	}

	//console.log(location);

	const showMyLocation = () => {
		// console.log("Button clicked");
		//console.log("Loaded:", location.loaded);
		//console.log("Error:", location.error);
		//console.log(location);
		const radius = location.accuracy;
		const circle = L.circle([location.lat, location.lng], radius);
		if (location.loaded && !location.error) {
			if (location.accuracy > 1000) {
				setShowtoast(true);
			}
			circle.addTo(mapRef.current);
			mapRef.current.flyTo([location.lat, location.lng], ZOOM_LEVEL, {
				animate: true,
				duration: 2,
			});
		} else {
			alert(location.error);
		}
	};

	useEffect(() => {
		if (showtoast) {
			const timer = setTimeout(() => {
				setShowtoast(false);
			}, 7000);

			return () => {
				clearTimeout(timer);
			};
		}
	}, [showtoast]);

	const markerRef = useRef(null);
	const eventHandlers = useMemo(
		() => ({
			dragend() {
				const marker = markerRef.current;
				if (marker != null) {
					console.log("LatLng", marker.getLatLng());
					setLocation({
						...location,
						lat: marker.getLatLng().lat,
						lng: marker.getLatLng().lng,
						accuracy: 10,
					});
				}
			},
		}),
		[]
	);

	// const customDefaultIcon = L.icon({
	// 	iconUrl: require("../assets/markers/marker_own.png").default,
	// 	iconSize: [35, 50],
	// 	iconAnchor: [17, 46],
	// 	popupAnchor: [0, -40],
	// });

	// L.Marker.prototype.options.icon = customDefaultIcon;

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
					<MarkerClusterGroup
						chunkedLoading
						iconCreateFunction={createCustomClusterIcon}>
						<Marker icon={markerIconOwn} position={center}>
							<Popup>
								<MenuMidi />
							</Popup>
						</Marker>
						<Marker
							icon={markerIconOwn}
							position={[51.84636, -0.1534]}></Marker>
						<Marker
							icon={markerIconOwn}
							position={[51.64636, -0.17534]}></Marker>
						<Marker
							icon={markerIconOwn}
							position={[51.64536, -0.17534]}></Marker>
					</MarkerClusterGroup>
					{location && !location.error && (
						<Marker
							icon={markerIconOwn}
							position={[location.lat, location.lng]}
							eventHandlers={eventHandlers}
							ref={markerRef}
							draggable={true}>
							<Popup>
								<MenuMidi />
							</Popup>
						</Marker>
					)}
					<LeafletControlGeocoder mapRef={mapRef} />
				</MapContainer>
			</StyledMapContainer>
			{showtoast && (
				<toast type="error">
					The geolocation accuracy is too low, please drag the marker to your
					exact position.
				</toast>
			)}
			<StyledPrimaryButton onClick={showMyLocation}>
				Locate me
				<LuGlobe />
			</StyledPrimaryButton>
		</>
	);
}
