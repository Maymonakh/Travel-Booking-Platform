import React from "react";
import NavBar from "../../Components/NavBar";
import Searchbar from "../../Components/Searchbar";
import { Grid } from "@mui/material";
import SearchedHotels from "./Components/SearchResult/SearchedHotels";
import Filters from "./Components/Filters";

const Search: React.FC = () => {
  return (
    <div className="container">
      <NavBar />
      <Searchbar />
      <Grid container spacing={1.5}>
        <Grid item xs={12} md={4}>
          <Filters/>
        </Grid>
        <Grid item xs={12} md={8}>
          <SearchedHotels />
        </Grid>
        </Grid>
    </div>
  );
};

export default Search;
