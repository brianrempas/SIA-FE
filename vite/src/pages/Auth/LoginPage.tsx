import React, { useEffect } from "react";

import {
  Button,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// third party
import * as Yup from "yup";
import { Formik } from "formik";
import AuthWrapper from "./AuthWrapper";
import { useNavigate } from "react-router-dom";
import { setSnackbar } from "../../reducers/snackbar";
import { useAppDispatch } from "../../reducers/hooks";
import { setCredentials } from "../../reducers/authSlice";
import { useLoginUserMutation } from "../../services/AuthService";
import { Global, css } from "@emotion/react";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loginUser, { data, isSuccess, isError, error, isLoading }] =
    useLoginUserMutation();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        setSnackbar({
          open: true,
          message: "login successfully",
          alertColor: "success",
        })
      );
      console.log(data)
      dispatch(
        setCredentials({
          token: data?.token as string,
          username: data?.username as string,
          role: data?.role as string,
          mixId: data?.mixId as number
        })
      );
      navigate("/");
    }
    if (isError) {
      dispatch(
        setSnackbar({
          open: true,
          message: "Login Failed",
          alertColor: "error",
        })
      );
    }
  }, [isSuccess, isError]);

  return (
    <>
    <Global
        styles={css`
          body {
            margin: 0;
            padding: 0;
          }
        `}
      />
    <div style={{background:"rgba(98, 0, 192, 1)", width: '100vw', height: '100vh'}}>
      <AuthWrapper>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={Yup.object().shape({
            username: Yup.string().max(255).required("username is required"),
            password: Yup.string().max(255).required("Password is required"),
          })}
          onSubmit={async (values) => {
            loginUser(values);
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
          }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Typography variant="h4" noWrap component="div" sx={{ textAlign: 'center', mb: 4 }}>
                Sistem Informasi Akademik
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <OutlinedInput
                      size="small"
                      id="username"
                      type="text"
                      value={values.username}
                      name="username"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter username address"
                      fullWidth
                      error={Boolean(touched.username && errors.username)}
                    />
                    {touched.username && errors.username && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-username-login"
                      >
                        {errors.username}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="password-login">Password</InputLabel>
                    <OutlinedInput
                      size="small"
                      fullWidth
                      error={Boolean(touched.password && errors.password)}
                      id="-password-login"
                      type={showPassword ? "text" : "password"}
                      value={values.password}
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="large"
                          >
                            {showPassword ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      placeholder="Enter password"
                    />
                    {touched.password && errors.password && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-password-login"
                      >
                        {errors.password}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </AuthWrapper>
    </div>
    </>
  );
};

export default LoginPage;
