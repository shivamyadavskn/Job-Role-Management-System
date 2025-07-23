import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import { closeSnackbar } from '../slices/uiSlice';

const Alert = React.forwardRef<HTMLDivElement, any>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Feedback: React.FC = () => {
  const dispatch = useDispatch();
  const { snackbar } = useSelector((state: RootState) => state.ui);
  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={4000}
      onClose={() => dispatch(closeSnackbar())}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={() => dispatch(closeSnackbar())} severity={snackbar.severity as AlertColor}>
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};

export default Feedback; 