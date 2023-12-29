import React, { useEffect, useState } from "react";
import { CircularProgress, Container, Grid } from "@mui/material";
import { HotelsRequest } from "../../../API/Admin";
import GridCard from "./GridCard";
import Navigation from "./Navigation";
import { CitiesRequest } from "../../../API/Search";
import { CitiesResponse } from "../../../API/Search/types";
import { HotelsResponse } from "../../../API/Admin/types";

const SearchedHotels: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string>("Cities");
  const [citiesData, setCitiesData] = useState<CitiesResponse[]>([]);
  const [hotelsData, setHotelsData] = useState<HotelsResponse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const citiesResponse = await CitiesRequest();
        setCitiesData(citiesResponse.data);

        const hotelsResponse = await HotelsRequest();
        setHotelsData(hotelsResponse.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleNavigationSelect = (selectedItem: string) => {
    setSelectedItem(selectedItem);
  };

  return (
    <Container
      sx={{
        backgroundColor: "white",
        marginTop: 1.5,
        paddingTop: 5,
        paddingBottom: 2,
        borderRadius: 5,
      }}
    >
      <Grid
        container
        direction="row"
        sx={{ padding: 5, borderRadius: 5, gap: 5 }}
      >
        <Navigation onSelect={handleNavigationSelect} />
        <Grid
          container
          spacing={2}
          direction="row"
          sx={{ maxHeight: 800, overflowX: "scroll", padding: 3, width: "70%" }}
        >
          {selectedItem === "Cities" ? (
            citiesData.length === 0 ? (
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <CircularProgress />
              </Grid>
            ) : (
              citiesData.map((city: CitiesResponse, index: number) => (
                <Grid item key={index} xs={12}>
                  <GridCard data={city} />
                </Grid>
              ))
            )
          ) : selectedItem === "Hotels" ? (
            hotelsData.length === 0 ? (
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <CircularProgress />
              </Grid>
            ) : (
                hotelsData.map((city: CitiesResponse, index: number) => (
                <Grid item key={index} xs={12}>
                  <GridCard data={city} />
                </Grid>
              ))
            )
          ) : null}
        </Grid>
      </Grid>
    </Container>
  );
};

export default SearchedHotels;
