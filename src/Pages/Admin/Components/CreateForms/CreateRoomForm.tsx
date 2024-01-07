import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  DialogContentText,
  TextField,
  Button,
  CircularProgress,
  MenuItem,
  Snackbar,
  SnackbarContent,
  Grid,
} from "@mui/material";
import { addRoom } from "../../../../API/Admin";

interface CreateRoomFormProps {
  onClose: () => void;
  onRoomCreate: (room: any) => void;
  hotelId: number;
}

const validationSchema = yup.object({
  roomNumber: yup
    .number()
    .required("Room Number is required")
    .positive("Room Number must be positive")
    .integer("Room Number must be an integer"),
  cost: yup
    .number()
    .required("Cost is required")
    .integer("Cost must be an integer"),
  availability: yup.string().required("Availability is required"),
  capacityOfAdults: yup
    .number()
    .required("Adult Capacity is required")
    .integer("Adult Capacity must be an integer"),
  capacityOfChildren: yup
    .number()
    .required("Children Capacity is required")
    .integer("Children Capacity must be an integer"),
});

const CreateRoomForm: React.FC<CreateRoomFormProps> = ({
  onClose,
  onRoomCreate,
  hotelId,
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const formik = useFormik({
    initialValues: {
      roomNumber: "",
      cost: 0,
      availability: "Yes",
      capacityOfAdults: 0,
      capacityOfChildren: 0,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await addRoom(hotelId, values, token);
        console.log("Room created successfully:", response.data);
        onRoomCreate(response.data);
        setSnackbarMessage("Room created successfully");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } catch (error) {
        console.error("Error creating room:", error);
        setSnackbarMessage("Error creating room");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      } finally {
        setSubmitting(false);
        resetForm();
        onClose();
      }
    },
  });

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <DialogContentText>
          Fill out the form below to create a new room.
        </DialogContentText>
        <TextField
          label="Room Number"
          variant="outlined"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("roomNumber")}
          error={formik.touched.roomNumber && Boolean(formik.errors.roomNumber)}
          helperText={formik.touched.roomNumber && formik.errors.roomNumber}
        />
        <TextField
          label="Cost"
          variant="outlined"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("cost")}
          error={formik.touched.cost && Boolean(formik.errors.cost)}
          helperText={formik.touched.cost && formik.errors.cost}
        />
        <TextField
          label="Availability"
          variant="outlined"
          fullWidth
          margin="normal"
          select
          {...formik.getFieldProps("availability")}
          error={
            formik.touched.availability && Boolean(formik.errors.availability)
          }
          helperText={formik.touched.availability && formik.errors.availability}
        >
          <MenuItem value="yes">Yes</MenuItem>
          <MenuItem value="no">No</MenuItem>
        </TextField>
        <TextField
          label="Adult Capacity"
          variant="outlined"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("capacityOfAdults")}
          error={
            formik.touched.capacityOfAdults &&
            Boolean(formik.errors.capacityOfAdults)
          }
          helperText={
            formik.touched.capacityOfAdults && formik.errors.capacityOfAdults
          }
        />
        <TextField
          label="Children Capacity"
          variant="outlined"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("capacityOfChildren")}
          error={
            formik.touched.capacityOfChildren &&
            Boolean(formik.errors.capacityOfChildren)
          }
          helperText={
            formik.touched.capacityOfChildren &&
            formik.errors.capacityOfChildren
          }
        />
        <Grid marginTop={5}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={formik.isSubmitting}
            sx={{ marginRight: 2 }}
          >
            {formik.isSubmitting ? <CircularProgress size={24} /> : "Create"}
          </Button>
          <Button variant="outlined" color="primary" onClick={onClose}>
            Cancel
          </Button>
        </Grid>
      </form>
      <Snackbar open={snackbarOpen} onClose={handleSnackbarClose}>
        <SnackbarContent
          message={snackbarMessage}
          sx={{
            backgroundColor:
              snackbarSeverity === "success" ? "#03F94E" : "#F90A03",
          }}
        />
      </Snackbar>
    </div>
  );
};

export default CreateRoomForm;
