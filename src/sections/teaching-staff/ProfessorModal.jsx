import PropTypes from 'prop-types';
import { useMemo } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';

// project imports
import FormProfessorAdd from './FormProfessorAdd';
import MainCard from '../../components/MainCard';
import SimpleBar from '../../components/third-party/SimpleBar';
import CircularWithPath from '../../components/@extended/progress/CircularWithPath';
import professorList from '../../data/professors';

// ==============================|| PROFESSOR ADD / EDIT ||============================== //

export default function ProfessorModal({ open, modalToggler, professor }) {
  const { professorsLoading: loading } = professorList;

  const closeModal = () => modalToggler(false);

  const professorForm = useMemo(
    () => !loading && <FormProfessorAdd professor={professor || null} closeModal={closeModal} />,
    // eslint-disable-next-line
    [professor, loading]
  );

  return (
    <>
      {open && (
        <Modal
          open={open}
          onClose={closeModal}
          aria-labelledby="modal-professor-add-label"
          aria-describedby="modal-professor-add-description"
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
                professorForm
              )}
            </SimpleBar>
          </MainCard>
        </Modal>
      )}
    </>
  );
}

ProfessorModal.propTypes = { open: PropTypes.bool, modalToggler: PropTypes.func, professor: PropTypes.any };
