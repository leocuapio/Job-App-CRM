import { Application } from '@/types/application';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { Fragment } from 'react/jsx-runtime';


interface Params {
    open: boolean;
    handleClose: () => void;
    delApp: Application;
    refresh: () => void;
}

export default function DeleteApplication({open, handleClose, delApp, refresh}: Params) {

    async function handleAgree() {
        const res = await fetch(`api/applications/${delApp.id}`,
            {
                method: "DELETE"
            }
        )
        const data = await res.json();
        console.log(data)
        refresh();
    }


  return (
    <Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete This Application?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are deleting {delApp.id}. Confirm or Deny below.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Disagree
          </Button>
          <Button onClick={() => {handleAgree(); handleClose();}}>Agree</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
