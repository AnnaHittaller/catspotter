import {
	useState,
	useRef,
} from "react";
import { StyledMapContainer } from "../../styles/styled/Styled_MapContainer";
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMap,
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
//import MenuAddress from "./MenuAddress";

export default function MapCatUpload({ height, markerCoords, setMarkerCoords }) {
	//console.log("rerender from mapnew component");
	const mapRef = useRef();
	const [showToast, setShowToast] = useState(false);
	//const [geocoderAdded, setGeocoderAdded] = useState(false);
	//const [markerCoords, setMarkerCoords] = useState(null);
	console.log("markerCoords,", markerCoords);

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
					The geolocation accuracy is too low, please zoom in to your exact
					position.
				</Toast>
			)}
			<StyledMapContainer height={height}>
				<MapContainer
					center={[51.64536, -0.1534]}
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
					/>
				</MapContainer>
			</StyledMapContainer>
		</>
	);
}
