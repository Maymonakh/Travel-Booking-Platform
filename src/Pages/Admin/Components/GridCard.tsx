import React from "react";
import Rating from "@mui/material/Rating";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { CitiesResponse } from "../../../API/Search/types";
import { HotelsResponse } from "../../../API/Admin/types";

const GridCard = ({ data }: { data: CitiesResponse | HotelsResponse}) => {
  return (
    <Card sx={{ display: "flex", flexDirection: "column" }}>
      <CardContent
        sx={{ display: "flex", flexDirection: "row", gap: 7, maxHeight: 80 }}
      >
        <Grid>
          <Typography variant="h6" gutterBottom>
            {data.name}
          </Typography>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default GridCard;
