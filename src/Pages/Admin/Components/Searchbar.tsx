import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Grid,
  Button,
  Autocomplete,
} from "@mui/material";
import { CitiesResponse, HotelsResponse } from "../../../API/Admin/types";
import { useNavigate } from "react-router-dom";
import {
  CityHotelsRequest,
  CityRequest,
  HotelsRequest,
} from "../../../API/Admin";
import { CitiesRequest } from "../../../API/Search";

interface SearchbarProps {
  entityType: string;
}

const Searchbar: React.FC<SearchbarProps> = ({ entityType }) => {
  const [searchFields, setSearchFields] = useState<any[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null);
  const [citiesData, setCitiesData] = useState<CitiesResponse[]>([]);
  const [hotelsData, setHotelsData] = useState<HotelsResponse[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CitiesRequest();
        setCitiesData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await HotelRequest();
  //       setHotelsData(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    if (entityType === "Cities") {
      setSearchFields([{ label: "City Name", id: "cityName" }]);
    } else if (entityType === "Hotels") {
      setSearchFields([
        { label: "City Name", id: "cityName" },
        { label: "Hotel Name", id: "hotelName" },
      ]);
    } 
  }, [entityType]);

  const handleSearch = async () => {
    try {
      let searchRequest: any = {}; // Define a generic search request object

      if (entityType === "Cities") {
        searchRequest = {
          id: 0,
          name: selectedCity || "",
          description: "",
        };
      } else if (entityType === "Hotels") {
        searchRequest = {
          id: 0,
          name: selectedHotel || "",
          description: "",
          hotelType: "",
          latitude: 0,
          longitude:0,
        };
      }

      // const response =
      //   entityType === "Cities"
      //     ? await CityRequest(searchRequest)
      //     : await HotelRequest(searchRequest);

      // navigate("/Admin", { state: { results: response.data } });
    } catch (error) {
      console.error("Error in search:", error);
    }
  };

  return (
    <Container
      sx={{
        backgroundColor: "white",
        marginTop: 5,
        padding: 3,
        borderRadius: 5,
      }}
    >
      <Grid container spacing={2} justifyContent={"space-between"}>
        {searchFields.map((field) => (
          <Grid item xs={10} key={field.id}>
            <Autocomplete
              options={
                field.id === "cityName"
                  ? citiesData.map((city) => city.name)
                  : hotelsData.map((hotel) => hotel.name)
              }
              value={field.id === "cityName" ? selectedCity : selectedHotel}
              onChange={(_, newValue) =>
                field.id === "cityName"
                  ? setSelectedCity(newValue)
                  : setSelectedHotel(newValue)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  label={`Enter ${field.label.toLowerCase()}...`}
                  variant="outlined"
                />
              )}
            />
          </Grid>
        ))}
        <Grid item xs={3} alignSelf={"center"}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSearch}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Searchbar;
