import PropTypes from 'prop-types';
import { useMemo } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';

// project imports
import FormClassSessionAdd from './FormClassSessionAdd';
import MainCard from '../../components/MainCard';
import SimpleBar from '../../components/third-party/SimpleBar';
import CircularWithPath from '../../components/@extended/progress/CircularWithPath';
import scheduleClassList from '../../data/scheduleClass';

// ==============================|| CLASS SESSION ADD / EDIT ||============================== //

export default function ClassSessionModal({ open, modalToggler, classSession }) {
  const { scheduleClassLoading: loading } = scheduleClassList;

  const closeModal = () => modalToggler(false);

  const classSessionForm = useMemo(
    () => !loading && <FormClassSessionAdd classSession={classSession || null} closeModal={closeModal} />,
    // eslint-disable-next-line
    [classSession, loading]
  );

  return (
    <>
      {open && (
        <Modal
          open={open}
          onClose={closeModal}
          aria-labelledby="modal-classSession-add-label"
          aria-describedby="modal-classSession-add-description"
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
                classSessionForm
              )}
            </SimpleBar>
          </MainCard>
        </Modal>
      )}
    </>
  );
}

ClassSessionModal.propTypes = { open: PropTypes.bool, modalToggler: PropTypes.func, classSession: PropTypes.any };
