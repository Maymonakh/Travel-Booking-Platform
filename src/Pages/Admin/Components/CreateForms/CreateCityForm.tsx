import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  DialogContentText,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";

interface CreateCityFormProps {
  onClose: () => void;
  onCityCreate: (city: any) => void;
}

const validationSchema = yup.object({
  name: yup.string().required("City name is required"),
  country: yup.string().required("Country is required"),
  postOffice: yup.string().required("Post Office is required"),
  numberOfHotels: yup
    .number()
    .required("Number of Hotels is required")
    .positive("Number of Hotels must be positive")
    .integer("Number of Hotels must be an integer"),
});

const CreateCityForm: React.FC<CreateCityFormProps> = ({
  onClose,
  onCityCreate,
}) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      country: "",
      postOffice: "",
      numberOfHotels: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      console.log("Form submitted", values);
      setSubmitting(false);
      resetForm();
      onClose();
      onCityCreate(values);
    },
  });

  return (
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
        label="Country"
        variant="outlined"
        fullWidth
        margin="normal"
        {...formik.getFieldProps("country")}
        error={formik.touched.country && Boolean(formik.errors.country)}
        helperText={formik.touched.country && formik.errors.country}
      />
      <TextField
        label="Post Office"
        variant="outlined"
        fullWidth
        margin="normal"
        {...formik.getFieldProps("postOffice")}
        error={formik.touched.postOffice && Boolean(formik.errors.postOffice)}
        helperText={formik.touched.postOffice && formik.errors.postOffice}
      />
      <TextField
        label="Number of Hotels"
        variant="outlined"
        fullWidth
        margin="normal"
        {...formik.getFieldProps("numberOfHotels")}
        error={
          formik.touched.numberOfHotels && Boolean(formik.errors.numberOfHotels)
        }
        helperText={
          formik.touched.numberOfHotels && formik.errors.numberOfHotels
        }
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
  );
};

export default CreateCityForm;
