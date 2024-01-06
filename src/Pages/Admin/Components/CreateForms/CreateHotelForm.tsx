import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  DialogContentText,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import { addHotel } from "../../../../API/Admin";


interface CreateHotelFormProps {
  onClose: () => void;
  onHotelCreate: (hotel: any) => void;
  cityId:number
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

const CreateHotelForm: React.FC<CreateHotelFormProps> = ({
  onClose,
  onHotelCreate,
  cityId,
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      hotelType: 0,
      starRating: 0,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await addHotel(cityId,values,token);
        console.log("Hotel created successfully:", response.data);
        onHotelCreate(response.data);
        setSnackbarMessage("Hotel created successfully");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } catch (error) {
        console.error("Error creating hotel:", error);
        setSnackbarMessage("Error creating hotel");
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
          Fill out the form below to create a new Hotel.
        </DialogContentText>
        <TextField
          label="Hotel Name"
          variant="outlined"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("name")}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
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
          helperText={formik.touched.description && formik.errors.description}
        />
        <TextField
          label="Hotel Type"
          variant="outlined"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("hotelType")}
          error={formik.touched.hotelType && Boolean(formik.errors.hotelType)}
          helperText={formik.touched.hotelType && formik.errors.hotelType}
        />
        <TextField
          label="Star Rate"
          variant="outlined"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("starRating")}
          error={formik.touched.starRating && Boolean(formik.errors.starRating)}
          helperText={formik.touched.starRating && formik.errors.starRating}
        />
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
      </form>
      <Snackbar open={snackbarOpen} onClose={handleSnackbarClose}>
        <SnackbarContent
          message={snackbarMessage}
          sx={{
            backgroundColor: snackbarSeverity === "success" ? "green" : "red",
          }}
        />
      </Snackbar>
    </div>
  );
};

export default CreateHotelForm;
