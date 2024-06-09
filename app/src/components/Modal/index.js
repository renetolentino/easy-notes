import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { AiFillCloseSquare } from 'react-icons/ai';
import './style.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ open, handleClose, menssagem }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <button onClick={() => handleClose()} id="close-modal">
            <AiFillCloseSquare />
          </button>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Nota deletada!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {menssagem}.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
