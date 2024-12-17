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
import AlertInfraestructureDelete from './AlertInfraestructureDelete';
import IconButton from '../../components/@extended/IconButton';
import CircularWithPath from '../../components/@extended/progress/CircularWithPath';

import { openSnackbar } from '../../api/snackbar';

// assets
import { Trash } from 'iconsax-react';

// CONSTANT
const getInitialValues = (aula) => {
  const newAula = {
    tipoAula: '',
    aula: '',
    localcampus: 'Principal',
    aforo: 10,
    formatoAula: 'Teorico',
  };

  if (aula) {
    return _.merge({}, newAula, aula);
  }

  return newAula;
};

const allTypeLocal = [
  { value: 'Aula', label: 'Aula' },
  { value: 'Auditorio', label: 'Auditorio' },
  { value: 'Laboratorio', label: 'Laboratorio' },
  { value: 'Biblioteca', label: 'Biblioteca' }
];

const allCampus = [
  { value: 'Principal', label: 'Principal' },
  { value: 'Segundo', label: 'Segundo' },
  { value: 'Tercero', label: 'Tercero' }
];

const allTypeClass = [
  { value: 'Teorico', label: 'Teórico' },
  { value: 'Practico', label: 'Práctico' }
];

// ==============================|| AULA ADD / EDIT - FORM ||============================== //

export default function FormInfraestructureAdd({ aula, closeModal }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const AulaSchema = Yup.object().shape({
    tipoAula: Yup.string().max(255).required('El tipo de aula es obligatorio'),
    aula: Yup.string().max(255).required('El aula es obligatorio'),
    localcampus: Yup.string().max(255).required('El local es obligatorio'),
    aforo: Yup.number().required('El aforo es obligatorio'),
    formatoAula: Yup.string().max(255).required('El formato es obligatorio'),
  });

  const [openAlert, setOpenAlert] = useState(false);

  const handleAlertClose = () => {
    setOpenAlert(!openAlert);
    closeModal();
  };

  const formik = useFormik({
    initialValues: getInitialValues(aula),
    validationSchema: AulaSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        let newAula = values;
        if (aula) {
          console.log(newAula);
          // updateAula(newAula.id, newAula).then(() => {
          //   openSnackbar({
          //     open: true,
          //     message: 'Aula update successfully.',
          //     variant: 'alert',

          //     alert: {
          //       color: 'success'
          //     }
          //   });
          //   setSubmitting(false);
          //   closeModal();
          // });
        } else {
          console.log(newAula);
          // await insertAula(newAula).then(() => {
          //   openSnackbar({
          //     open: true,
          //     message: 'Aula added successfully.',
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
            <DialogTitle>{aula ? 'Editar Aula' : 'Nueva Aula'}</DialogTitle>
            <Divider />
            <DialogContent sx={{ p: 2.5 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="aula-tipoAula">Tipo de Aula</InputLabel>
                        <FormControl fullWidth>
                          <Select
                            id="column-hiding-tipoAula"
                            displayEmpty
                            {...getFieldProps('tipoAula')}
                            onChange={(event) => setFieldValue('tipoAula', event.target.value)}
                            input={<OutlinedInput id="select-column-hiding-tipoAula" placeholder="Sort by" />}
                            renderValue={(selected) => {
                              if (!selected) {
                                return <Typography variant="subtitle2">Seleccionar tipo de aula</Typography>;
                              }

                              const selectedTipoAula = allTypeLocal.filter((item) => item.value === selected);
                              return (
                                <Typography variant="subtitle2">
                                  {selectedTipoAula.length > 0 ? selectedTipoAula[0].label : 'Pendiente'}
                                </Typography>
                              );
                            }}
                          >
                            {allTypeLocal.map((column) => (
                              <MenuItem key={column.value} value={column.value}>
                                <ListItemText primary={column.label} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {touched.tipoAula && errors.tipoAula && (
                          <FormHelperText error id="standard-weight-helper-text-email-login-tipoAula" sx={{ pl: 1.75 }}>
                            {errors.tipoAula}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="aula-aula">Aula</InputLabel>
                        <TextField
                          fullWidth
                          id="aula-aula"
                          placeholder="Introduzca el nombre del aula"
                          {...getFieldProps('aula')}
                          error={Boolean(touched.aula && errors.aula)}
                          helperText={touched.aula && errors.aula}
                        />
                      </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="aula-localcampus">Local</InputLabel>
                        <FormControl fullWidth>
                          <Select
                            id="column-hiding-localcampus"
                            displayEmpty
                            {...getFieldProps('localcampus')}
                            onChange={(event) => setFieldValue('localcampus', event.target.value)}
                            input={<OutlinedInput id="select-column-hiding-localcampus" placeholder="Sort by" />}
                            renderValue={(selected) => {
                              if (!selected) {
                                return <Typography variant="subtitle2">Seleccionar local</Typography>;
                              }

                              const selectedLocalcampus = allCampus.filter((item) => item.value === selected);
                              return (
                                <Typography variant="subtitle2">
                                  {selectedLocalcampus.length > 0 ? selectedLocalcampus[0].label : 'Pendiente'}
                                </Typography>
                              );
                            }}
                          >
                            {allCampus.map((column) => (
                              <MenuItem key={column.value} value={column.value}>
                                <ListItemText primary={column.label} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {touched.localcampus && errors.localcampus && (
                          <FormHelperText error id="standard-weight-helper-text-email-login-localcampus" sx={{ pl: 1.75 }}>
                            {errors.localcampus}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="aula-formatoAula">Formato de Aula</InputLabel>
                        <FormControl fullWidth>
                          <Select
                            id="column-hiding-formatoAula"
                            displayEmpty
                            {...getFieldProps('formatoAula')}
                            onChange={(event) => setFieldValue('formatoAula', event.target.value)}
                            input={<OutlinedInput id="select-column-hiding-formatoAula" placeholder="Sort by" />}
                            renderValue={(selected) => {
                              if (!selected) {
                                return <Typography variant="subtitle2">Seleccionar formato de aula</Typography>;
                              }

                              const selectedFormatoAula = allTypeClass.filter((item) => item.value === selected);
                              return (
                                <Typography variant="subtitle2">
                                  {selectedFormatoAula.length > 0 ? selectedFormatoAula[0].label : 'Pendiente'}
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
                        {touched.formatoAula && errors.formatoAula && (
                          <FormHelperText error id="standard-weight-helper-text-email-login-formatoAula" sx={{ pl: 1.75 }}>
                            {errors.formatoAula}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>


                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="aula-aforo">Aforo</InputLabel>
                        <TextField
                          type="number"
                          fullWidth
                          id="aula-aforo"
                          placeholder="Introducir el aforo"
                          {...getFieldProps('aforo')}
                          error={Boolean(touched.aforo && errors.aforo)}
                          helperText={touched.aforo && errors.aforo}
                        />
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
                  {aula && (
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
                      {aula ? 'Editar' : 'Agregar'}
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </DialogActions>
          </Form>
        </LocalizationProvider>
      </FormikProvider>
      {aula && <AlertInfraestructureDelete id={aula.id} title={aula.id.toString()} open={openAlert} handleClose={handleAlertClose} />}
    </>
  );
}

FormInfraestructureAdd.propTypes = { aula: PropTypes.any, closeModal: PropTypes.func };
