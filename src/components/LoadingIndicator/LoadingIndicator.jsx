import React from "react";
import "./LoadingIndicator.css"

const LoadingIndicator = () => {
  return (
    <div
      style={{"--size": "64px", "--dot-size": "6px", "--dot-count": "6", "--color": "#000000", "--speed": "1s", "--spread": "60deg"}}
      className="dots"
    >
      <div style={{"--i": 0}} className="dot"></div>
      <div style={{"--i": 1}} className="dot"></div>
      <div style={{"--i": 2}} className="dot"></div>
      <div style={{"--i": 3}} className="dot"></div>
      <div style={{"--i": 4}} className="dot"></div>
      <div style={{"--i": 5}} className="dot"></div>
    </div>
  );
};

export default LoadingIndicator;
