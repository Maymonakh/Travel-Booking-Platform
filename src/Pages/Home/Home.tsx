import React from "react";
import Trendingdestination from "./Components/Trendingdestinations";
import { Grid } from "@mui/material";
import FeaturesDeals from "./Components/FeaturesDeals";
import VisitedHotels from "./Components/VisitedHotels";
import NavBar from "../../Components/NavBar";
import Searchbar from "../../Components/Searchbar";

const Home: React.FC = () => {
  return (
    <div className="container">
      <NavBar />
      <Searchbar />
      <Grid container spacing={1.5} marginBottom={10} marginTop={3}>
        <Grid item xs={12} md={4}>
          <Trendingdestination />
        </Grid>
        <Grid item xs={12} md={8}>
          <FeaturesDeals />
          <VisitedHotels />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
