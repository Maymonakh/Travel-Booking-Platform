import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  DialogContentText,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";

interface EditCityFormProps {
  onClose: () => void;
  onCityEdit: (editedCity: any) => void;
  cityData: any;
}

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  country: yup.string().required("Country is required"),
  postOffice: yup.string().required("Post Office is required"),
  numberOfHotels: yup
    .number()
    .required("Number of Hotels is required")
    .positive("Number of Hotels must be positive")
    .integer("Number of Hotels must be an integer"),
});

const EditCityForm: React.FC<EditCityFormProps> = ({
  onClose,
  onCityEdit,
  cityData,
}) => {
  const formik = useFormik({
    initialValues: {
      name: cityData?.name || "",
      country: cityData?.country || "",
      postOffice: cityData?.postOffice || "",
      numberOfHotels: cityData?.numberOfHotels || null,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log("Form submitted", values);
      setSubmitting(false);
      onClose();
      onCityEdit(values);
    },
  });

  return (
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
        label="Country"
        variant="outlined"
        fullWidth
        margin="normal"
        {...formik.getFieldProps("country")}
        error={formik.touched.country && Boolean(formik.errors.country)}
      />
      <TextField
        label="Post Office"
        variant="outlined"
        fullWidth
        margin="normal"
        {...formik.getFieldProps("postOffice")}
        error={formik.touched.postOffice && Boolean(formik.errors.postOffice)}
      />
      <TextField
        label="Number of Hotels"
        variant="outlined"
        fullWidth
        margin="normal"
        {...formik.getFieldProps("numberOfHotels")}
        error={
          formik.touched.numberOfHotels &&
          Boolean(formik.errors.numberOfHotels)
        }
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
  );
};

export default EditCityForm;
