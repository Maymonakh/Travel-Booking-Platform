import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  DialogContentText,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";

interface CreateHotelFormProps {
  onClose: () => void;
  onHotelCreate: (hotel: any) => void;
}

const validationSchema = yup.object({
  name: yup.string().required("name is required"),
  owner: yup.string().required("owner is required"),
  roomNumber: yup.string().required("Room Number is required"),
  starRate: yup
    .number()
    .required("Rating is required")
    .positive("Rating must be positive")
    .integer("Rating must be an integer"),
  city: yup.string().required("City name is required"),
});

const CreateHotelForm: React.FC<CreateHotelFormProps> =  ({
  onClose,
  onHotelCreate,
}) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      owner: "",
      roomNumber:null,
      starRate: null,
      city:"",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      console.log("Form submitted", values);
      setSubmitting(false);
      resetForm();
      onClose();
      onHotelCreate(values);
    },
  });

  return (
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
        label="city"
        variant="outlined"
        fullWidth
        margin="normal"
        {...formik.getFieldProps("city")}
        error={formik.touched.city && Boolean(formik.errors.city)}
        helperText={formik.touched.city && formik.errors.city}
      />
      <TextField
        label="Owner"
        variant="outlined"
        fullWidth
        margin="normal"
        {...formik.getFieldProps("owner")}
        error={formik.touched.owner && Boolean(formik.errors.owner)}
        helperText={formik.touched.owner && formik.errors.owner}
      />
      <TextField
        label="Number of Rooms"
        variant="outlined"
        fullWidth
        margin="normal"
        {...formik.getFieldProps("roomNumber")}
        error={
          formik.touched.roomNumber && Boolean(formik.errors.roomNumber)
        }
        helperText={
          formik.touched.roomNumber && formik.errors.roomNumber
        }
      />
      <TextField
        label="Star Rate"
        variant="outlined"
        fullWidth
        margin="normal"
        {...formik.getFieldProps("starRate")}
        error={
          formik.touched.starRate && Boolean(formik.errors.starRate)
        }
        helperText={
          formik.touched.starRate && formik.errors.starRate
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

export default CreateHotelForm;
