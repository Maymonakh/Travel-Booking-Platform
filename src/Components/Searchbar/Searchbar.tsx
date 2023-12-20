import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Grid,
  Button,
  Autocomplete,
} from "@mui/material";
import "./SearchBar.css";
import Countercomponent from "./Countercomponent";
import { CitiesResponse, SearchRequestProps } from "../../API/Search/types";
import { CitiesRequest, SearchRequest } from "../../API/Search/index";
import { useNavigate } from "react-router-dom";

const Searchbar: React.FC = () => {
  const [checkInDate, setCheckInDate] = useState<Date>(new Date());
  const [checkOutDate, setCheckOutDate] = useState<Date>(new Date());
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [rooms, setRooms] = useState<number>(1);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [citiesData, setCitiesData] = useState<CitiesResponse[]>([]);
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

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSearch = async () => {
    try {
      const searchRequest: SearchRequestProps = {
        checkInDate: checkInDate.toISOString().split("T")[0],
        checkOutDate: checkOutDate.toISOString().split("T")[0],
        city: selectedCity || "",
        starRate: 0,
        sort: "",
        numberOfRooms: rooms,
        adults: adults,
        children: children,
      };

      const response = await SearchRequest(searchRequest);
      navigate("/search", { state: { results: response.data } });
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
      <Grid container spacing={2}>
        <Grid item xs={10} onClick={toggleExpansion}>
          <Autocomplete
            options={citiesData.map((city) => city.name)}
            value={selectedCity}
            onChange={(_, newValue) => setSelectedCity(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                label="where are you going..."
                variant="outlined"
              />
            )}
          />
        </Grid>

        <Grid item xs={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            size="large"
          >
            Search
          </Button>
        </Grid>
        {isExpanded && (
          <>
            <Grid item xs={12} container justifyContent="space-between">
              <TextField
                label="Check-in"
                type="date"
                variant="outlined"
                value={checkInDate.toISOString().split("T")[0]}
                onChange={(e) => setCheckInDate(new Date(e.target.value))}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Check-out"
                type="date"
                variant="outlined"
                value={checkOutDate.toISOString().split("T")[0]}
                onChange={(e) => setCheckOutDate(new Date(e.target.value))}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <Countercomponent
                label="Adults:"
                value={adults}
                onIncrement={() => setAdults(adults + 1)}
                onDecrement={() => setAdults(Math.max(adults - 1, 1))}
              />
              <Countercomponent
                label="Children:"
                value={children}
                onIncrement={() => setChildren(children + 1)}
                onDecrement={() => setChildren(Math.max(children - 1, 0))}
              />
              <Countercomponent
                label="Rooms:"
                value={rooms}
                onIncrement={() => setRooms(rooms + 1)}
                onDecrement={() => setRooms(Math.max(rooms - 1, 1))}
              />
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default Searchbar;
