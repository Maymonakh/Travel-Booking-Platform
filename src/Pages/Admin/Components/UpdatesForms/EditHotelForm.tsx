import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  DialogContentText,
  TextField,
  Button,
  CircularProgress,
  Grid,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import { editHotel } from "../../../../API/Admin";

interface EditHotelFormProps {
  onClose: () => void;
  onHotelEdit: (editedHotel: any) => void;
  hotelData: any;
}

const validationSchema = yup.object({
  name: yup.string().required("name is required"),
  hotelType: yup
    .number()
    .required("Type is required")
    .positive("Type must be positive")
    .integer("Type must be an integer"),
  description: yup.string(),
  starRating: yup
    .number()
    .required("Rating is required")
    .positive("Rating must be positive")
    .integer("Rating must be an integer"),
});

const EditHotelForm: React.FC<EditHotelFormProps> = ({
  onClose,
  onHotelEdit,
  hotelData,
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const formik = useFormik({
    initialValues: {
      name: hotelData?.name || "",
      hotelType: hotelData?.hotelType || 0,
      starRating: hotelData?.starRating || 0,
      description: hotelData?.description || "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const token = localStorage.getItem("authToken");
        await editHotel(hotelData.id, values, token);
        console.log("Hotel updated successfully:", values);
        onHotelEdit(values);
        setSnackbarMessage("Hotel updated successfully");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } catch (error) {
        console.error("Error updating hotel:", error);
        setSnackbarMessage("Error updating hotel");
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
          Edit the information for the hotel below.
        </DialogContentText>
        <TextField
          label="Hotel Name"
          variant="outlined"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("name")}
          error={formik.touched.name && Boolean(formik.errors.name)}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("description")}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
        />
        <TextField
          label="Hotel Type"
          variant="outlined"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("hotelType")}
          error={formik.touched.hotelType && Boolean(formik.errors.hotelType)}
        />
        <TextField
          label="Star Rate"
          variant="outlined"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("starRating")}
          error={formik.touched.starRating && Boolean(formik.errors.starRating)}
        />
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
      </form>
      <Snackbar open={snackbarOpen} onClose={handleSnackbarClose}>
        <SnackbarContent
          message={snackbarMessage}
          sx={{
            backgroundColor: snackbarSeverity === "success" ? "green" : "red",
          }}
        />
      </Snackbar>
    </Grid>
  );
};

export default EditHotelForm;
