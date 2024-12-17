import { FormattedMessage } from 'react-intl';
import { useMemo, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import ThemeMode from './ThemeMode';
import ColorScheme from './ColorScheme';
import ThemeWidth from './ThemeWidth';

import MainCard from '../../components/MainCard';
import IconButton from '../../components/@extended/IconButton';
import SimpleBar from '../../components/third-party/SimpleBar';

import { HEADER_HEIGHT } from '../../config';
import useConfig from '../../hooks/useConfig';

// assets
import { Add, Setting2 } from 'iconsax-react';

// ==============================|| HEADER CONTENT - CUSTOMIZATION ||============================== //

export default function Customization() {
  const theme = useTheme();
  const { container, mode, presetColor } = useConfig();

  // eslint-disable-next-line
  const themeMode = useMemo(() => <ThemeMode />, [mode]);
  // eslint-disable-next-line
  const themeColor = useMemo(() => <ColorScheme />, [presetColor]);
  // eslint-disable-next-line
  const themeWidth = useMemo(() => <ThemeWidth />, [container]);

  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <Fab
        component="div"
        onClick={handleToggle}
        size="large"
        variant="circular"
        sx={{
          borderRadius: 0,
          borderTopLeftRadius: '50%',
          borderBottomLeftRadius: '50%',
          borderTopRightRadius: '4px',
          borderBottomRightRadius: '4px',
          top: '14%',
          position: 'fixed',
          right: 0,
          zIndex: 1200,
          boxShadow: theme.customShadows.z1,
          bgcolor: 'background.paper',
          border: '4px solid ',
          borderColor: 'background.paper',
          borderRight: 'none',
          '&:hover': { bgcolor: 'primary.lighter' }
        }}
      >
        <IconButton
          onClick={handleToggle}
          aria-label="settings toggler"
          size="large"
          sx={{ p: 0, '& :hover': { bgcolor: 'red' }, '& svg': { width: 28, height: 28 } }}
        >
          <Setting2 variant="Bulk" />
        </IconButton>
      </Fab>
      <Drawer
        sx={{
          zIndex: 2001
        }}
        anchor="right"
        onClose={handleToggle}
        open={open}
        PaperProps={{
          sx: {
            width: 350
          }
        }}
      >
        {open && (
          <MainCard content={false} border={false}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1.5} sx={{ p: 2.5 }}>
              <Typography variant="h5">
                <FormattedMessage id="Settings" />
              </Typography>
              <IconButton color="error" sx={{ p: 0 }} onClick={handleToggle}>
                <Add size={28} style={{ transform: 'rotate(45deg)' }} />
              </IconButton>
            </Stack>
            <SimpleBar
              sx={{
                '& .simplebar-content': {
                  display: 'flex',
                  flexDirection: 'column'
                }
              }}
            >
              <Box sx={{ p: 3, height: `calc(100vh - ${HEADER_HEIGHT}px)` }}>
                <Grid container spacing={2.5}>
                  {/* theme-mode */}
                  <Grid item xs={12}>
                    <Stack>
                      <Typography variant="subtitle1" color="text.primary">
                        <FormattedMessage id="theme-mode" />
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        <FormattedMessage id="Choose-light-or-dark-mode" />
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    {themeMode}
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>

                  {/* custom-theme */}
                  <Grid item xs={12}>
                    <Stack>
                      <Typography variant="subtitle1" color="text.primary">
                        <FormattedMessage id="custom-theme" />
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        <FormattedMessage id="choose-your-primary-theme-color" />
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    {themeColor}
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>

                  {/* theme-container */}
                  <Grid item xs={12}>
                    <Stack>
                      <Typography variant="subtitle1" color="text.primary">
                        <FormattedMessage id="layout-width" />
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        <FormattedMessage id="fluid-or-container-layout" />
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    {themeWidth}
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                </Grid>
              </Box>
            </SimpleBar>
          </MainCard>
        )}
      </Drawer>
    </>
  );
}
