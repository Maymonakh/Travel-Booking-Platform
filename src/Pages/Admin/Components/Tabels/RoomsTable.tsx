import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const RoomsTable: React.FC = () => {
  const roomsData = [
    { id: 1, number: 101, availability: true, adultCapacity: 2, childrenCapacity: 1, createDate: '2022-01-01', modifyDate: '2022-01-02' },
  ];

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Number</TableCell>
              <TableCell>Availability</TableCell>
              <TableCell>Adult Capacity</TableCell>
              <TableCell>Children Capacity</TableCell>
              <TableCell>Creation Date</TableCell>
              <TableCell>Modification Date</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roomsData.map((room) => (
              <TableRow key={room.id}>
                <TableCell>{room.number}</TableCell>
                <TableCell>{room.availability ? 'Yes' : 'No'}</TableCell>
                <TableCell>{room.adultCapacity}</TableCell>
                <TableCell>{room.childrenCapacity}</TableCell>
                <TableCell>{room.createDate}</TableCell>
                <TableCell>{room.modifyDate}</TableCell>
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

export default RoomsTable;
