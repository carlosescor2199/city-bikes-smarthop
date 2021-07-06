import React from "react";
import "./HistoryItem.css";

export default function HistoryItem({ onClick, message }) {
  return (
    <button className="history-item" onClick={onClick}>
      {message}
    </button>
  );
}
