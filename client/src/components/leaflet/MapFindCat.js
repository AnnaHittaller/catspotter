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
//import { LuGlobe } from "react-icons/lu";
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
import { AppContext } from "../../context/AppContext";



export default function MapFindCat({ height, cats, visibleCats, setVisibleCats }) {
	//console.log("rerender from mapnew component");
	const mapRef = useRef();
	const [showToast, setShowToast] = useState("");
	const [geocoderAdded, setGeocoderAdded] = useState(false);
	const {state, dispatch} = useContext(AppContext)
	let center = {
		lat: 51.64536,
		lng: -0.1534,
	};

	if (state.user._id) {
		center = {
			lat: state.user.location.coordinates[1] ,
			lng: state.user.location.coordinates[0] ,
		};
	} 

	//console.log("visible cats", visibleCats);

	return (
		<>
			{showToast && (
				<Toast type="error" setShowToast={setShowToast}>{showToast}
				</Toast>
			)}
			<StyledMapContainer height={height}>
				<MapContainer
					center={center}
					zoom={16}
					minZoom={2}
					whenCreated={(mapInstance) => (mapRef.current = mapInstance)}>
				{/* getBounds= */}
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
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
									icon={cat.status === "Lost" ? markerIconLost : markerIconSeen}
									position={[
										cat.location.coordinates[1],
										cat.location.coordinates[0],
									]}>
									<Popup>
										<MenuMidi cat={cat}/>
									</Popup>
								</Marker>
							))}
					</MarkerClusterGroup>
					<LeafletControlGeocoder mapRef={mapRef} setShowToast={setShowToast} visibleCats={visibleCats} setVisibleCats={setVisibleCats} cats={cats} />
				</MapContainer>
			</StyledMapContainer>
		</>
	);
}
