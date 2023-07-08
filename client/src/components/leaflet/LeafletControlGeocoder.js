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
//import icon from "./MarkerOwn";
//import { LocationContext } from "../context/LocationContext";

export default function LeafletControlGeocoder({ mapRef, setShowToast }) {
	//const { location, setLocation } = useContext(LocationContext);
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
					compassStyle: {
						fillColor: "red",
						fillOpacity: 1,
						weight: 0,
						color: "purple",
					},
					circleStyle: {
						className: "leaflet-control-locate-circle",
						color: "red",
						fillColor: "yellow",
						fillOpacity: 0.5,
						weight: 0,
					},
				})
				.addTo(map);

			map.on("locationfound", function (e) {
				console.log("Accuracy:", e.accuracy);
				console.log("Latitude:", e.latlng.lat);
				console.log("Longitude:", e.latlng.lng);

				if (e.accuracy > 1000) {
					setShowToast(true);
				}
			});

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
