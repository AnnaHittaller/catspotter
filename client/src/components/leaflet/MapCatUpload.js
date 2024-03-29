import { useState, useRef, useContext } from "react";
import { StyledMapContainer } from "../../styles/styled/Styled_MapContainer";
import {
	MapContainer,
	TileLayer,
	// Marker,
	// Popup,
	// useMap,
	useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Toast from "../Toast";
import LeafletControlGeocoder from "./LeafletControlGeocoder";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import ReverseGeocodeMarker from "./ReverseGeocodeMarker";
//import icon from "./MapMarkerOwn"; 
import { markerIconOwn } from "./MapMarkers";
import { AppContext } from "../../context/AppContext";
//import MenuAddress from "./MenuAddress";

export default function MapCatUpload({
	height,
	markerCoords,
	setMarkerCoords,
}) {
	//console.log("rerender from mapnew component");
	const { state, dispatch } = useContext(AppContext);
	const mapRef = useRef();
	const [showToast, setShowToast] = useState("");
	const [cats, setCats] = useState([]);
	const [visibleCats, setVisibleCats] = useState([]);
	//const [geocoderAdded, setGeocoderAdded] = useState(false);
	//const [markerCoords, setMarkerCoords] = useState(null);
	//console.log("markerCoords,", markerCoords);

	let center = {
		lat: 51.64536,
		lng: -0.1534,
	};

	if (state.user._id) {
		center = {
			lat: state.user.location.coordinates[1],
			lng: state.user.location.coordinates[0],
		};
	} 


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
					zoom={16}
					minZoom={2}
					whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
					onclick={handleMapClick}>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					<MapClickHandler />
					{markerCoords && (
						<ReverseGeocodeMarker
							position={markerCoords}
							mapRef={mapRef.current}
							icon={markerIconOwn}
						/>
					)}
					<LeafletControlGeocoder
						mapRef={mapRef}
						setShowToast={setShowToast}
						setVisibleCats={setVisibleCats}
						cats={cats}
					/>
				</MapContainer>
			</StyledMapContainer>
		</>
	);
}
