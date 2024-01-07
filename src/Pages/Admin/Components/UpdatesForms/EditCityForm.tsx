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
import { editCity } from "../../../../API/Admin";

interface EditCityFormProps {
  onClose: () => void;
  onCityEdit: (editedCity: any) => void;
  cityData: any;
}

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
});

const EditCityForm: React.FC<EditCityFormProps> = ({ onClose, onCityEdit, cityData }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const formik = useFormik({
    initialValues: {
      name: cityData?.name || "",
      description: cityData?.description || "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const token = localStorage.getItem("authToken");
        await editCity(cityData.id, values,token); 
        console.log("City updated successfully:", values);
        onCityEdit(values);
        setSnackbarMessage("City updated successfully");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } catch (error) {
        console.error("Error updating city:", error);
        setSnackbarMessage("Error updating city");
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
          Edit the information for the city below.
        </DialogContentText>
        <TextField
          label="City Name"
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
          error={formik.touched.description && Boolean(formik.errors.description)}
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
          sx={{ backgroundColor: snackbarSeverity === "success" ? "green" : "red" }}
        />
      </Snackbar>
    </Grid>
  );
};

export default EditCityForm;
