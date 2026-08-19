import { Application } from '@/types/application';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Fragment } from 'react/jsx-runtime';


interface Params {
    open: boolean;
    handleClose: () => void;
    delApp: Application;
    refresh: () => void;
}

export default function DeleteApplication({open, handleClose, delApp, refresh}: Params) {

    async function handleAgree() {
        const res = await fetch(`/api/applications/${delApp.id}`,
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
        slotProps={{
          paper: {
            sx: {
              borderRadius: '8px',
              border: '1px solid #ded7cc',
              boxShadow: '0 28px 90px rgba(34,31,31,0.18)',
              width: '100%',
              maxWidth: 420,
            },
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ color: '#221f1f', fontWeight: 700, pb: 1 }}>
          {"Delete This Application?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{ color: '#6d655c' }}>
            You are deleting {delApp.id}. Confirm or Deny below.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={handleClose}
            autoFocus
            sx={{
              borderRadius: '6px',
              color: '#3b3631',
              textTransform: 'none',
              fontWeight: 700,
            }}
          >
            Disagree
          </Button>
          <Button
            onClick={() => {handleAgree(); handleClose();}}
            variant="contained"
            sx={{
              borderRadius: '6px',
              backgroundColor: '#9a4f43',
              boxShadow: 'none',
              textTransform: 'none',
              fontWeight: 700,
              '&:hover': { backgroundColor: '#7f4036', boxShadow: 'none' },
            }}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
