"use client";

import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

// node_modules 안의 이미지들을 import
// (번들러/Next 설정에 따라 import 결과가 string 또는 {src: string}일 수 있으므로 안전하게 처리)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

type LeafletMapProps = {
    center: LatLngExpression;
    zoom?: number;
    className?: string;
    style?: React.CSSProperties;
};

export const LeafletMap = ({
    center,
    zoom = 13,
    className,
    style,
}: LeafletMapProps) => {
    return (
        <MapContainer
            center={center}
            zoom={zoom}
            scrollWheelZoom={false}
            className={className}
            style={{ width: "100%", height: "100%", ...style }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={center}>
                <Popup>대한수중핀수영협회</Popup>
            </Marker>
        </MapContainer>
    );
};
