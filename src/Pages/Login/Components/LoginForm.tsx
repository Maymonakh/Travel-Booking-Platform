import React, { useState } from "react";
import "./LoginForm.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { LoginRequestProps } from "../../../API/Authentication/types";
import { loginRequest } from "../../../API/Authentication";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor } from "@mui/material/Alert";

const schema = Yup.object().shape({
  userName: Yup.string().required("Username is a required field"),
  password: Yup.string().required("Password is a required field"),
});

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor | undefined>("error"); 

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const showAlert = (message: string, severity: AlertColor) => { 
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSubmit = async (values: LoginRequestProps) => {
    try {
      const response = await loginRequest(values);
      const authToken = response?.data?.authentication;
      const userType = response?.data?.userType;
      localStorage.setItem("authToken", authToken);
      localStorage.setItem("userType", userType);

      if (userType === "Admin") {
        navigate("/Admin");
      } else {
        navigate("/Home");
      }
    } catch (error) {
      console.error("Login failed", error);
      showAlert("Login failed. Please check your credentials.", "error");
    }
  };

  return (
    <>
      <Formik
        validationSchema={schema}
        initialValues={{ userName: "", password: "" }}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <div className="login">
            <div className="form">
              <form noValidate onSubmit={handleSubmit}>
                <span>Login</span>
                <input
                  type="userName"
                  name="userName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.userName}
                  placeholder="Enter username"
                  className="form-control inp_text"
                  id="email"
                />
                <p className="error">
                  {errors.userName && touched.userName && errors.userName}
                </p>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Enter password"
                  className="form-control"
                />
                <p className="error">
                  {errors.password && touched.password && errors.password}
                </p>
                <button type="submit">Login</button>
              </form>
            </div>
          </div>
        )}
      </Formik>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default LoginForm;
