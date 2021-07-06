import React from "react";
import HistoryItem from "./common/HistoryItem";

export default function HistoryItemList({ history, onClick }) {
  return (
    <>
      {history.length > 0 &&
        history.map((item, index) => (
          <HistoryItem
            key={index}
            onClick={() => onClick(index)}
            message={`-${index + 1}`}
          />
        ))}
    </>
  );
}
