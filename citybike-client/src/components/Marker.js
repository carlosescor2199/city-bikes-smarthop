import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

function getIcon(color, iconSize) {
  if (color && color !== "") {
    return L.icon({
      iconUrl: require(`../assets/icons/location-${color}.png`),
      iconSize: iconSize,
    });
  }

  return L.icon({
    iconUrl: require("../assets/icons/location-pointer.png"),
    iconSize: iconSize,
  });
}

export default function Maker({ name, latitude, longitude, emptySlots, freeBikes, color, size }) {
  return (
    <Marker position={[latitude, longitude]} icon={getIcon(color, size)}>
      <Popup>
        <h3>{name}</h3>
        <p>{emptySlots} Empty slots</p>
        <p>{freeBikes} Free bikes</p>
      </Popup>
    </Marker>
  );
}
