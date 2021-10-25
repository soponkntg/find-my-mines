import React from "react";

export const Room = (p) => {
  return (
    <div
      style={{
        position: "absolute",
        width: "1236px",
        height: "140px",
        left: "30px",
        top: "10px",

        background: "#FF0000",
        borderRadius: "15px",
      }}
    >
      <h1 style={{ position: "absolute", left: "30px", top: "25px" }}>
        {p.name}
      </h1>
    </div>
  );
};
