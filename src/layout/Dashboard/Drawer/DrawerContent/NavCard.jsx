// material-ui
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import MainCard from '../../../../components/MainCard';

// assets
import avatar from '../../../../assets/images/analytics/3d-book-03.webp';
import AnimateButton from '../../../../components/@extended/AnimateButton';

// ==============================|| DRAWER CONTENT - NAV CARD ||============================== //

export default function NavCard() {
  return (
    <MainCard sx={{ bgcolor: 'secondary.lighter', m: 3 }}>
      <Stack alignItems="center" spacing={2.5}>
        <CardMedia component="img" image={avatar} />
        <Stack alignItems="center">
          <Typography variant="h5">TITULO</Typography>
          <Typography variant="h6" color="secondary">
            Contenido
          </Typography>
        </Stack>
        <AnimateButton>
          <Button variant="shadow" size="small" component={Link} href="" target="_blank">
            Button
          </Button>
        </AnimateButton>
      </Stack>
    </MainCard>
  );
}
