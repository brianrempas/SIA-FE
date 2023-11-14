import { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import { useCreateStudentMutation } from "../../services/StudentService";

export default function Form() {
  const [open, setOpen] = useState(false);

  const [createStudent, { isSuccess }] = useCreateStudentMutation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
    }
  }, [isSuccess]);

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Create Student
      </Button>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Create Mahasiswa</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              name: "",
              email: "",
              year_in: "",
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().max(255).required("Name is required"),
              email: Yup.string()
                .max(255)
                .required("Email is required")
                .email(),
              year_in: Yup.string().max(4).required("Year is required"),
            })}
            onSubmit={async (values) => {
              // loginUser(values);
              createStudent(values);
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
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <TextField
                        label="Name"
                        size="small"
                        id="name"
                        type="text"
                        autoComplete="off"
                        value={values.name}
                        name="name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="ex: John"
                        fullWidth
                        error={Boolean(touched.name && errors.name)}
                      />
                      {touched.name && errors.name && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-text-name-login"
                        >
                          {errors.name}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <TextField
                        label="Email"
                        size="small"
                        id="name"
                        type="email"
                        autoComplete="off"
                        value={values.email}
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="ex: john@mail.com"
                        fullWidth
                        error={Boolean(touched.email && errors.email)}
                      />
                      {touched.email && errors.email && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-text-email"
                        >
                          {errors.email}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <TextField
                        label="Year In"
                        size="small"
                        id="name"
                        type="text"
                        autoComplete="off"
                        value={values.year_in}
                        name="year_in"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="ex: 2023"
                        fullWidth
                        error={Boolean(touched.year_in && errors.year_in)}
                      />
                      {touched.year_in && errors.year_in && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-text-year_in"
                        >
                          {errors.year_in}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  {/* <Grid item xs={12}>
                    <Stack spacing={1}>
                      <Select
                        label="Year In"
                        size="small"
                        value={values.year_in}
                        onChange={handleChange}
                      >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                      {touched.year_in && errors.year_in && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-text-year_in"
                        >
                          {errors.year_in}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid> */}
                </Grid>

                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained"
                  >
                    Create
                  </Button>
                </DialogActions>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
}
