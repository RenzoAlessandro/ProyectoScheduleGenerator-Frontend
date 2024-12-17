// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// project import
import MainCard from '../../components/MainCard';
import { ThemeMode } from '../../config';
import { openSnackbar } from '../../api/snackbar';

//asset
import WelcomeImage from '../../assets/images/analytics/schedule-02.webp';
import cardBack from '../../assets/images/widget/img-dropbox-bg.svg';

// ==============================|| ANALYTICS - WELCOME ||============================== //

export default function WelcomeBanner() {
  const theme = useTheme();

  const abrirMensaje = () => {
    openSnackbar({
      open: true,
      message: 'Bienvenido al Generador de Horarios CEDHI',
      variant: 'alert',

      alert: {
        color: 'success'
      }
    });
  };

  return (
    <MainCard
    border={false}
    sx={{
      color: 'common.white',
      bgcolor: theme.palette.mode === ThemeMode.DARK ? 'primary.400' : 'primary.darker',
      '&:after': {
        content: '""',
        background: `url("${cardBack}") 100% 100% / cover no-repeat`,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        opacity: 0.5
      }
    }}
    >
      <Grid container>
        <Grid item md={6} sm={6} xs={12}>
          <Stack spacing={2} sx={{ padding: 3 }}>
            <Typography variant="h2" color={theme.palette.background.paper}>
              Generador de Horarios CEDHI
            </Typography>
            <Typography variant="h6" color={theme.palette.background.paper}>
              La nueva interfaz de usuario con el poder de los componentes Material-UI.
            </Typography>
            <Box>
              <Button
                variant="outlined"
                color="secondary"
                onClick={abrirMensaje}
                sx={{
                  color: 'background.paper',
                  borderColor: theme.palette.background.paper,
                  zIndex: 2,
                  '&:hover': { color: 'background.paper', borderColor: theme.palette.background.paper, bgcolor: 'primary.main' }
                }}
                target="_blank"
              >
                Más información
              </Button>
            </Box>
          </Stack>
        </Grid>
        <Grid item sm={6} xs={12} sx={{ display: { xs: 'none', sm: 'initial' } }}>
          <Stack sx={{ position: 'relative', pr: { sm: 3, md: 8 }, zIndex: 2 }} justifyContent="center" alignItems="flex-end">
            <img src={WelcomeImage} alt="Welcome" width="200px" />
          </Stack>
        </Grid>
      </Grid>
    </MainCard>
  );
}
