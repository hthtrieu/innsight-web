import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  customInput: {
      '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
          height: '50px',
      },
  },
}));

const View = ({ open, onClose, onAddView, onUpdateView, view, setView }) => {
  const classes = useStyles();
  
  return (
    <Dialog open={open} onClose={onClose}>
      {view?.id ? (
            <DialogTitle>Cập nhật tầm nhìn</DialogTitle>
          ) : (
            <DialogTitle>Thêm tầm nhìn</DialogTitle>
          )}
      <DialogContent>
        <DialogContentText>
          <TextField
            style={{ marginTop: '8px', width: '550px', height: '50px' , paddingTop: '10px' }}
            label="Tầm nhìn hướng đi đâu?"
            value={view ? view.name : ''}
            onChange={(e) => setView({ ...view, name: e.target.value })}
            className={classes.customInput}
          />
          <br />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        {view?.id ? (
          <Button onClick={onUpdateView}>Lưu</Button>
        ) : (
          <Button onClick={onAddView}>Thêm tầm nhìn</Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default View;
