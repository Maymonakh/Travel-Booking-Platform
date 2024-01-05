import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  DialogContentText,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";

interface EditHotelFormProps {
    onClose: () => void;
    onHotelEdit: (editedHotel: any) => void;
    hotelData: any;
  }

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  owner: yup.string().required("Owner is required"),
  roomNumber: yup.number().required("Room Number is required").positive("Room Number must be positive").integer("Room Number must be an integer"),
  starRate: yup
    .number()
    .required("Rating is required")
    .positive("Rating must be positive")
    .integer("Rating must be an integer"),
  city: yup.string().required("City name is required"),
});

const EditHotelForm: React.FC<EditHotelFormProps> = ({
    onClose,
    onHotelEdit,
    hotelData,
  }) => {
  const formik = useFormik({
    initialValues: {
      name: hotelData?.name || "",
      owner: hotelData?.owner || "",
      roomNumber: hotelData?.roomNumber || null,
      starRate: hotelData?.starRate || null,
      city: hotelData?.city || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log("Form submitted", values);
      setSubmitting(false);
      onClose();
      onHotelEdit(values);
    },
  });

  return (
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
        label="City"
        variant="outlined"
        fullWidth
        margin="normal"
        {...formik.getFieldProps("city")}
        error={formik.touched.city && Boolean(formik.errors.city)}
      />
      <TextField
        label="Owner"
        variant="outlined"
        fullWidth
        margin="normal"
        {...formik.getFieldProps("owner")}
        error={formik.touched.owner && Boolean(formik.errors.owner)}
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
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={formik.isSubmitting}
        sx={{ marginRight: 2 }}
      >
        {formik.isSubmitting ? <CircularProgress size={24} /> : "Save Changes"}
      </Button>
      <Button variant="outlined" color="primary" onClick={onClose}>
        Cancel
      </Button>
    </form>
  );
};

export default EditHotelForm;
