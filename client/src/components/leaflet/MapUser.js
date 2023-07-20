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
	console.log(state.user.areaRadius);

	const ZOOM_LEVEL_DEFAULT = 16;

	const markerRef = useRef(null);
	const areaRadius = state.user.areaRadius * 1000; // Convert km to meters

	// useEffect(() => {
		// this has to go into ultimate map, first checking if the location.pathname begins with profile (and maybe use this same function to fit the map on the userUpdatePage)
	// 	// When the component mounts and the areaRadius is greater than 0,
	// 	// calculate the bounds of the circle and fit the map to those bounds.
	// 	if (mapRef.current && areaRadius > 0) {
	// 		const circleBounds = L.circle(center, {
	// 			radius: areaRadius,
	// 		}).getBounds();
	// 		mapRef.current.fitBounds(circleBounds);
	// 	}
	// }, [areaRadius, center]);

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
					{areaRadius > 0 && (
						<Circle
							center={center}
							fillColor="blue"
							radius={areaRadius}
						/>
					)}
				</MapContainer>
			</StyledMapContainer>
		</>
	);
}
