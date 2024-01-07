import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  DialogContentText,
  TextField,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import { editRoom } from "../../../../API/Admin";

interface EditRoomFormProps {
  onClose: () => void;
  onRoomEdit: (editedRoom: any) => void;
  roomData: any;
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

const EditRoomForm: React.FC<EditRoomFormProps> = ({
  onClose,
  onRoomEdit,
  roomData,
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const formik = useFormik({
    initialValues: {
      roomNumber: roomData?.roomNumber || null,
      cost: roomData?.price || null,
      availability: roomData?.availability || false,
      capacityOfAdults: roomData?.capacityOfAdults || null,
      capacityOfChildren: roomData?.capacityOfChildren || null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const token = localStorage.getItem("authToken");
        await editRoom(roomData.id, values, token);
        console.log("Room updated successfully:", values);
        onRoomEdit(values);
        setSnackbarMessage("Room updated successfully");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } catch (error) {
        console.error("Error updating room:", error);
        setSnackbarMessage("Error updating room");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      } finally {
        setSubmitting(false);
        onClose();
      }
    },
  });

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Grid sx={{ width: 400 }}>
      <form onSubmit={formik.handleSubmit}>
        <DialogContentText>
          Edit the information for the room below.
        </DialogContentText>
        <TextField
          label="Room Number"
          variant="outlined"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("roomNumber")}
          error={formik.touched.roomNumber && Boolean(formik.errors.roomNumber)}
        />
        <TextField
          label="Cost"
          variant="outlined"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("cost")}
          error={formik.touched.cost && Boolean(formik.errors.cost)}
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
        >
          <MenuItem value="Yes">Yes</MenuItem>
          <MenuItem value="No">No</MenuItem>
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
        />
        <Grid marginTop={5}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={formik.isSubmitting}
            sx={{ marginRight: 2 }}
          >
            {formik.isSubmitting ? (
              <CircularProgress size={24} />
            ) : (
              "Save Changes"
            )}
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
    </Grid>
  );
};

export default EditRoomForm;
