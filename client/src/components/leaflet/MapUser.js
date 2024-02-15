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
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import L, { Icon, divIcon, point } from "leaflet";
import "leaflet/dist/leaflet.css";


import  markerIconOwn  from "../leaflet/MapMarkerOwn";
import { AppContext } from "../../context/AppContext";

export default function MapUser({ height }) {
	const { state } = useContext(AppContext);
	const mapRef = useRef();

	const { pathname } = useLocation();

	const center = [
		state.user.location.coordinates[1],
		state.user.location.coordinates[0],
	];
	//console.log(state.user.location.coordinates);
	//console.log(state.user.areaRadius);

	const ZOOM_LEVEL_DEFAULT = 16;

	const markerRef = useRef(null);
	const areaRadius = state.user.areaRadius * 1000; // Convert km to meters

	const [isMapReady, setIsMapReady] = useState(false);

	// useEffect(() => {
	// 	const calculateZoomLevel = (map, circleBounds) => {
	// 		const mapWidth = map.getSize().x;
	// 		const circleWidth =
	// 			map.latLngToLayerPoint(circleBounds.getNorthEast()).x -
	// 			map.latLngToLayerPoint(circleBounds.getSouthWest()).x;
	// 		const diameterZoomRatio = circleWidth / mapWidth;
	// 		const zoomLevel = Math.log2(360 / (diameterZoomRatio * 256));
	// 		return zoomLevel;
	// 	};
		
	// // }, [isMapReady, areaRadius, center]);

	// if (isMapReady && mapRef.current) {
	// 	const circleBounds = L.circle(center, {
	// 		radius: areaRadius,
	// 	}).getBounds();
	// 	const mapInstance = mapRef.current.leafletElement;
	// 	const zoomLevel = calculateZoomLevel(mapInstance, circleBounds);
	// 	console.log("zoomlevel", zoomLevel);
	// 	mapInstance.setView(center, zoomLevel);
	// }

	return (
		<>
			<StyledMapContainer height={height}>
				<MapContainer
					center={center}
					zoom={ZOOM_LEVEL_DEFAULT}
					//ref={mapRef}
					whenReady={(mapInstance) => {
						mapRef.current = mapInstance;
						setIsMapReady(true);
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
						<Circle center={center} fillColor="blue" radius={areaRadius} />
					)}
					{/* <MapWrapper /> */}
				</MapContainer>
			</StyledMapContainer>
		</>
	);
}
