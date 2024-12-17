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
import { MobileTimePicker } from '@mui/x-date-pickers';

// third party
import _ from 'lodash';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

// project imports
import AlertClassSessionDelete from './AlertClassSessionDelete';
import IconButton from '../../components/@extended/IconButton';
import CircularWithPath from '../../components/@extended/progress/CircularWithPath';

import { openSnackbar } from '../../api/snackbar';

// assets
import { Trash, CloseCircle } from 'iconsax-react';

// CONSTANT
const getInitialValues = (classSession) => {
  const newClassSession = {
    unidadDidactica: '',
    formatoAula: '',
    aula: '',
    tipoAula: '',
    docente: '',
    dia: '',
    start: '',
    end: ''
  };

  if (classSession) {
    return _.merge({}, newClassSession, classSession);
  }

  return newClassSession;
};

const allCourses = [
  { value: 'Administración Financiera', label: 'Administración Financiera' },
  { value: 'Comportamiento Organizacional', label: 'Comportamiento Organizacional' },
  { value: 'Marketing Estratégico', label: 'Marketing Estratégico' },
  { value: 'Gestión de Recursos Humanos', label: 'Gestión de Recursos Humanos' },
  { value: 'Negociación Empresarial', label: 'Negociación Empresarial' },
  { value: 'Planeamiento Estratégico', label: 'Planeamiento Estratégico' },
  { value: 'Gestión de Operaciones', label: 'Gestión de Operaciones' },
  { value: 'Economía Empresarial', label: 'Economía Empresarial' },
  { value: 'Dirección de Empresas', label: 'Dirección de Empresas' },
  { value: 'Gestión de la Innovación', label: 'Gestión de la Innovación' },
  { value: 'Cocina Internacional', label: 'Cocina Internacional' },
  { value: 'Pastelería Avanzada', label: 'Pastelería Avanzada' },
  { value: 'Cocina Molecular', label: 'Cocina Molecular' },
  { value: 'Finanzas Corporativas', label: 'Finanzas Corporativas' },
  { value: 'Enología', label: 'Enología' },
  { value: 'Planificación Estratégica', label: 'Planificación Estratégica' }
];

const allTypeLocal = [
  { value: 'aula', label: 'Aula' },
  { value: 'auditorio', label: 'Auditorio' },
  { value: 'laboratorio', label: 'Laboratorio' },
  { value: 'biblioteca', label: 'Biblioteca' }
];

const allClass = [
  { value: 'Aul-001', label: 'Aul-001' },
  { value: 'Aul-002', label: 'Aul-002' },
  { value: 'Aul-003', label: 'Aul-003' },
  { value: 'Aul-004', label: 'Aul-004' },
  { value: 'Aul-005', label: 'Aul-005' },
  { value: 'Aul-006', label: 'Aul-006' },
  { value: 'Aul-007', label: 'Aul-007' },
  { value: 'Aul-008', label: 'Aul-008' },
  { value: 'Audi-001', label: 'Audi-001' },
  { value: 'Audi-002', label: 'Audi-002' },
  { value: 'Audi-003', label: 'Audi-003' },
  { value: 'Audi-004', label: 'Audi-004' },
  { value: 'Cocina-001', label: 'Cocina-001' },
  { value: 'Cocina-003', label: 'Cocina-003' },
  { value: 'Cocina-004', label: 'Cocina-004' },
  { value: 'Laboratorio-002', label: 'Laboratorio-002' }
];

const allTypeClass = [
  { value: 'teorico', label: 'Teórico' },
  { value: 'practico', label: 'Práctico' }
];

const allProfessor = [
  { value: 'Barney Thea', label: 'Barney Thea' },
  { value: 'Alice Smith', label: 'Alice Smith' },
  { value: 'Linda Garcia', label: 'Linda Garcia' },
  { value: 'Thomas Keller', label: 'Thomas Keller' },
  { value: 'Margaret Johnson', label: 'Margaret Johnson' },
  { value: 'Pierre Hermé', label: 'Pierre Hermé' },
  { value: 'Robert Walker', label: 'Robert Walker' },
  { value: 'Heston Blumenthal', label: 'Heston Blumenthal' },
  { value: 'Jane Doe', label: 'Jane Doe' },
  { value: 'George Michaels', label: 'George Michaels' }
];

const allDays = [
  { value: 'Lunes', label: 'Lunes' },
  { value: 'Martes', label: 'Martes' },
  { value: 'Miércoles', label: 'Miercoles' },
  { value: 'Jueves', label: 'Jueves' },
  { value: 'Viernes', label: 'Viernes' },
  { value: 'Sábado', label: 'Sabado' },
  { value: 'Domingo', label: 'Domingo' }
];

// ==============================|| CLASS SESSION UNIT ADD / EDIT - FORM ||============================== //

export default function FormClassSessionAdd({ classSession, closeModal }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const ClassSessionSchema = Yup.object().shape({
    unidadDidactica: Yup.string().max(255).required('La unidad es obligatorio'),
    formatoAula: Yup.string().max(255).required('El formato es obligatorio'),
    aula: Yup.string().max(255).required('El aula es obligatorio'),
    tipoAula: Yup.string().max(255).required('El tipo de aula es obligatorio'),
    docente: Yup.string().max(255).required('El docente es obligatorio'),
    dia: Yup.string().max(255).required('El día es obligatorio'),
    start: Yup.date().required('La hora de inicio es obligatorio'),
    end: Yup.date().required('La hora de fin es obligatorio'),
  });

  const [openAlert, setOpenAlert] = useState(false);

  const handleAlertClose = () => {
    setOpenAlert(!openAlert);
    closeModal();
  };

  const formik = useFormik({
    initialValues: getInitialValues(classSession),
    validationSchema: ClassSessionSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        let newClassSession = values;
        if (classSession) {
          console.log(newClassSession);
          // updateClassSession(newClassSession.id, newClassSession).then(() => {
          //   openSnackbar({
          //     open: true,
          //     message: 'ClassSession update successfully.',
          //     variant: 'alert',

          //     alert: {
          //       color: 'success'
          //     }
          //   });
          //   setSubmitting(false);
          //   closeModal();
          // });
        } else {
          console.log(newClassSession);
          // await insertClassSession(newClassSession).then(() => {
          //   openSnackbar({
          //     open: true,
          //     message: 'ClassSession added successfully.',
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

  const { values, errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

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
            <DialogTitle>{classSession ? 'Editar Sesión Académica' : 'Nueva Sesión Académica'}</DialogTitle>
            <Divider />
            <DialogContent sx={{ p: 2.5 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="classSession-unidadDidactica">Unidad Didáctica</InputLabel>
                        <FormControl fullWidth>
                          <Select
                            id="column-hiding-unidadDidactica"
                            displayEmpty
                            {...getFieldProps('unidadDidactica')}
                            onChange={(event) => setFieldValue('unidadDidactica', event.target.value)}
                            input={<OutlinedInput id="select-column-hiding-unidadDidactica" placeholder="Sort by" />}
                            renderValue={(selected) => {
                              if (!selected) {
                                return <Typography variant="subtitle2">Seleccionar unidad didáctica</Typography>;
                              }

                              const selectedUnidadDidactica = allCourses.filter((item) => item.value === selected);
                              return (
                                <Typography variant="subtitle2">
                                  {selectedUnidadDidactica.length > 0 ? selectedUnidadDidactica[0].label : 'Pendiente'}
                                </Typography>
                              );
                            }}
                          >
                            {allCourses.map((column) => (
                              <MenuItem key={column.value} value={column.value}>
                                <ListItemText primary={column.label} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {touched.unidadDidactica && errors.unidadDidactica && (
                          <FormHelperText error id="standard-weight-helper-text-email-login-unidadDidactica" sx={{ pl: 1.75 }}>
                            {errors.unidadDidactica}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="classSession-formatoAula">Tipo de Aula</InputLabel>
                        <FormControl fullWidth>
                          <Select
                            id="column-hiding-formatoAula"
                            displayEmpty
                            {...getFieldProps('formatoAula')}
                            onChange={(event) => setFieldValue('formatoAula', event.target.value)}
                            input={<OutlinedInput id="select-column-hiding-formatoAula" placeholder="Sort by" />}
                            renderValue={(selected) => {
                              if (!selected) {
                                return <Typography variant="subtitle2">Seleccionar tipo de aula</Typography>;
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
                        <InputLabel htmlFor="classSession-aula">Aula</InputLabel>
                        <FormControl fullWidth>
                          <Select
                            id="column-hiding-aula"
                            displayEmpty
                            {...getFieldProps('aula')}
                            onChange={(event) => setFieldValue('aula', event.target.value)}
                            input={<OutlinedInput id="select-column-hiding-Aula" placeholder="Sort by" />}
                            renderValue={(selected) => {
                              if (!selected) {
                                return <Typography variant="subtitle2">Seleccionar aula</Typography>;
                              }

                              const selectedAula = allClass.filter((item) => item.value === selected);
                              return (
                                <Typography variant="subtitle2">{selectedAula.length > 0 ? selectedAula[0].label : 'Pendiente'}</Typography>
                              );
                            }}
                          >
                            {allClass.map((column) => (
                              <MenuItem key={column.value} value={column.value}>
                                <ListItemText primary={column.label} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {touched.aula && errors.aula && (
                          <FormHelperText error id="standard-weight-helper-text-email-login-aula" sx={{ pl: 1.75 }}>
                            {errors.aula}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="classSession-tipoAula">Tipo de Clase</InputLabel>
                        <FormControl fullWidth>
                          <Select
                            id="column-hiding-tipoAula"
                            displayEmpty
                            {...getFieldProps('tipoAula')}
                            onChange={(event) => setFieldValue('tipoAula', event.target.value)}
                            input={<OutlinedInput id="select-column-hiding-tipoAula" placeholder="Sort by" />}
                            renderValue={(selected) => {
                              if (!selected) {
                                return <Typography variant="subtitle2">Seleccionar tipo de clase</Typography>;
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
                        <InputLabel htmlFor="classSession-docente">Docente</InputLabel>
                        <FormControl fullWidth>
                          <Select
                            id="column-hiding-docente"
                            displayEmpty
                            {...getFieldProps('docente')}
                            onChange={(event) => setFieldValue('docente', event.target.value)}
                            input={<OutlinedInput id="select-column-hiding-docente" placeholder="Sort by" />}
                            renderValue={(selected) => {
                              if (!selected) {
                                return <Typography variant="subtitle2">Seleccionar docente</Typography>;
                              }

                              const selectedDocente = allProfessor.filter((item) => item.value === selected);
                              return (
                                <Typography variant="subtitle2">
                                  {selectedDocente.length > 0 ? selectedDocente[0].label : 'Pendiente'}
                                </Typography>
                              );
                            }}
                          >
                            {allProfessor.map((column) => (
                              <MenuItem key={column.value} value={column.value}>
                                <ListItemText primary={column.label} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {touched.docente && errors.docente && (
                          <FormHelperText error id="standard-weight-helper-text-email-login-docente" sx={{ pl: 1.75 }}>
                            {errors.docente}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="classSession-dia">Día</InputLabel>
                        <FormControl fullWidth>
                          <Select
                            id="column-hiding-dia"
                            displayEmpty
                            {...getFieldProps('dia')}
                            onChange={(event) => setFieldValue('dia', event.target.value)}
                            input={<OutlinedInput id="select-column-hiding-dia" placeholder="Sort by" />}
                            renderValue={(selected) => {
                              if (!selected) {
                                return <Typography variant="subtitle2">Seleccionar dia</Typography>;
                              }

                              const selectedDia = allDays.filter((item) => item.value === selected);
                              return (
                                <Typography variant="subtitle2">{selectedDia.length > 0 ? selectedDia[0].label : 'Pendiente'}</Typography>
                              );
                            }}
                          >
                            {allDays.map((column) => (
                              <MenuItem key={column.value} value={column.value}>
                                <ListItemText primary={column.label} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {touched.dia && errors.dia && (
                          <FormHelperText error id="standard-weight-helper-text-email-login-dia" sx={{ pl: 1.75 }}>
                            {errors.dia}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel>Inicio</InputLabel>
                        <MobileTimePicker
                          ampm={false}
                          openTo="hours"
                          views={['hours', 'minutes']}
                          format="HH:mm"
                          value={new Date(values.start)}
                          onChange={(date) => setFieldValue('start', date)}
                          slotProps={{ textField: { fullWidth: true } }}
                        />
                      </Stack>
                      {touched.start && errors.start && (
                          <FormHelperText error id="standard-weight-helper-text-email-login-start" sx={{ pl: 1.75 }}>
                            {errors.start}
                          </FormHelperText>
                        )}
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel>Fin</InputLabel>
                        <MobileTimePicker
                          ampm={false}
                          openTo="hours"
                          views={['hours', 'minutes']}
                          format="HH:mm"
                          value={new Date(values.end)}
                          onChange={(date) => setFieldValue('end', date)}
                          slotProps={{ textField: { fullWidth: true } }}
                        />
                      </Stack>
                      {touched.end && errors.end && (
                          <FormHelperText error id="standard-weight-helper-text-email-login-end" sx={{ pl: 1.75 }}>
                            {errors.end}
                          </FormHelperText>
                        )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>
            <Divider />
            <DialogActions sx={{ p: 2.5 }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  {classSession && (
                    <Tooltip title="Eliminar Sesión" placement="top">
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
                      {classSession ? 'Editar' : 'Agregar'}
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </DialogActions>
          </Form>
        </LocalizationProvider>
      </FormikProvider>
      {classSession && (
        <AlertClassSessionDelete id={classSession.id} title={classSession.id.toString()} open={openAlert} handleClose={handleAlertClose} />
      )}
    </>
  );
}

FormClassSessionAdd.propTypes = { classSession: PropTypes.any, closeModal: PropTypes.func };
