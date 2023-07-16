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
import L, { Icon, divIcon, point } from "leaflet";
import "leaflet/dist/leaflet.css";

import { markerIconOwn } from "../../components/MapMarkers";
import { AppContext } from "../../context/AppContext";

export default function MapUser({ height }) {
	const { state } = useContext(AppContext);
	const mapRef = useRef();
	const { pathname } = useLocation();

	const center = [
		state.user.location.coordinates[1],
		state.user.location.coordinates[0],
	];
	console.log(state.user.location.coordinates);
	console.log(state.user.areaRadius)

	const ZOOM_LEVEL_DEFAULT = 16;

	const markerRef = useRef(null);


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
							draggable={false}></Marker>
					)}
					{state.user.areaRadius > 0 && (
						<Circle
							center={center}
							fillColor="blue"
							radius={state.user.areaRadius * 1000}
						/>
					)}
				</MapContainer>
			</StyledMapContainer>
		</>
	);
}
