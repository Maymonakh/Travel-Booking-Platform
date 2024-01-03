import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const HotelsTable: React.FC = () => {
  const hotelsData = [
    { id: 1, name: 'Hotel A', starRate: 4, owner: 'Owner A', roomNumber: 100, createDate: '2022-01-01', modifyDate: '2022-01-02' },
  ];

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Star Rate</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Room Number</TableCell>
              <TableCell>Creation Date</TableCell>
              <TableCell>Modification Date</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hotelsData.map((hotel) => (
              <TableRow key={hotel.id}>
                <TableCell>{hotel.name}</TableCell>
                <TableCell>{hotel.starRate}</TableCell>
                <TableCell>{hotel.owner}</TableCell>
                <TableCell>{hotel.roomNumber}</TableCell>
                <TableCell>{hotel.createDate}</TableCell>
                <TableCell>{hotel.modifyDate}</TableCell>
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

export default HotelsTable
