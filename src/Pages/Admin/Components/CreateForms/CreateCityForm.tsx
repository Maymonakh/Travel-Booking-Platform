import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import {
  DialogContentText,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  SnackbarContent,
  Grid,
} from "@mui/material";
import { addCity } from "../../../../API/Admin";

interface CreateCityFormProps {
  onClose: () => void;
  onCityCreate: (city: any) => void;
}

const validationSchema = yup.object({
  name: yup.string().required("City name is required"),
  description: yup.string(),
});

const CreateCityForm: React.FC<CreateCityFormProps> = ({
  onClose,
  onCityCreate,
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await addCity(values, token);
        console.log("City created successfully:", response.data);
        onCityCreate(response.data);
        setSnackbarMessage("City created successfully");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } catch (error) {
        console.error("Error creating city:", error);
        setSnackbarMessage("Error creating city");
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
          Fill out the form below to create a new city.
        </DialogContentText>
        <TextField
          label="City Name"
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

export default CreateCityForm;
