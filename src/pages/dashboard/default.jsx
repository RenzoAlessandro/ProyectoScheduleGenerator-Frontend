// material-ui
import Grid from '@mui/material/Grid';
// assets
import WelcomeBanner from '../../sections/dashboard/WelcomeBanner';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12}>
        <WelcomeBanner />
      </Grid>
    </Grid>
  );
}
