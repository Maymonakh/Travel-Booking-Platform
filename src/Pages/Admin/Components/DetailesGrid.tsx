import React, { useEffect, useState } from "react";
import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import CitiesTable from "./Tabels/CitiesTable";
import HotelsTable from "./Tabels/HotelsTable";
import RoomsTable from "./Tabels/RoomsTable";
import SearchCity from "./Search/SearchCity";
import { CityHotelsRequest, HotelRoomsRequest } from "../../../API/Admin";
import { CityHotelsResponse, HotelRoomsResponse } from "../../../API/Admin/types";
import SearchHotel from "./Search/SearchHotel";

interface DetailsGridProps {
  entityType: string;
}

const DetailsGrid: React.FC<DetailsGridProps> = ({ entityType }) => {
  const [hotelsData, setHotelsData] = useState<CityHotelsResponse[]>([]);
  const [selectedCity, setSelectedCity] = useState<{
    label: string;
    value: number;
  } | null>(null);

  const [roomsData, setRoomsData] = useState<HotelRoomsResponse[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<{
    label: string;
    value: number;
  } | null>(null);

  const handleSearchCity = async (
    selectedCity: { label: string; value: number } | null
  ) => {
    try {
      if (selectedCity) {
        console.log(selectedCity);
        setSelectedCity(selectedCity);
        const response = await CityHotelsRequest(selectedCity.value);
        setHotelsData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchHotel = async (
    selectedHotel: { label: string; value: number } | null
  ) => {
    try {
      if (selectedHotel) {
        console.log(selectedHotel);
        setSelectedHotel(selectedHotel);
        const response = await HotelRoomsRequest(selectedHotel.value);
        setRoomsData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container
      sx={{
        backgroundColor: "white",
        marginTop: 10,
        paddingTop: 5,
        paddingBottom: 2,
        borderRadius: 5,
        overflowX:"auto"
      }}
    >
      {entityType === "Cities" ? (
        <Grid
          container
          xs={12}
          sx={{
            borderBottom: "2px solid Gray",
            paddingBottom: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              borderBottom: "2px solid Gray",
              paddingBottom: 2,
              marginBottom: 2,
            }}
          >
            Cities Management
          </Typography>
          <CitiesTable />
        </Grid>
      ) : entityType === "Hotels" ? (
        <Grid
          container
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            marginBottom:13
          }}
        >
          <Grid
            xs={12}
            sx={{
              borderBottom: "2px solid Gray",
              paddingBottom: 2,
              marginBottom: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Grid xs={6}>
              <Typography variant="h6">Hotels Management</Typography>
            </Grid>
            <Grid xs={6}>
              <SearchCity onSearch={handleSearchCity} />
            </Grid>
          </Grid>
          <HotelsTable
            hotelsData={hotelsData}
            cityId={selectedCity?.value || 0}
          />
        </Grid>
      ) : entityType === "Rooms" ? (
        <Grid
          container
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            marginBottom:13
          }}
        >
          <Grid
            xs={12}
            sx={{
              borderBottom: "2px solid Gray",
              paddingBottom: 2,
              marginBottom: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Grid xs={6}>
              <Typography variant="h6">Rooms Management</Typography>
            </Grid>
            <Grid xs={6}>
              <SearchHotel onSearch={handleSearchHotel} />
            </Grid>
          </Grid>
          <RoomsTable
            roomsData={roomsData}
            hotelId={selectedHotel?.value || 0}
          />
        </Grid>
      ) : null}
    </Container>
  );
};

export default DetailsGrid;
