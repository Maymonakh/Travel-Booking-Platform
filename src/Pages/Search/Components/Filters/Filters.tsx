import React, { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import { AmenitiesResponse } from "../../../../API/Search/types";
import Slider from "@mui/material/Slider";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { AmenitiesRequest } from "../../../../API/Search";

const Filters = () => {
  const [amenitiesData, setAmenitiesData] = useState<AmenitiesResponse[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedRating, setSelectedRating] = useState([0, 5]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AmenitiesRequest();
        setAmenitiesData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);


  return (
    <Container
      sx={{
        backgroundColor: "white",
        paddingTop: 5,
        paddingBottom: 2,
        borderRadius: 5,
        height:600,
      }}
    >
      <Typography variant="h5" gutterBottom marginBottom={3}>
        Filters:
      </Typography>
      <Grid sx={{ borderBottom: "2px solid #ddd", paddingBottom: 2 }}>
        <Typography sx={{ fontSize: 18 }} gutterBottom>
          Price range
        </Typography>
        <Slider
          defaultValue={100}
          step={10}
          min={0}
          max={300}
          valueLabelDisplay="auto"
        />
      </Grid>
      <Grid sx={{ borderBottom: "2px solid #ddd", paddingBottom: 2 }}>
        <Typography sx={{ fontSize: 18 }} gutterBottom marginTop={2}>
          Rating:
        </Typography>
        <Slider
          defaultValue={5}
          step={1}
          marks
          min={0}
          max={5}
          valueLabelDisplay="auto"
        />
      </Grid>
      <Grid>
        <Typography sx={{ fontSize: 18 }} gutterBottom marginTop={2}>
          Amenities:
        </Typography>
        <Grid sx={{ display: "flex", flexDirection: "column" }}>
          {amenitiesData.map((amenity) => (
            <FormControlLabel
              key={amenity.name}
              control={<Checkbox value={amenity.name} />}
              label={amenity.name}
            />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Filters;
