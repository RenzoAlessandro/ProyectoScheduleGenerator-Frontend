import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

// project-imports
import ProfileTab from './ProfileTab';
import useAuth from '../../hooks/useAuth';
import MainCard from '../../components/MainCard';
import Avatar from '../../components/@extended/Avatar';
import MoreIcon from '../../components/@extended/MoreIcon';
import IconButton from '../../components/@extended/IconButton';

import avatarMale from '../../assets/images/users/default-male-avatar.svg';
import avatarFemale from '../../assets/images/users/default-female-avatar.svg';

// ==============================|| USER PROFILE - TABS ||============================== //

export default function ProfileTabs({ focusInput }) {

  const { user } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <MainCard>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="flex-end">
            <IconButton
              variant="light"
              color="secondary"
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{ transform: 'rotate(90deg)' }}
            >
              <MoreIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{ 'aria-labelledby': 'basic-button' }}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem
                component={Link}
                to="/profile/user/personal"
                onClick={() => {
                  handleClose();
                  setTimeout(() => {
                    focusInput();
                  });
                }}
              >
                Editar
              </MenuItem>
              <MenuItem onClick={handleClose} disabled>
                Eliminar
              </MenuItem>
            </Menu>
          </Stack>
          <Stack spacing={2.5} alignItems="center">
            <Avatar alt="Avatar 1" src={user?.sexo === 'M'? avatarMale : avatarFemale} sx={{ width: 124, height: 124, border: '1px dashed' }} />
            <Stack spacing={0.5} alignItems="center">
              <Typography variant="h5">{user?.nombre}</Typography>
              <Typography variant="h5">{user?.apellidos}</Typography>
              {
                user?.categoria === 1 ? (
                  <Typography color="secondary">Admin</Typography>
                ) : (
                  <Typography color="secondary">Bibliotecario</Typography>
                )
              }
            </Stack>
          </Stack>
        </Grid>
        <Grid item sm={3} sx={{ display: { sm: 'block', md: 'none' } }} />
        <Grid item xs={12}>
          <ProfileTab />
        </Grid>
      </Grid>
    </MainCard>
  );
}

ProfileTabs.propTypes = { focusInput: PropTypes.func };
