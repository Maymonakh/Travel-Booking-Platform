import React from "react";
import Searchbar from "./Components/Searchbar";
import Navigation from "./Components/Navigation";
import { Grid } from "@mui/material";
import SearchedHotels from "./Components/DetailedGrid";

const Admin: React.FC = () => {
  return (
    <div className="container">
      <Searchbar />
      <Grid container spacing={1.5}>

        <Grid item xs={12} >
          <SearchedHotels />
        </Grid>
      </Grid>
    </div>
  );
};

export default Admin;
