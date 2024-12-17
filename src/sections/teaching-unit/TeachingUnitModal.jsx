import PropTypes from 'prop-types';
import { useMemo } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';

// project imports
import FormTeachingUnitAdd from './FormTeachingUnitAdd';
import MainCard from '../../components/MainCard';
import SimpleBar from '../../components/third-party/SimpleBar';
import CircularWithPath from '../../components/@extended/progress/CircularWithPath';
import teachingUnitList from '../../data/teachingUnit';

// ==============================|| TEACHING UNIT ADD / EDIT ||============================== //

export default function TeachingUnitModal({ open, modalToggler, teachingUnit }) {
  const { teachingUnitsLoading: loading } = teachingUnitList;

  const closeModal = () => modalToggler(false);

  const teachingUnitForm = useMemo(
    () => !loading && <FormTeachingUnitAdd teachingUnit={teachingUnit || null} closeModal={closeModal} />,
    // eslint-disable-next-line
    [teachingUnit, loading]
  );

  return (
    <>
      {open && (
        <Modal
          open={open}
          onClose={closeModal}
          aria-labelledby="modal-teachingUnit-add-label"
          aria-describedby="modal-teachingUnit-add-description"
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
                teachingUnitForm
              )}
            </SimpleBar>
          </MainCard>
        </Modal>
      )}
    </>
  );
}

TeachingUnitModal.propTypes = { open: PropTypes.bool, modalToggler: PropTypes.func, teachingUnit: PropTypes.any };
