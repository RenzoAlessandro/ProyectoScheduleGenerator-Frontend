import { Link } from 'react-router-dom';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import AuthDivider from '../../sections/auth/AuthDivider';
import AuthWrapper from '../../sections/auth/AuthWrapper';
import FirebaseRegister from '../../sections/auth/auth-forms/AuthRegister';

// ================================|| REGISTER ||================================ //

export default function Register() {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <h1>CEDHI</h1>
          <h2>Generador de Horarios</h2>
        </Grid>
        <Grid item xs={12}>
          <AuthDivider></AuthDivider>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Registro</Typography>
            <Typography component={Link} to={'/auth/login'} variant="body1" sx={{ textDecoration: 'none' }} color="primary">
              ¿Ya tienes una cuenta?
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <FirebaseRegister />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
