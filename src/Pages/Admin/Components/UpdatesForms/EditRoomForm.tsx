// EditRoomForm.tsx
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  DialogContentText,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";

interface EditRoomFormProps {
  onClose: () => void;
  onRoomEdit: (editedRoom: any) => void;
  roomData: any;
}

const validationSchema = yup.object({
  number: yup.number().required("Room Number is required").positive("Room Number must be positive").integer("Room Number must be an integer"),
  availability: yup.boolean().required("Availability is required"),
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
});

const EditRoomForm: React.FC<EditRoomFormProps> = ({ onClose, onRoomEdit, roomData }) => {
  const formik = useFormik({
    initialValues: {
      number: roomData?.number || null,
      availability: roomData?.availability || false,
      adultCapacity: roomData?.adultCapacity || null,
      childrenCapacity: roomData?.childrenCapacity || null,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log("Form submitted", values);
      setSubmitting(false);
      onClose();
      onRoomEdit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <DialogContentText>
        Edit the information for the room below.
      </DialogContentText>
      <TextField
        label="Room Number"
        variant="outlined"
        fullWidth
        margin="normal"
        {...formik.getFieldProps("number")}
        error={formik.touched.number && Boolean(formik.errors.number)}
      />
      <TextField
        label="Availability"
        variant="outlined"
        fullWidth
        margin="normal"
        {...formik.getFieldProps("availability")}
        error={formik.touched.availability && Boolean(formik.errors.availability)}
      />
      <TextField
        label="Adult Capacity"
        variant="outlined"
        fullWidth
        margin="normal"
        {...formik.getFieldProps("adultCapacity")}
        error={formik.touched.adultCapacity && Boolean(formik.errors.adultCapacity)}
      />
      <TextField
        label="Children Capacity"
        variant="outlined"
        fullWidth
        margin="normal"
        {...formik.getFieldProps("childrenCapacity")}
        error={formik.touched.childrenCapacity && Boolean(formik.errors.childrenCapacity)}
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

export default EditRoomForm;
