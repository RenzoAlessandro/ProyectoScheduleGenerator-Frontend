import PropTypes from 'prop-types';
import { useMemo } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';

// project imports
import FormInfraestructureAdd from './FormInfraestructureAdd';
import MainCard from '../../components/MainCard';
import SimpleBar from '../../components/third-party/SimpleBar';
import CircularWithPath from '../../components/@extended/progress/CircularWithPath';
import infraestructureList from '../../data/infraestructure';

// ==============================|| AULA ADD / EDIT ||============================== //

export default function InfraestructureModal({ open, modalToggler, aula }) {
  const { infraestructuresLoading: loading } = infraestructureList;

  const closeModal = () => modalToggler(false);

  const aulaForm = useMemo(
    () => !loading && <FormInfraestructureAdd aula={aula || null} closeModal={closeModal} />,
    // eslint-disable-next-line
    [aula, loading]
  );

  return (
    <>
      {open && (
        <Modal
          open={open}
          onClose={closeModal}
          aria-labelledby="modal-aula-add-label"
          aria-describedby="modal-aula-add-description"
          sx={{ '& .MuiPaper-root:focus': { outline: 'none' } }}
        >
          <MainCard
            sx={{ width: `calc(100% - 48px)`, minWidth: 340, maxWidth: 880, height: 'auto', maxHeight: 'calc(100vh - 48px)' }}
            modal
            content={false}
          >
            <SimpleBar sx={{ maxHeight: `calc(100vh - 48px)`, '& .simplebar-content': { display: 'flex', flexDirection: 'column' } }}>
              {loading ? (
                <Box sx={{ p: 5 }}>
                  <Stack direction="row" justifyContent="center">
                    <CircularWithPath />
                  </Stack>
                </Box>
              ) : (
                aulaForm
              )}
            </SimpleBar>
          </MainCard>
        </Modal>
      )}
    </>
  );
}

InfraestructureModal.propTypes = { open: PropTypes.bool, modalToggler: PropTypes.func, aula: PropTypes.any };
