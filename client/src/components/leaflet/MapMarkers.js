
import L, { Icon, divIcon, point } from "leaflet";

export const markerIconOwn = new Icon({
	iconSize: [35, 50],
	iconAnchor: [17, 46],
	popupAnchor: [0, -40],
	iconUrl:
		"https://res.cloudinary.com/dgum1eu6e/image/upload/v1688899559/catspotter-assets/marker_own_c2edia.png",
});

export const markerIconLost = new Icon({
	iconUrl:
		"https://res.cloudinary.com/dgum1eu6e/image/upload/v1688899559/catspotter-assets/marker_lost_mpfwgq.png",
	iconSize: [35, 50],
	iconAnchor: [17, 46],
	popupAnchor: [],
});

export const markerIconSeen = new Icon({
	iconUrl:
		"https://res.cloudinary.com/dgum1eu6e/image/upload/v1688899559/catspotter-assets/marker_seen_fjynd6.png",
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
