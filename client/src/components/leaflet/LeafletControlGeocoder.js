import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import "leaflet.locatecontrol/dist/L.Control.Locate.css";
import "leaflet.locatecontrol";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { Icon, divIcon, point } from "leaflet";
import {
	useState,
	useMemo,
	useCallback,
	useRef,
	useContext,
	useEffect,
} from "react";
import { useMap } from "react-leaflet";
import { AppContext } from "../../context/AppContext";
import { useLocation } from "react-router-dom";
//import icon from "./MarkerOwn";
//import { LocationContext } from "../context/LocationContext";

export default function LeafletControlGeocoder({ mapRef, setShowToast, visibleCats, setVisibleCats, cats }) {
	//const { location, setLocation } = useContext(LocationContext);
	const map = useMap();
	const [geocoderAdded, setGeocoderAdded] = useState(false);
	const { state, dispatch } = useContext(AppContext);
	const location = useLocation()

	useEffect(() => {
		if (map && !geocoderAdded) {
			const geocoder = L.Control.Geocoder.nominatim();

			L.Control.geocoder({
				query: "",
				placeholder: "Search here...",
				defaultMarkGeocode: false,
				geocoder,
			})
				.on("markgeocode", function (e) {
					var latlng = e.geocode.center;
					let markerLatLng;
					map.fitBounds(e.geocode.bbox);
					console.log("new latlng", latlng);
				})
				.addTo(map);

			L.control
				.locate({
					position: "topright",
					strings: {
						title: "Show me where I am",
					},
					flyTo: true,
					showPopup: false,
					drawMarker: false,
					locateOptions: {
						enableHighAccuracy: true,
					},
					// compassStyle: {
					// 	fillColor: "red",
					// 	fillOpacity: 1,
					// 	weight: 0,
					// 	color: "purple",
					// },
					// circleStyle: {
					// 	className: "leaflet-control-locate-circle",
					// 	color: "red",
					// 	fillColor: "yellow",
					// 	fillOpacity: 0.5,
					// 	weight: 0,
					//},
				})
				.addTo(map);

			map.on("locationfound", function (e) {
				//console.log("Accuracy:", e.accuracy);
				//console.log("Latitude:", e.latlng.lat);
				//console.log("Longitude:", e.latlng.lng);

				if (e.accuracy > 1000) {
					setShowToast("The geolocation accuracy is too low, please zoom in to your exact position.");
				}
			});

			setGeocoderAdded(true);
		}
	}, [mapRef, geocoderAdded ]);

	useEffect(() => {
		if(location.pathname = "map") {

			//console.log("state.cats geocoder", state)
			const handleMoveEnd = () => {
			  const bounds = map.getBounds();
			  const filteredResults = state.cats?.filter((cat) => {
				const catLatLng = L.latLng(
				  cat.location.coordinates[1],
				  cat.location.coordinates[0]
				);
				return bounds.contains(catLatLng);
			  });
			  setVisibleCats(filteredResults);
			};
		
			handleMoveEnd(); // Initial update of visibleCats
		
			map.on("moveend", handleMoveEnd);
		
			return () => {
			  map.off("moveend", handleMoveEnd);
			};
		} else {
			return 
		}

  }, [map, state]);

  

	//   function getFeaturesInView(bbox) {
	 		// let features = [];
			// map.eachLayer(function (layer) {
			// 	if (layer instanceof L.Marker) {
			// 		const latLng = layer.getLatLng();
			// 		if (bbox.contains(latLng)) {
			// 			features.push(layer.feature);
			// 		}
			// 	}
			// });
			// console.log("features", features)
		// 	return features;
		// }

	return null;
}
