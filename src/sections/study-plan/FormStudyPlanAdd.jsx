import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material ui
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import ListItemText from '@mui/material/ListItemText';
import DialogContent from '@mui/material/DialogContent';
import OutlinedInput from '@mui/material/OutlinedInput';
import DialogActions from '@mui/material/DialogActions';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third party
import _ from 'lodash';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

// project imports
import AlertStudyPlanDelete from './AlertStudyPlanDelete';
import IconButton from '../../components/@extended/IconButton';
import CircularWithPath from '../../components/@extended/progress/CircularWithPath';

import { openSnackbar } from '../../api/snackbar';

// assets
import { Trash } from 'iconsax-react';

// CONSTANT
const getInitialValues = (curso) => {
  const newCurso = {
    nombreCurso: '',
    carrera: '',
    planEstudio: '',
    semestre: 1,
    creditos: 0,
    tipoCurso: '',
  };

  if (curso) {
    return _.merge({}, newCurso, curso);
  }

  return newCurso;
};

const allCarreras = [
  { value: 'Administracion de Empresas', label: 'Administración de Empresas' },
  { value: 'Gastronomia', label: 'Gastronomia' }
];

const allTypeClass = [
  { value: 'Teorico', label: 'Teórico' },
  { value: 'Practico', label: 'Práctico' }
];

// ==============================|| CURSO ADD / EDIT - FORM ||============================== //

export default function FormStudyPlanAdd({ curso, closeModal }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const CursoSchema = Yup.object().shape({
    nombreCurso: Yup.string().max(255).required('El nombre del curso es obligatorio'),
    carrera:  Yup.string().max(255).required('La carrera es obligatorio'),
    planEstudio: Yup.number().required('El plan es obligatorio'),
    semestre: Yup.number()
    .required('El semestre es obligatorio')
    .min(1, 'Debe ser mayor o igual a 1')
    .max(10, 'Debe ser menor o igual a 10'),
    creditos: Yup.number().required('El crédito es obligatorio'),
    tipoCurso: Yup.string().max(255).required('El tipo de curso es obligatorio'),
  });

  const [openAlert, setOpenAlert] = useState(false);

  const handleAlertClose = () => {
    setOpenAlert(!openAlert);
    closeModal();
  };

  const formik = useFormik({
    initialValues: getInitialValues(curso),
    validationSchema: CursoSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        let newCurso = values;
        
        if (curso) {
          console.log(newCurso);
          // updateCurso(newCurso.id, newCurso).then(() => {
          //   openSnackbar({
          //     open: true,
          //     message: 'Curso update successfully.',
          //     variant: 'alert',

          //     alert: {
          //       color: 'success'
          //     }
          //   });
          //   setSubmitting(false);
          //   closeModal();
          // });
        } else {
          console.log(newCurso);
          // await insertCurso(newCurso).then(() => {
          //   openSnackbar({
          //     open: true,
          //     message: 'Curso added successfully.',
          //     variant: 'alert',

          //     alert: {
          //       color: 'success'
          //     }
          //   });
          //   setSubmitting(false);
          //   closeModal();
          // });
        }
      } catch (error) {
        console.error(error);
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

  if (loading)
    return (
      <Box sx={{ p: 5 }}>
        <Stack direction="row" justifyContent="center">
          <CircularWithPath />
        </Stack>
      </Box>
    );

  return (
    <>
      <FormikProvider value={formik}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <DialogTitle>{curso ? 'Editar curso' : 'Nueva curso'}</DialogTitle>
            <Divider />
            <DialogContent sx={{ p: 2.5 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="curso-nombreCurso">Curso</InputLabel>
                        <TextField
                          fullWidth
                          id="curso-nombreCurso"
                          placeholder="Introduzca el nombre del curso"
                          {...getFieldProps('nombreCurso')}
                          error={Boolean(touched.nombreCurso && errors.nombreCurso)}
                          helperText={touched.nombreCurso && errors.nombreCurso}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="curso-carrera">Carrera</InputLabel>
                        <FormControl fullWidth>
                          <Select
                            id="column-hiding"
                            displayEmpty
                            {...getFieldProps('carrera')}
                            onChange={(event) => setFieldValue('carrera', event.target.value)}
                            input={<OutlinedInput id="select-column-hiding-carrera" placeholder="Sort by" />}
                            renderValue={(selected) => {
                              if (!selected) {
                                return <Typography variant="subtitle2">Seleccione carrera</Typography>;
                              }

                              const selectedcategoria = allCarreras.filter((item) => item.value === selected);
                              return (
                                <Typography variant="subtitle2">
                                  {selectedcategoria.length > 0 ? selectedcategoria[0].label : 'Pendiente'}
                                </Typography>
                              );
                            }}
                          >
                            {allCarreras.map((column) => (
                              <MenuItem key={column.value} value={column.value}>
                                <ListItemText primary={column.label} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {touched.carrera && errors.carrera && (
                          <FormHelperText error id="standard-weight-helper-text-email-login-carrera" sx={{ pl: 1.75 }}>
                            {errors.carrera}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>


                    <Grid item xs={12} sm={4}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="curso-planEstudio">Plan de Estudios</InputLabel>
                        <TextField
                          type="number"
                          fullWidth
                          id="curso-planEstudio"
                          placeholder="Introducir el aforo"
                          {...getFieldProps('planEstudio')}
                          error={Boolean(touched.planEstudio && errors.planEstudio)}
                          helperText={touched.planEstudio && errors.planEstudio}
                        />
                      </Stack>
                    </Grid>


                    <Grid item xs={12} sm={4}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="curso-semestre">Semestre</InputLabel>
                        <TextField
                          type="number"
                          fullWidth
                          id="curso-semestre"
                          placeholder="Introducir el aforo"
                          {...getFieldProps('semestre')}
                          error={Boolean(touched.semestre && errors.semestre)}
                          helperText={touched.semestre && errors.semestre}
                        />
                      </Stack>
                    </Grid>


                    <Grid item xs={12} sm={4}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="curso-creditos">Créditos</InputLabel>
                        <TextField
                          type="number"
                          fullWidth
                          id="curso-creditos"
                          placeholder="Introducir los creditos"
                          {...getFieldProps('creditos')}
                          error={Boolean(touched.creditos && errors.creditos)}
                          helperText={touched.creditos && errors.creditos}
                        />
                      </Stack>
                    </Grid>



                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="curso-tipoCurso">Tipo de Curso</InputLabel>
                        <FormControl fullWidth>
                          <Select
                            id="column-hiding-tipoCurso"
                            displayEmpty
                            {...getFieldProps('tipoCurso')}
                            onChange={(event) => setFieldValue('tipoCurso', event.target.value)}
                            input={<OutlinedInput id="select-column-hiding-tipoCurso" placeholder="Sort by" />}
                            renderValue={(selected) => {
                              if (!selected) {
                                return <Typography variant="subtitle2">Seleccione tipo de curso</Typography>;
                              }

                              const selectedcategoria = allTypeClass.filter((item) => item.value === selected);
                              return (
                                <Typography variant="subtitle2">
                                  {selectedcategoria.length > 0 ? selectedcategoria[0].label : 'Pendiente'}
                                </Typography>
                              );
                            }}
                          >
                            {allTypeClass.map((column) => (
                              <MenuItem key={column.value} value={column.value}>
                                <ListItemText primary={column.label} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {touched.tipoCurso && errors.tipoCurso && (
                          <FormHelperText error id="standard-weight-helper-text-email-login-tipoCurso" sx={{ pl: 1.75 }}>
                            {errors.tipoCurso}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>




                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>
            <Divider />
            <DialogActions sx={{ p: 2.5 }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  {curso && (
                    <Tooltip title="Eliminar Docente" placement="top">
                      <IconButton onClick={() => setOpenAlert(true)} size="large" color="error">
                        <Trash variant="Bold" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Grid>
                <Grid item>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Button color="error" onClick={closeModal}>
                      Cancelar
                    </Button>
                    <Button type="submit" variant="contained" disabled={isSubmitting}>
                      {curso ? 'Editar' : 'Agregar'}
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </DialogActions>
          </Form>
        </LocalizationProvider>
      </FormikProvider>
      {curso && <AlertStudyPlanDelete id={curso.id} cursoId={curso.id.toString()} open={openAlert} handleClose={handleAlertClose} />}
    </>
  );
}

FormStudyPlanAdd.propTypes = { curso: PropTypes.any, closeModal: PropTypes.func };
