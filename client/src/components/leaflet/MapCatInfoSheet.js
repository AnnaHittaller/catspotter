import {
  useRef,
} from "react";
import { StyledMapContainer } from "../../styles/styled/Styled_MapContainer";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { markerIconLost, markerIconSeen } from "../MapMarkers";

export default function MapCatInfoSheet({ height}) {
  const mapRef = useRef();

  const ZOOM_LEVEL_DEFAULT = 16;
  const center = { lat: 51.64535, lng: -0.15448 };

  //const markerRef = useRef(null);

  return (
    <>
      <StyledMapContainer height={height}>
        <MapContainer
          center={center}
          zoom={ZOOM_LEVEL_DEFAULT}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker icon={markerIconSeen} position={center}></Marker>
        </MapContainer>
      </StyledMapContainer>
    </>
  );
}