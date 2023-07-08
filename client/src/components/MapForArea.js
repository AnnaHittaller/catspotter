import {
	useState,
	useMemo,
	useCallback,
	useRef,
	useContext,
	useEffect,
} from "react";
import { useLocation } from "react-router-dom";
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
import AreaRangeSlider from "./leaflet/AreaRangeSlider";

export default function MapForArea({ height, type }) {
	const mapRef = useRef();
	const circleRef = useRef();
	const [showtoast, setShowtoast] = useState(false);
	const { pathname } = useLocation();
	console.log(pathname);

	// const [center, setCenter] = useState({ lat: 51.64536, lng: -0.1534 });
	const [area, setArea] = useState({
		lat: 51.64536,
		lng: -0.1534,
		radius: 0,
	});

	const ZOOM_LEVEL_DEFAULT = 16;


	console.log(
		"rerender from map area component, outside, area and test",
		area,
		test
	);

	const [mapReady, setMapReady] = useState(false);
	const [circleLayer, setCircleLayer] = useState(null);
	const circleLayerRef = useRef(null);

	useEffect(() => {
		const addingAreaCircle = () => {
			if (mapRef.current && area.lat && area.lng) {
				if (circleLayerRef.current) {
					if (area.radius > 0) {
						circleLayerRef.current
							.setLatLng([area.lat, area.lng])
							.setRadius(area.radius);
					} else {
						circleLayerRef.current.remove();
						circleLayerRef.current = null;
					}
				} else if (area.radius > 0) {
					const circle = L.circle([area.lat, area.lng], area.radius);
					circle.addTo(mapRef.current);
					circleLayerRef.current = circle;
				}
			}
		};

		if (mapReady) {
			addingAreaCircle();
		}
	}, [area, mapReady, circleLayerRef]);

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
					setArea({
						...area,
						lat: marker.getLatLng().lat,
						lng: marker.getLatLng().lng,
						//radius: test,
					});
				}
				console.log("ondragend area and test", area, test);
			},
		}),
		[]
	);

	return (
		<>
			<StyledMapContainer height={height}>
				<MapContainer
					//key={`${location.lat}-${location.lng}`}
					center={[area.lat, area.lng]}
					zoom={ZOOM_LEVEL_DEFAULT}
					ref={mapRef}
					//zoomControl={false}
					whenReady={() => {
						setMapReady(true);
					}}>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>

					<Marker
						icon={markerIconOwn}
						position={[area.lat, area.lng]}
						ref={markerRef}
						eventHandlers={eventHandlers}
						draggable={true}></Marker>
				</MapContainer>
			</StyledMapContainer>
			{showtoast && (
				<toast type="error">
					The geolocation accuracy is too low, please drag the marker to your
					exact position.
				</toast>
			)}
			{pathname.startsWith("/updateprofile") && (
				<AreaRangeSlider
					area={area}
					setArea={setArea}
				/>
			)}
		</>
	);
}
