import React from "react";
import { Typography } from "@mui/material";
import { TrendingDestinationResponse } from "../../../../API/Home/types";

const Trendingcard = ({ data }: { data: TrendingDestinationResponse }) => {
  return (
    <div style={{ position: "relative", marginBottom: 16 }}>
      <img
        alt={data.cityName}
        height="160"
        src={data.thumbnailUrl}
        style={{ width: "100%", borderRadius: 8 }}
      />
      <div
        style={{
          position: "absolute",
          top: 8,
          left: 8,
          color: "white",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
        }}
      >
        <Typography variant="h6">{data.countryName}</Typography>
        <Typography variant="subtitle1">{data.cityName}</Typography>
      </div>
    </div>
  );
};

export default Trendingcard;
