import {
	useState,
	//useMemo,
	//useCallback, 
	useRef,
	useContext,
	useEffect,
} from "react";
import { StyledMapContainer } from "../../styles/styled/Styled_MapContainer";
import {
	MapContainer,
	TileLayer,
	// Marker,
	// Popup,
	// useMap,
	useMapEvents,
	Circle,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import { useLocation } from "react-router-dom";
import ReverseGeocodeMarker from "./ReverseGeocodeMarker";
import markerIconOwn from "../leaflet/MapMarkerOwn";
//import icon from "./MapMarkerOwn";

import MenuAddress from "../MenuAddress";

import LeafletControlGeocoder from "./LeafletControlGeocoder";
import AreaRangeSlider from "./AreaRangeSlider";
import { AppContext } from "../../context/AppContext";

export default function MapUserUpdate({
	height,
	markerCoords,
	setMarkerCoords,
	rangeValue,
	setRangeValue,
	cats,
	visibleCats,
	setVisibleCats, 
}) {
	const { state } = useContext(AppContext);
	const mapRef = useRef();
	// const [markerCoords, setMarkerCoords] = useState([
	// 	state.user.location.coordinates[1],
	// 	state.user.location.coordinates[0],
	// ]);
	console.log("markerCoords from userupdatemap,", markerCoords);
	const { pathname } = useLocation(); //is this used? probs not
	const [showToast, setShowToast] = useState(false);

	//const [circleRadius, setCircleRadius] = useState(0);

	// center is just for initial map center, not for circle
	const center = [
		state.user.location.coordinates[1],
		state.user.location.coordinates[0],
	];

	//pass up rangeValue to page & form ////////////////////////
	//const [rangeValue, setRangeValue] = useState([0, 0]);

	const handleMapClick = (e) => {
		const { lat, lng } = e.latlng;
		setMarkerCoords({ lat, lng });
		console.log("newmarkercoords", markerCoords)
		console.log(rangeValue, "rangevalue");
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
					center={center}
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
						/>
					)}

					{rangeValue.length === 2 && rangeValue[1] > 0 && (
						<Circle center={markerCoords} radius={rangeValue[1] * 1000} />
					)}
					<LeafletControlGeocoder
						mapRef={mapRef}
						setShowToast={setShowToast}
						visibleCats={visibleCats}
						setVisibleCats={setVisibleCats}
						cats={cats}
					/>
				</MapContainer>
			</StyledMapContainer>
			<AreaRangeSlider
				//circleRadius={circleRadius}
				//setCircleRadius={setCircleRadius}
				rangeValue={rangeValue}
				setRangeValue={setRangeValue}
			/>
		</>
	);
}
