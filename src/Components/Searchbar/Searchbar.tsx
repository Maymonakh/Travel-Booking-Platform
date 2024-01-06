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
  const [dateError, setDateError] = useState<string | null>(null);
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

  const validateAndSearch = async () => {
    const today = new Date();
    const selectedCheckInDate = new Date(checkInDate);
    const selectedCheckOutDate = new Date(checkOutDate);

    if (selectedCheckInDate < today) {
      setDateError("Check-in date should be today or later");
      return;
    }

    if (selectedCheckOutDate <= selectedCheckInDate) {
      setDateError("Check-out date should be after check-in date");
      return;
    }

    setDateError(null);

    try {
      const searchRequest: SearchRequestProps = {
        checkInDate: selectedCheckInDate.toISOString().split("T")[0],
        checkOutDate: selectedCheckOutDate.toISOString().split("T")[0],
        city: selectedCity || "",
        starRate: 0,
        sort: "",
        numberOfRooms: rooms,
        adults: adults,
        children: children,
      };

      const response = await SearchRequest(searchRequest);
      navigate("/Search", { state: { results: response.data } });
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
        <Grid item lg={10} xs={12} onClick={toggleExpansion}>
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

        <Grid item lg={2} xs={2} >
          <Button
            variant="contained"
            color="primary"
            onClick={validateAndSearch}
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

            {dateError && (
              <Typography color="error" variant="caption">
                {dateError}
              </Typography>
            )}
          </>
        )}
      </Grid>
    </Container>
  );
};

export default Searchbar;
