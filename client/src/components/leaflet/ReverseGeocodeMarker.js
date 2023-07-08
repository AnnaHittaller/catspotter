import { useState, useRef, useEffect } from "react";
import { useMap } from "react-leaflet";
import L, { Icon, divIcon, point } from "leaflet";
import axios from "axios";
import MenuAddress from "../MenuAddress";
import ReactDOMServer from "react-dom/server";

export default function ReverseGeocodeMarker({ position, icon }) {
	const markerRef = useRef();
	const map = useMap();

	//const center = { lat: 51.64535, lng: -0.15448 };

	useEffect(
		(e) => {
			const geocoder = L.Control.Geocoder.nominatim();
			if (position) {
				if (markerRef.current) {
					markerRef.current.setLatLng(position);
					map.flyTo(position, 17);
				} else {
					markerRef.current = L.marker(position, { icon }).addTo(map);
				}

				geocoder.reverse(
					position,
					map.options.crs.scale(map.getZoom()),
					(results) => {
						var r = results[0];
						if (r) {
							console.log(r.center.lat + "," + r.center.lng + ",", r.name);
							console.log(r);
							const popupContent = ReactDOMServer.renderToString(
								<MenuAddress r={r} />
							);
							markerRef.current.bindPopup(popupContent).openPopup();
						}
					}
				);
			}
		},
		[position, map, icon]
	);

	useEffect(() => {
		return () => {
			if (markerRef.current) {
				markerRef.current.removeFrom(map);
			}
		};
	}, [map]);

	return null;
}
