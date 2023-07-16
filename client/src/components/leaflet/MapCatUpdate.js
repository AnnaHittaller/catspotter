import {
	useState,
	useMemo,
	useCallback,
	useRef,
	useContext,
	useEffect,
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

import ReverseGeocodeMarker from "./ReverseGeocodeMarker";
//import icon from "./MapMarkerOwn";
import { markerIconOwn } from "./MapMarkers";
import MenuAddress from "../MenuAddress";

export default function MapCatUpdate({ height, markerCoords, setMarkerCoords }) {
	console.log("rerender from mapuploadedit component");
	const mapRef = useRef();
	
	console.log("markerCoords,", markerCoords);
	//const [visibleCats, setVisibleCats] = useState("")

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
			<StyledMapContainer height={height}>
				<MapContainer
					center={markerCoords}
					zoom={16}
					minZoom={2}
					maxZoom={18}
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
							// visibleCats={visibleCats}
							// setVisibleCats={setVisibleCats}
						/>
					)}
				</MapContainer>
			</StyledMapContainer>
		</>
	);
}
