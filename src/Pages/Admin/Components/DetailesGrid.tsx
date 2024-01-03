import React, { useEffect, useState } from "react";
import { CircularProgress, Container, Grid } from "@mui/material";
import CitiesTable from "./Tabels/CitiesTable";
import HotelsTable from "./Tabels/HotelsTable";
import RoomsTable from "./Tabels/RoomsTable";

interface DetailsGridProps {
  entityType: string;
}

const DetailsGrid: React.FC<DetailsGridProps> = ({ entityType }) => {
  const [loading, setLoading] = useState<boolean>(true);



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
      {(
        entityType === "Cities" ? (
          <CitiesTable />
        ) : entityType === "Hotels" ? (
          <HotelsTable />
        ) : entityType === "Rooms" ? (
          <RoomsTable />
        ) : (
          null
        )
      )}
    </Container>
  );
};

export default DetailsGrid;
