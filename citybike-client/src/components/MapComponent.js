import React from 'react';
import { TileLayer, Map } from 'react-leaflet';
import MarkerList from './MarkerList';

export default function MapComponent({ position, zoom, stations }) {
    return (
        <Map center={position} zoom={zoom} style={{ width: "100%" }}>
          <TileLayer
            attribution='copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerList stations={stations} />
        </Map>
    )
}
