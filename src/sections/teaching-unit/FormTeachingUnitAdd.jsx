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
import AlertTeachingUnitDelete from './AlertTeachingUnitDelete';
import IconButton from '../../components/@extended/IconButton';
import CircularWithPath from '../../components/@extended/progress/CircularWithPath';

import { openSnackbar } from '../../api/snackbar';

// assets
import { Trash, CloseCircle} from 'iconsax-react';



// CONSTANT
const getInitialValues = (teachingUnit) => {
  const newTeachingUnit = {
    programaEstudios: '',
    tipoPlanEstudios: 'modular',
    planEstudio: 2014,
    periodoAcademico: 1,
    modalidad: '',
    enfoque: '',
    unidadDidactica: ''
  };

  if (teachingUnit) {
    return _.merge({}, newTeachingUnit, teachingUnit);
  }

  return newTeachingUnit;
};

const allProfessionalCareer = [
  { value: 'Administracion de Empresas', label: 'Administración de Empresas' },
  { value: 'Gastronomia', label: 'Gastronomía' },
];

const allTypeStudyPlan = [
  { value: 'modular', label: 'Modular' },
];

const allStudyplan = [
  { value: 2014, label: 'Plan 2014' },
  { value: 2017, label: 'Plan 2017' },
  { value: 2022, label: 'Plan 2022' },
];

const allMode = [
  { value: 'presencial', label: 'Presencial' },
  { value: 'semi-presencial', label: 'Semi-presencial' }
];

const allFocus = [
  { value: 'presencial', label: 'Presencial' },
  { value: 'virtual', label: 'Virtual' }
];

const allSemesters = [
  { value: 1, label: 'I' },
  { value: 2, label: 'II' },
  { value: 3, label: 'III' },
  { value: 4, label: 'IV' },
  { value: 5, label: 'V' },
  { value: 6, label: 'VI' },
  { value: 7, label: 'VII' },
  { value: 8, label: 'VIII' },
  { value: 9, label: 'IX' },
  { value: 10, label: 'X' }
];

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
  { value: 'Gestión de la Innovación', label: 'Gestión de la Innovación' }
];


// ==============================|| TEACHING UNIT ADD / EDIT - FORM ||============================== //

export default function FormTeachingUnitAdd({ teachingUnit, closeModal }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const TeachingUnitSchema = Yup.object().shape({
    programaEstudios: Yup.string().max(255).required('El programa es obligatorio'),
    tipoPlanEstudios: Yup.string().max(255).required('El tipo de plan es obligatorio'),
    planEstudio: Yup.number().required('El plan es obligatorio'),
    periodoAcademico: Yup.number().required('El periono es obligatorio').min(1, 'Debe ser mayor o igual a 1').max(10, 'Debe ser menor o igual a 10'),
    modalidad: Yup.string().max(255).required('La modalidad es obligatorio'),
    enfoque: Yup.string().max(255).required('El enfoque es obligatorio'),
    unidadDidactica: Yup.string().max(255).required('La unidad es obligatorio'),
  });

  const [openAlert, setOpenAlert] = useState(false);

  const handleAlertClose = () => {
    setOpenAlert(!openAlert);
    closeModal();
  };

  const formik = useFormik({
    initialValues: getInitialValues(teachingUnit),
    validationSchema: TeachingUnitSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        let newTeachingUnit = values;
        if (teachingUnit) {
          console.log(newTeachingUnit)
          // updateTeachingUnit(newTeachingUnit.id, newTeachingUnit).then(() => {
          //   openSnackbar({
          //     open: true,
          //     message: 'TeachingUnit update successfully.',
          //     variant: 'alert',

          //     alert: {
          //       color: 'success'
          //     }
          //   });
          //   setSubmitting(false);
          //   closeModal();
          // });
        } else {
          console.log(newTeachingUnit)
          // await insertTeachingUnit(newTeachingUnit).then(() => {
          //   openSnackbar({
          //     open: true,
          //     message: 'TeachingUnit added successfully.',
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
            <DialogTitle>{teachingUnit ? 'Editar Unidad Didáctica' : 'Nueva Unidad Didáctica'}</DialogTitle>
            <Divider />
            <DialogContent sx={{ p: 2.5 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Grid container spacing={3}>


                  <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="teachingUnit-programaEstudios">Programa de Estudios</InputLabel>
                        <FormControl fullWidth>
                          <Select
                            id="column-hiding-programaEstudios"
                            displayEmpty
                            {...getFieldProps('programaEstudios')}
                            onChange={(event) => setFieldValue('programaEstudios', event.target.value)}
                            input={<OutlinedInput id="select-column-hiding-programaEstudios" placeholder="Sort by" />}
                            renderValue={(selected) => {
                              if (!selected) {
                                return <Typography variant="subtitle2">Seleccionar programa de estudio</Typography>;
                              }

                              const selectedProgramaEstudios = allProfessionalCareer.filter((item) => item.value === selected);
                              return (
                                <Typography variant="subtitle2">
                                  {selectedProgramaEstudios.length > 0 ? selectedProgramaEstudios[0].label : 'Pendiente'}
                                </Typography>
                              );
                            }}
                          >
                            {allProfessionalCareer.map((column) => (
                              <MenuItem key={column.value} value={column.value}>
                                <ListItemText primary={column.label} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {touched.programaEstudios && errors.programaEstudios && (
                          <FormHelperText error id="standard-weight-helper-text-email-login-programaEstudios" sx={{ pl: 1.75 }}>
                            {errors.programaEstudios}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>


                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="teachingUnit-tipoPlanEstudios">Tipo de Plan de Estudios</InputLabel>
                        <FormControl fullWidth>
                          <Select
                            id="column-hiding-tipoPlanEstudios"
                            displayEmpty
                            {...getFieldProps('tipoPlanEstudios')}
                            onChange={(event) => setFieldValue('tipoPlanEstudios', event.target.value)}
                            input={<OutlinedInput id="select-column-hiding-tipoPlanEstudios" placeholder="Sort by" />}
                            renderValue={(selected) => {
                              if (!selected) {
                                return <Typography variant="subtitle1">Seleccionar tipo de plan</Typography>;
                              }

                              const selectedTipoPlanEstudios = allTypeStudyPlan.filter((item) => item.value === selected);
                              return (
                                <Typography variant="subtitle2">
                                  {selectedTipoPlanEstudios.length > 0 ? selectedTipoPlanEstudios[0].label : 'Pendiente'}
                                </Typography>
                              );
                            }}
                          >
                            {allTypeStudyPlan.map((column) => (
                              <MenuItem key={column.value} value={column.value}>
                                <ListItemText primary={column.label} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {touched.tipoPlanEstudios && errors.tipoPlanEstudios && (
                          <FormHelperText error id="standard-weight-helper-text-email-login-tipoPlanEstudios" sx={{ pl: 1.75 }}>
                            {errors.tipoPlanEstudios}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="teachingUnit-planEstudio">Plan de Estudio</InputLabel>
                        <FormControl fullWidth>
                          <Select
                            id="column-hiding-planEstudio"
                            displayEmpty
                            {...getFieldProps('planEstudio')}
                            onChange={(event) => setFieldValue('planEstudio', event.target.value)}
                            input={<OutlinedInput id="select-column-hiding-planEstudio" placeholder="Sort by" />}
                            renderValue={(selected) => {
                              if (!selected) {
                                return <Typography variant="subtitle2">Seleccionar plan</Typography>;
                              }

                              const selectedPlanEstudio = allStudyplan.filter((item) => item.value === Number(selected));
                              return (
                                <Typography variant="subtitle2">
                                  {selectedPlanEstudio.length > 0 ? selectedPlanEstudio[0].label : 'Pendiente'}
                                </Typography>
                              );
                            }}
                          >
                            {allStudyplan.map((column) => (
                              <MenuItem key={column.value} value={column.value}>
                                <ListItemText primary={column.label} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {touched.planEstudio && errors.planEstudio && (
                          <FormHelperText error id="standard-weight-helper-text-email-login-planEstudio" sx={{ pl: 1.75 }}>
                            {errors.planEstudio}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="teachingUnit-periodoAcademico">Semestre</InputLabel>
                        <FormControl fullWidth>
                          <Select
                            id="column-hiding-periodoAcademico"
                            displayEmpty
                            {...getFieldProps('periodoAcademico')}
                            onChange={(event) => setFieldValue('periodoAcademico', event.target.value)}
                            input={<OutlinedInput id="select-column-hiding-periodoAcademico" placeholder="Sort by" />}
                            renderValue={(selected) => {
                              if (!selected) {
                                return <Typography variant="subtitle2">Seleccionar semestre</Typography>;
                              }

                              const selectedPeriodoAcademico = allSemesters.filter((item) => item.value === Number(selected));
                              return (
                                <Typography variant="subtitle2">
                                  {selectedPeriodoAcademico.length > 0 ? selectedPeriodoAcademico[0].label : 'Pendiente'}
                                </Typography>
                              );
                            }}
                          >
                            {allSemesters.map((column) => (
                              <MenuItem key={column.value} value={column.value}>
                                <ListItemText primary={column.label} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {touched.periodoAcademico && errors.periodoAcademico && (
                          <FormHelperText error id="standard-weight-helper-text-email-login-periodoAcademico" sx={{ pl: 1.75 }}>
                            {errors.periodoAcademico}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="teachingUnit-modalidad">Modalidad</InputLabel>
                        <FormControl fullWidth>
                          <Select
                            id="column-hiding-modalidad"
                            displayEmpty
                            {...getFieldProps('modalidad')}
                            onChange={(event) => setFieldValue('modalidad', event.target.value)}
                            input={<OutlinedInput id="select-column-hiding-modalidad" placeholder="Sort by" />}
                            renderValue={(selected) => {
                              if (!selected) {
                                return <Typography variant="subtitle2">Seleccionar modalidad</Typography>;
                              }

                              const selectedModalidad = allMode.filter((item) => item.value === selected);
                              return (
                                <Typography variant="subtitle2">
                                  {selectedModalidad.length > 0 ? selectedModalidad[0].label : 'Pendiente'}
                                </Typography>
                              );
                            }}
                          >
                            {allMode.map((column) => (
                              <MenuItem key={column.value} value={column.value}>
                                <ListItemText primary={column.label} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {touched.modalidad && errors.modalidad && (
                          <FormHelperText error id="standard-weight-helper-text-email-login-modalidad" sx={{ pl: 1.75 }}>
                            {errors.modalidad}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>


                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="teachingUnit-enfoque">Enfoque</InputLabel>
                        <FormControl fullWidth>
                          <Select
                            id="column-hiding-enfoque"
                            displayEmpty
                            {...getFieldProps('enfoque')}
                            onChange={(event) => setFieldValue('enfoque', event.target.value)}
                            input={<OutlinedInput id="select-column-hiding-enfoque" placeholder="Sort by" />}
                            renderValue={(selected) => {
                              if (!selected) {
                                return <Typography variant="subtitle2">Seleccionar enfoque</Typography>;
                              }

                              const selectedEnfoque = allFocus.filter((item) => item.value === selected);
                              return (
                                <Typography variant="subtitle2">
                                  {selectedEnfoque.length > 0 ? selectedEnfoque[0].label : 'Pendiente'}
                                </Typography>
                              );
                            }}
                          >
                            {allFocus.map((column) => (
                              <MenuItem key={column.value} value={column.value}>
                                <ListItemText primary={column.label} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {touched.enfoque && errors.enfoque && (
                          <FormHelperText error id="standard-weight-helper-text-email-login-enfoque" sx={{ pl: 1.75 }}>
                            {errors.enfoque}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>


                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="teachingUnit-unidadDidactica">Unidad Didáctica</InputLabel>
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




                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>
            <Divider />
            <DialogActions sx={{ p: 2.5 }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  {teachingUnit && (
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
                      {teachingUnit ? 'Editar' : 'Agregar'}
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </DialogActions>
          </Form>
        </LocalizationProvider>
      </FormikProvider>
      {teachingUnit && <AlertTeachingUnitDelete id={teachingUnit.id} title={teachingUnit.id.toString()} open={openAlert} handleClose={handleAlertClose} />}
    </>
  );
}

FormTeachingUnitAdd.propTypes = { teachingUnit: PropTypes.any, closeModal: PropTypes.func };
