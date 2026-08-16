"use client"

import Button from "@mui/material/Button";
import { useState } from "react";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: 'calc(100% - 32px)', sm: 520 },
    maxHeight: 'calc(100vh - 32px)',
    overflowY: 'auto',
    bgcolor: '#fff',
    border: '1px solid #ded7cc',
    borderRadius: '8px',
    boxShadow: '0 28px 90px rgba(34,31,31,0.18)',
    p: { xs: 3, sm: 4 },
  };

export default function NewResume() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function handleSubmit () {
        
    }
    return (
        <>
        <Button
                onClick={handleOpen}
                startIcon={<AddOutlinedIcon />}
                variant="contained"
                sx={{
                    borderRadius: '6px',
                    backgroundColor: '#221f1f',
                    boxShadow: '0 10px 24px rgba(34,31,31,0.16)',
                    px: 2,
                    py: 1.15,
                    textTransform: 'none',
                    fontWeight: 700,
                    '&:hover': { backgroundColor: '#393431' },
                }}
            >
                New Application
            </Button>
            <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: '#221f1f', fontWeight: 700, mb: 0.5 }}>
                        New Resume
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ color: '#6d655c', fontSize: 14, mb: 3 }}>
                        Attach your current resume. 
                    </Typography>
                    <form className="grid gap-3" onSubmit={handleSubmit}>
                        
                        <button className="mt-2 rounded-md bg-[#221f1f] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#393431] focus:outline-none focus:ring-2 focus:ring-[#221f1f] focus:ring-offset-2" type="submit">Submit</button>
                    </form>
                    </Box>
                </Modal>
        </>
    )
}