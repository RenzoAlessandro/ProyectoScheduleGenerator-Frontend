import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import ListItemText from '@mui/material/ListItemText';
// third-party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project-imports
import useAuth from '../../../hooks/useAuth';
import useScriptRef from '../../../hooks/useScriptRef';
import IconButton from '../../../components/@extended/IconButton';
import AnimateButton from '../../../components/@extended/AnimateButton';

import { openSnackbar } from '../../../api/snackbar';
import { strengthColor, strengthIndicator } from '../../../utils/password-strength';

// assets
import { Eye, EyeSlash } from 'iconsax-react';

const allCategorys = [
  { value: 1, label: 'Admin' },
  { value: 2, label: 'Bibliotecario' },
  { value: 3, label: 'Tutor' }
];

const allGender = [
  { value: 'M', label: 'Masculino' },
  { value: 'F', label: 'Femenino' }
];

// ============================|| JWT - REGISTER ||============================ //

export default function AuthRegister() {
  const { register } = useAuth();
  const scriptedRef = useScriptRef();
  const navigate = useNavigate();

  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          firstname: '',
          lastname: '',
          email: '',
          category: '',
          gender: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          firstname: Yup.string().max(255).required('El nombre es obligatorio'),
          lastname: Yup.string().max(255).required('El apellido es obligatorio'),
          category: Yup.number()
            .required('El cargo es obligatorio')
            .min(2, 'Debe ser mayor o igual a 2 página')
            .max(3, 'Debe ser menor o igual a 3 página'),
          gender: Yup.string().max(15).required('El género es obligatorio'),
          email: Yup.string().email('Debe ser un correo electrónico válido').max(255).required('Se requiere correo electrónico'),
          password: Yup.string().max(255).required('Se requiere contraseña')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          console.log(values.firstname, values.lastname, values.category, values.gender, values.email, values.password);
          try {
            await register(values.firstname, values.lastname, values.email, values.password, values.category, values.gender);
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
              openSnackbar({
                open: true,
                message: 'Su registro se ha completado con éxito.',
                variant: 'alert',

                alert: {
                  color: 'success'
                }
              });

              setTimeout(() => {
                navigate('/auth/login', { replace: true });
              }, 1500);
            }
          } catch (error) {
            console.error(error);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: error.error });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="firstname-signup">Nombres*</InputLabel>
                  <OutlinedInput
                    id="firstname-signup"
                    type="firstname"
                    value={values.firstname}
                    name="firstname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="John"
                    fullWidth
                    error={Boolean(touched.firstname && errors.firstname)}
                  />
                </Stack>
                {touched.firstname && errors.firstname && (
                  <FormHelperText error id="helper-text-firstname-signup">
                    {errors.firstname}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="lastname-signup">Apellidos*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.lastname && errors.lastname)}
                    id="lastname-signup"
                    type="lastname"
                    value={values.lastname}
                    name="lastname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Doe"
                    inputProps={{}}
                  />
                </Stack>
                {touched.lastname && errors.lastname && (
                  <FormHelperText error id="helper-text-lastname-signup">
                    {errors.lastname}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="category-signup">Cargo</InputLabel>
                  <FormControl fullWidth>
                    <Select
                      id="category-signup"
                      name="category"
                      displayEmpty
                      value={values.category}
                      onChange={handleChange}
                      input={<OutlinedInput id="select-column-category-signup" placeholder="Sort by" />}
                      renderValue={(selected) => {
                        if (!selected) {
                          return <Typography variant="subtitle2">Selecciona Cargo</Typography>;
                        }

                        const selectedStatus = allCategorys.filter((item) => item.value === Number(selected));
                        return (
                          <Typography variant="subtitle2">{selectedStatus.length > 0 ? selectedStatus[0].label : 'Pending'}</Typography>
                        );
                      }}
                    >
                      {allCategorys.map((column) => (
                        <MenuItem key={column.value} value={column.value}>
                          <ListItemText primary={column.label} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {touched.category && errors.category && (
                    <FormHelperText error id="standard-weight-helper-text-category-signup-login" sx={{ pl: 1.75 }}>
                      {errors.category}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="gender-signup">Género</InputLabel>
                  <FormControl fullWidth>
                    <Select
                      id="gender-signup"
                      name="gender"
                      displayEmpty
                      value={values.gender}
                      onChange={handleChange}
                      input={<OutlinedInput id="select-column-gender-signup" placeholder="Sort by" />}
                      renderValue={(selected) => {
                        if (!selected) {
                          return <Typography variant="subtitle2">Selecciona Género</Typography>;
                        }

                        const selectedStatus = allGender.filter((item) => item.value === selected);
                        return (
                          <Typography variant="subtitle2">{selectedStatus.length > 0 ? selectedStatus[0].label : 'Pending'}</Typography>
                        );
                      }}
                    >
                      {allGender.map((column) => (
                        <MenuItem key={column.value} value={column.value}>
                          <ListItemText primary={column.label} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {touched.gender && errors.gender && (
                    <FormHelperText error id="standard-weight-helper-text-gender-signup-login" sx={{ pl: 1.75 }}>
                      {errors.gender}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              {/* <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="category-signup">Categoría*</InputLabel>
                  <OutlinedInput
                    type="number"
                    fullWidth
                    error={Boolean(touched.category && errors.category)}
                    id="category-signup"
                    value={values.category}
                    name="category"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="2"
                    inputProps={{}}
                  />
                </Stack>
                {touched.category && errors.category && (
                  <FormHelperText error id="helper-text-category-signup">
                    {errors.category}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="gender-signup">Genero*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.lastname && errors.lastname)}
                    id="gender-signup"
                    type="gender"
                    value={values.gender}
                    name="gender"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="M"
                    inputProps={{}}
                  />
                </Stack>
                {touched.gender && errors.gender && (
                  <FormHelperText error id="helper-text-lastname-signup">
                    {errors.gender}
                  </FormHelperText>
                )}
              </Grid> */}
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-signup">Correo electrónico*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email-signup"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="demo@cedhinuevaarequipa.edu.pe"
                    inputProps={{}}
                  />
                </Stack>
                {touched.email && errors.email && (
                  <FormHelperText error id="helper-text-email-signup">
                    {errors.email}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-signup">Contraseña</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-signup"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <Eye /> : <EyeSlash />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="******"
                    inputProps={{}}
                  />
                </Stack>
                {touched.password && errors.password && (
                  <FormHelperText error id="helper-text-password-signup">
                    {errors.password}
                  </FormHelperText>
                )}
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Crear Cuenta
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}
