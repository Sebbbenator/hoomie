import React from "react";
import "../css_components/Loading.css";

export default function Loading() {
  return (
    <div className="loading" role="status" aria-live="polite" aria-busy="true">
      <div className="spinner" />
      <span className="loading-text">Indlæser…</span>
    </div>
  );
}
