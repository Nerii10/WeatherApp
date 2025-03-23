import React from "react";
import './WeatherInput.css'

export default function WeatherInput({ children }) {
  return (
    <div className="Weather-Data-Container">
      {children}
    </div>
  );
}
