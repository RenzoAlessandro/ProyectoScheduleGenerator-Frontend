import PropTypes from 'prop-types';
import { useMemo } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';

// project imports
import FormStudyPlanAdd from './FormStudyPlanAdd';
import MainCard from '../../components/MainCard';
import SimpleBar from '../../components/third-party/SimpleBar';
import CircularWithPath from '../../components/@extended/progress/CircularWithPath';
import coursesList from '../../data/courses';

// ==============================|| CURSO ADD / EDIT ||============================== //

export default function StudyPlanModal({ open, modalToggler, curso }) {
  const { coursesLoading: loading } = coursesList;

  const closeModal = () => modalToggler(false);

  const cursoForm = useMemo(
    () => !loading && <FormStudyPlanAdd curso={curso || null} closeModal={closeModal} />,
    // eslint-disable-next-line
    [curso, loading]
  );

  return (
    <>
      {open && (
        <Modal
          open={open}
          onClose={closeModal}
          aria-labelledby="modal-curso-add-label"
          aria-describedby="modal-curso-add-description"
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
                cursoForm
              )}
            </SimpleBar>
          </MainCard>
        </Modal>
      )}
    </>
  );
}

StudyPlanModal.propTypes = { open: PropTypes.bool, modalToggler: PropTypes.func, curso: PropTypes.any };
