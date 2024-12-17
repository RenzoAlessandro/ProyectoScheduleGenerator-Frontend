import { Link } from 'react-router-dom';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import AuthDivider from '../../sections/auth/AuthDivider';
import AuthWrapper from '../../sections/auth/AuthWrapper';
import AuthLogin from '../../sections/auth/auth-forms/AuthLogin';

export default function Login() {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <h1>CEDHI</h1>
          <h2>Generador Horarios</h2>
        </Grid>
        <Grid item xs={12}>
          <AuthDivider>
          </AuthDivider>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Iniciar sesión</Typography>
            <Typography component={Link} to={'/auth/register'} variant="body1" sx={{ textDecoration: 'none' }} color="primary">
              ¿No tienes una cuenta?
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthLogin forgot="/auth/forgot-password" />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
