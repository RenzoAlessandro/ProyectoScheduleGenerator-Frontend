import PropTypes from 'prop-types';
// material-ui
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';

// project-imports
import Avatar from '../../components/@extended/Avatar';
import { PopupTransition } from '../../components/@extended/Transitions';

import { openSnackbar } from '../../api/snackbar';

// assets
import { Trash } from 'iconsax-react';

// ==============================|| AULA - DELETE ||============================== //

export default function AlertStudyPlanDelete({ id, cursoId, open, handleClose }) {
  const deletehandler = async () => {
    // await deleteAula(id).then(() => {
    //   openSnackbar({
    //     open: true,
    //     message: 'Aula deleted successfully',
    //     anchorOrigin: { vertical: 'top', horizontal: 'right' },
    //     variant: 'alert',

    //     alert: {
    //       color: 'success'
    //     }
    //   });
    //   handleClose();
    // });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      keepMounted
      TransitionComponent={PopupTransition}
      maxWidth="xs"
      aria-labelledby="column-delete-title"
      aria-describedby="column-delete-description"
    >
      <DialogContent sx={{ mt: 2, my: 1 }}>
        <Stack alignItems="center" spacing={3.5}>
          <Avatar color="error" sx={{ width: 72, height: 72, fontSize: '1.75rem' }}>
            <Trash variant="Bold" />
          </Avatar>
          <Stack spacing={2}>
            <Typography variant="h4" align="center">
            ¿Estás seguro de que deseas eliminar?
            </Typography>
            <Typography align="center">
            Al eliminar el curso
              <Typography variant="subtitle1" component="span">
                {' '}
                &quot;{cursoId}&quot;{' '}
              </Typography>
              , también se eliminarán todos los datos asignadas a ese curso.
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ width: 1 }}>
            <Button fullWidth onClick={handleClose} color="secondary" variant="outlined">
              Cancelar
            </Button>
            <Button fullWidth color="error" variant="contained" onClick={deletehandler} autoFocus>
              Eliminar
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

AlertStudyPlanDelete.propTypes = { id: PropTypes.number, cursoId: PropTypes.string, open: PropTypes.bool, handleClose: PropTypes.func };
