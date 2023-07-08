
import L, { Icon, divIcon, point } from "leaflet";

export const markerIconOwn = new Icon({
	//iconUrl: require("../assets/markers/marker_own.png"),
	iconSize: [35, 50],
	iconAnchor: [17, 46],
	popupAnchor: [0, -40],
	iconUrl: "/assets/markers/marker_own.png",
});

export const markerIconLost = new Icon({
	//iconUrl: require("../assets/markers/marker_lost.png"),
	iconUrl: "/assets/markers/marker_lost.png",
	iconSize: [35, 50],
	iconAnchor: [17, 46],
	popupAnchor: [],
});

export const markerIconSeen = new Icon({
	//iconUrl: require("../assets/markers/marker_seen.png"),
	iconUrl: "/assets/markers/marker_seen.png",
	iconSize: [35, 50],
	iconAnchor: [17, 46],
	popupAnchor: [],
});

export const createCustomClusterIcon = (cluster) => {
	return new divIcon({
		html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
		className: "custom-marker-cluster",
		iconSize: point(33, 33, true),
	});
};
