import React from "react";
import Navbar from "../../Components/NavBar/Navbar";
import Searchbar from "../../Components/Searchbar/Searchbar";
import Trendingdestination from "./Components/Trendingdestinations/Trendingdestinations";
import { Grid } from '@mui/material';
import FeaturesDeals from "./Components/FeaturesDeals/FeaturesDeals";

const Home: React.FC = () => {
  const handleSearch = (searchParams: {
    checkInDate: Date;
    checkOutDate: Date;
    adults: number;
    children: number;
    rooms: number;
  }) => {
    console.log("Search parameters:", searchParams);
  };

    return (
      <div className="container">
        <Navbar />
        <Searchbar onSearch={handleSearch} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Trendingdestination />
          </Grid>
          <Grid item xs={12} md={8}>
            <FeaturesDeals />
          </Grid>
        </Grid>
      </div>
    );
  
};



export default Home;

