import React from "react";
import Marker from "./Marker";

export default function MarkerList({ stations }) {
  const markerList =
    stations.length > 0 &&
    stations.map((station) => (
      <Marker
        key={station.id}
        name={station.name}
        latitude={station.latitude}
        longitude={station.longitude}
        emptySlots={station.empty_slots}
        freeBikes={station.free_bikes}
        color={
          station.free_bikes > 5
            ? "green"
            : station.free_bikes <= 5 && station.free_bikes > 0
            ? "yellow"
            : "red"
        }
        size={20}
      />
    ));

  return <div>{markerList}</div>;
}
