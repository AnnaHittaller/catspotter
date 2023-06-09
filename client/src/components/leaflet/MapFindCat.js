import {
	useState,
	useMemo,
	useCallback,
	useRef,
	useContext,
	useEffect,
} from "react";
import { StyledMapContainer } from "../../styles/styled/Styled_MapContainer";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

import L, { Icon, divIcon, point } from "leaflet";
import "leaflet/dist/leaflet.css";
import { LuGlobe } from "react-icons/lu";
//import { StyledPrimaryButton } from "../styles/styled/Styled_Button";
//import { LocationContext } from "../context/LocationContext";
//import useGeolocation from "../customHooks/useGeolocation";
import Toast from "../../components/Toast";
import MarkerClusterGroup from "react-leaflet-cluster";
import {
	markerIconOwn,
	markerIconSeen,
	markerIconLost,
	createCustomClusterIcon,
} from "./MapMarkers";

import MenuMidi from "../MenuMidi";

import LeafletControlGeocoder from "./LeafletControlGeocoder";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import { useMapEvents } from "react-leaflet";

export default function MapFindCat({ height, cats }) {
	console.log("rerender from mapnew component");
	const mapRef = useRef();
	const [showToast, setShowToast] = useState(false);
	const [geocoderAdded, setGeocoderAdded] = useState(false);

	console.log("map4", cats);

	//maybe pass the state up to the page?
	const [visibleCats, setVisibleCats] = useState([]);

	useEffect(() => {
		if (!mapRef.current) return;
		const updateVisibleCats = () => {
			const bounds = mapRef.current.getBounds();
			const filteredCats = cats.filter((cat) => {
				const catLatLng = L.latLng(
					cat.location.coordinates[1],
					cat.location.coordinates[0]
				);
				return bounds.contains(catLatLng);
			});
			setVisibleCats(filteredCats);
		};

		updateVisibleCats();

		const handleMoveEnd = () => {
			updateVisibleCats();
		};

		mapRef.current.on("moveend", handleMoveEnd);

		return () => {
			mapRef.current.off("moveend", handleMoveEnd);
		};
	}, [cats]);

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
					whenCreated={(mapInstance) => (mapRef.current = mapInstance)}>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					<MarkerClusterGroup
						chunkedLoading
						iconCreateFunction={createCustomClusterIcon}
						//disableClusteringAtZoom={13}
						zoomToBoundsOnClick>
						{cats.length > 0 &&
							cats &&
							cats.map((cat) => (
								<Marker
									key={cat._id}
									//add popup with menu
									icon={cat.status === "lost" ? markerIconLost : markerIconSeen}
									position={[
										cat.location.coordinates[1],
										cat.location.coordinates[0],
									]}>
									{" "}
								</Marker>
							))}
					</MarkerClusterGroup>
					<LeafletControlGeocoder mapRef={mapRef} setShowToast={setShowToast} />
				</MapContainer>
			</StyledMapContainer>
		</>
	);
}
