import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CitiesTable: React.FC = () => {
  const citiesData = [
    { id: 1, name: 'City A', country: 'Country A', postOffice: 'POA', numberOfHotels: 5, createDate: '2022-01-01', modifyDate: '2022-01-02' },
  ];

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Post Office</TableCell>
              <TableCell>Number of Hotels</TableCell>
              <TableCell>Creation Date</TableCell>
              <TableCell>Modification Date</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {citiesData.map((city) => (
              <TableRow key={city.id}>
                <TableCell>{city.name}</TableCell>
                <TableCell>{city.country}</TableCell>
                <TableCell>{city.postOffice}</TableCell>
                <TableCell>{city.numberOfHotels}</TableCell>
                <TableCell>{city.createDate}</TableCell>
                <TableCell>{city.modifyDate}</TableCell>
                <TableCell>
                  <IconButton color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CitiesTable;
