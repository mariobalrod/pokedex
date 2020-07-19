import React from "react";

export default function StatsBar(props) {
  return (
    <div className="wrapper" style={{ textAlign: "center" }}>
      <div className="progress-bar">
        <span
          className="progress-bar-fill"
          style={{
            width: `${props.base}%`,
            backgroundColor: `#${props.color}`,
          }}
        >
          {props.base + "%"}
        </span>
      </div>
    </div>
  );
}
