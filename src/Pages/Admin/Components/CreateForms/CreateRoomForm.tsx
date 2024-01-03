import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  DialogContentText,
  TextField,
  Button,
  CircularProgress,
  MenuItem,
} from "@mui/material";

interface CreateRoomFormProps {
  onClose: () => void;
  onRoomCreate: (room: any) => void;
}

const validationSchema = yup.object({
  city: yup.string().required("City name is required"),
  country: yup.string().required("Country is required"),
  postOffice: yup.string().required("Post Office is required"),
  number: yup
    .number()
    .required("Room Number is required")
    .positive("Room Number must be positive")
    .integer("Room Number must be an integer"),
  availability: yup
    .string()
    .required("Availability is required")
    .oneOf(["yes", "no"]),
  adultCapacity: yup
    .number()
    .required("Adult Capacity is required")
    .positive("Adult Capacity must be positive")
    .integer("Adult Capacity must be an integer"),
  childrenCapacity: yup
    .number()
    .required("Children Capacity is required")
    .positive("Children Capacity must be positive")
    .integer("Children Capacity must be an integer"),
  hotelName: yup.string().required("Hotel Name is required"),
});

const CreateRoomForm: React.FC<CreateRoomFormProps> = ({
  onClose,
  onRoomCreate,
}) => {
  const formik = useFormik({
    initialValues: {
      city: "",
      country: "",
      postOffice: "",
      number: null,
      availability: "yes",
      adultCapacity: null,
      childrenCapacity: null,
      hotelName: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      console.log("Form submitted", values);
      setSubmitting(false);
      resetForm();
      onClose();
      onRoomCreate(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <DialogContentText>
        Fill out the form below to create a new room.
      </DialogContentText>
      <TextField
        label="City Name"
        variant="outlined"
        fullWidth
        margin="normal"
        {...formik.getFieldProps("city")}
        error={formik.touched.city && Boolean(formik.errors.city)}
        helperText={formik.touched.city && formik.errors.city}
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
        label="Room Number"
        variant="outlined"
        fullWidth
        margin="normal"
        {...formik.getFieldProps("number")}
        error={formik.touched.number && Boolean(formik.errors.number)}
        helperText={formik.touched.number && formik.errors.number}
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
        {...formik.getFieldProps("adultCapacity")}
        error={
          formik.touched.adultCapacity && Boolean(formik.errors.adultCapacity)
        }
        helperText={formik.touched.adultCapacity && formik.errors.adultCapacity}
      />
      <TextField
        label="Children Capacity"
        variant="outlined"
        fullWidth
        margin="normal"
        {...formik.getFieldProps("childrenCapacity")}
        error={
          formik.touched.childrenCapacity &&
          Boolean(formik.errors.childrenCapacity)
        }
        helperText={
          formik.touched.childrenCapacity && formik.errors.childrenCapacity
        }
      />
      <TextField
        label="Hotel Name"
        variant="outlined"
        fullWidth
        margin="normal"
        {...formik.getFieldProps("hotelName")}
        error={formik.touched.hotelName && Boolean(formik.errors.hotelName)}
        helperText={formik.touched.hotelName && formik.errors.hotelName}
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

export default CreateRoomForm;
