import { useContext, useRef, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useLocation } from "react-router-dom";
import { StyledMapContainer } from "../../styles/styled/Styled_MapContainer";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L, { Icon, divIcon, point } from "leaflet";
import "leaflet/dist/leaflet.css";
import AreaRangeSlider from "./AreaRangeSlider";
import LeafletControlGeocoder from "./LeafletControlGeocoder";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import ReverseGeocodeMarker from "./ReverseGeocodeMarker";
import {
	markerIconOwn,
	markerIconLost,
	markerIconSeen,
	createCustomClusterIcon,
} from "../../components/MapMarkers";
import MenuMidi from "../MenuMidi";
import Toast from "../../components/Toast";
import MarkerClusterGroup from "react-leaflet-cluster";

export default function UltimateMap({
	height,
	center,
	zoom,
	showMarkers,
	ownMarker,
	catMarker,
	areaCircle,
	geocodeMarker,
	markerClusterGroup,
	mapClickHandler,
	visibleCats,
	setVisibleCats,
	showGeocoder,
	showAreaRangeSlider,
	rangeValue,
	setRangeValue,
	cat,
	markerCoords, 
	setMarkerCoords
}) {
	const { state } = useContext(AppContext);
	const markerRef = useRef(null);
	const mapRef = useRef();
	const { pathname } = useLocation();
	const [showToast, setShowToast] = useState("");

	const userCenter = {
		lat: state.user.location.coordinates[1],
		lng: state.user.location.coordinates[0],
	};

	const catCenter = {
		lat: cat.location.coordinates[1],
		lng: cat.location.coordinates[0],
	};

	// function for handling the click event
	const handleMapClick = (e) => {
		const { lat, lng } = e.latlng;
		setMarkerCoords({ lat, lng });
	};
	const MapClickHandler = () => {
		useMapEvents({
			click: handleMapClick,
		});
		return null;
	};

	return (
		<>
			{showToast && (
				<Toast type="error" setShowToast={setShowToast}>
					{showToast}
				</Toast>
			)}
			<StyledMapContainer height={height}>
				<MapContainer
					center={center}
					zoom={zoom}
					minZoom={2}
					maxZoom={18}
					whenReady={(mapInstance) => {
						mapRef.current = mapInstance;
					}}
					onclick={mapClickHandler ? handleMapClick : undefined}>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					{markerClusterGroup && (
						<MarkerClusterGroup
							chunkedLoading
							iconCreateFunction={createCustomClusterIcon}
							disableClusteringAtZoom={13}
							zoomToBoundsOnClick>
							{state.cats?.length > 0 &&
								state.cats &&
								state.cats.map((cat) => (
									<Marker
										key={cat._id}
										icon={
											cat.status === "Lost" ? markerIconLost : markerIconSeen
										}
										position={[
											cat.location.coordinates[1],
											cat.location.coordinates[0],
										]}>
										<Popup>
											<MenuMidi cat={cat} />
										</Popup>
									</Marker>
								))}
						</MarkerClusterGroup>
					)}
					{ownMarker && state.user.username && (
						<Marker
							icon={markerIconOwn}
							position={center}
							ref={markerRef}
							draggable={false}></Marker>
					)}
					{mapClickHandler && <MapClickHandler />}
					{areaCircle && state.user.areaRadius > 0 && (
						<Circle
							center={center}
							fillColor="blue"
							radius={state.user.areaRadius * 1000}
						/>
					)}
					{catMarker && cat && (
						<Marker
							icon={cat.status === "Lost" ? markerIconLost : markerIconSeen}
							position={center}></Marker>
					)}
					{/* {showMarkers &&
						cats?.map((cat) => <CustomMarker key={cat._id} cat={cat} />)} */}
					{showGeocoder && (
						<LeafletControlGeocoder
							visibleCats={visibleCats}
							setVisibleCats={setVisibleCats}
							setShowToast={setShowToast}
						/>
					)}
					{geocodeMarker && markerCoords && (
						<ReverseGeocodeMarker
							position={markerCoords}
							mapRef={mapRef.current}
							icon={markerIconOwn}
						/>
					)}
					{showAreaRangeSlider &&
						rangeValue.length === 2 &&
						rangeValue[1] > 0 && (
							<Circle center={markerCoords} radius={rangeValue[1] * 1000} />
						)}
				</MapContainer>
				{showAreaRangeSlider && (
					<AreaRangeSlider
						rangeValue={rangeValue}
						setRangeValue={setRangeValue}
					/>
				)}
			</StyledMapContainer>
		</>
	);
}
