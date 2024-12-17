import PropTypes from 'prop-types';
// material-ui
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

// third-party
import { useDropzone } from 'react-dropzone';

// project-imports
import RejectionFiles from './RejectionFiles';
import PlaceholderContent from './PlaceholderContent';
import FilesPreview from './FilesPreview';
import { DropzopType } from '../../../config';

const DropzoneWrapper = styled('div')(({ theme }) => ({
  outline: 'none',
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  border: '1px dashed ',
  borderColor: theme.palette.secondary.main,
  '&:hover': { opacity: 0.72, cursor: 'pointer' }
}));

// ==============================|| UPLOAD - MULTIPLE FILE ||============================== //

export default function MultiFileUpload({ error, showList = false, files, type, setFieldValue, sx, onUpload }) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: false,
    accept:{
      'application/vnd.ms-excel': [],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
    },
    onDrop: (acceptedFiles) => {
      setFieldValue(
        'files',
        acceptedFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) }))
      );
    }
  });

  const onRemoveAll = () => {
    setFieldValue('files', null);
  };

  const onRemove = (file) => {
    const filteredItems = files && files.filter((_file) => _file !== file);
    setFieldValue('files', filteredItems);
  };

  return (
    <>
      <Box sx={{ width: '100%', ...(type === DropzopType.STANDARD && { width: 'auto', display: 'flex' }), ...sx }}>
        <Stack {...(type === DropzopType.STANDARD && { alignItems: 'center' })}>
          <DropzoneWrapper
            {...getRootProps()}
            sx={{
              ...(type === DropzopType.STANDARD && { p: 0, m: 1, width: 64, height: 64 }),
              ...(isDragActive && { opacity: 0.72 }),
              ...((isDragReject || error) && { color: 'error.main', borderColor: 'error.light', bgcolor: 'error.lighter' })
            }}
          >
            <input {...getInputProps()} />
            <PlaceholderContent type={type} />
          </DropzoneWrapper>
          {type === DropzopType.STANDARD && files && files.length > 1 && (
            <Button variant="contained" color="error" size="extraSmall" onClick={onRemoveAll}>
              Eliminar
            </Button>
          )}
        </Stack>
        {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}
        {files && files.length > 0 && <FilesPreview files={files} showList={showList} onRemove={onRemove} type={type} />}
      </Box>

      {type !== DropzopType.STANDARD && files && files.length > 0 && (
        <Stack direction="row" justifyContent="flex-end" spacing={1.5} sx={{ mt: 1.5 }}>
          <Button color="inherit" size="small" onClick={onRemoveAll}>
          Eliminar
          </Button>
          <Button size="small" variant="contained" onClick={onUpload}>
          Subir archivo
          </Button>
        </Stack>
      )}
    </>
  );
}

MultiFileUpload.propTypes = {
  error: PropTypes.any,
  showList: PropTypes.bool,
  files: PropTypes.any,
  type: PropTypes.any,
  setFieldValue: PropTypes.any,
  sx: PropTypes.any,
  onUpload: PropTypes.any
};