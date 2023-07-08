import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";

import {
	markerIconOwn,
	markerIconSeen,
	markerIconLost,
	markerIconTest,
	createCustomClusterIcon,
} from "../components/MapMarkers";
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
import icon from "./MarkerOwn";
import { LocationContext } from "../context/LocationContext";

export default function LeafletControlGeocoder({ mapRef }) {
	const { location, setLocation } = useContext(LocationContext);
	const map = useMap();
	const [geocoderAdded, setGeocoderAdded] = useState(false);
	

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
					//const marker = L.marker(latlng, { draggable: true, icon }).addTo(map);
					//.bindPopup(e.geocode.name)
					//.openPopup();
					let markerLatLng;
					// marker.on("dragend", function (event) {
					// 	const markerLatLng = event.target.getLatLng();
					// 	console.log("New Location Coordinates:", markerLatLng);
					// 	setLocation({
					// 		...location,
					// 		lat: markerLatLng.lat,
					// 		lng: markerLatLng.lng,
					// 		loaded: true,
					// 		accuracy: 10,
					// 	});
					// 	console.log("location updated test", location);
					// 	// You can use the markerLatLng here or update your state accordingly
					// });

					map.fitBounds(e.geocode.bbox);
					// var poly = L.polygon([
					//   bbox.getSouthEast(),
					//   bbox.getNorthEast(),
					//   bbox.getNorthWest(),
					//   bbox.getSouthWest()
					console.log("new latlng", latlng);
				})
				.addTo(map);

			setGeocoderAdded(true);
		}
	}, [mapRef, geocoderAdded]);

	return null;
}

//https://github.com/atamj/leaflet-control-geocoders

//   const map = this.leafletMap.leafletElement;
//   const geocoder = L.Control.Geocoder.nominatim();
//   let marker;

//   map.on("click", (e) => {
//     geocoder.reverse(
//       e.latlng,
//      map.options.crs.scale(map.getZoom()),
//       (results) => {
//        var r = results[0];
//         if (r) {
//           console.log(r.center.lat + "," + r.center.lng);
//           if (marker) {
//             marker
//                .setLatLng(r.center)
//                .setPopupContent(r.html || r.name)
//                .openPopup();
//           } else {
//             marker = L.marker(r.center)
//               .bindPopup(r.name)
//               .addTo(map)
//               .openPopup();
//           }
//         }
//       }
//     );
//   });
