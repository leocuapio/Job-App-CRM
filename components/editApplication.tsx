import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Application } from '@/types/application';
import { useState, FormEvent, useEffect } from 'react';

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


interface Params {
    open: boolean;
    handleClose: () => void;
    editApp: Application;
    refresh: () => void;
}
  

export default function EditApplication({open, handleClose, editApp, refresh}: Params) {
    const [updatedApp, setUpdatedApp] = useState<Application>(editApp)


    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const res = await fetch(`api/applications/${editApp.id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedApp)
            }
        ) 
        const data = await res.json();
        console.log(data);
        handleClose();
        refresh();
    }
    
    useEffect(() => {
      setUpdatedApp(editApp)
    },[editApp])

    return (
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <input type="text" name="company" id="" value={updatedApp.company} onChange={(e) => setUpdatedApp((prev) => ({...prev, company: e.target.value}))} />
            <input type="text" name="salary" id="" value={updatedApp.salary === null ? "": updatedApp.salary} onChange={(e) => setUpdatedApp((prev) => ({...prev, salary: Number(e.target.value)}))} />
            {/* <input type="date" name="dateApplied" value= {updatedApp.dateApplied === null ? "": String(updatedApp.dateApplied)} id="" onChange={(e) => setUpdatedApp((prev) => ({...prev, dateApplied: e.target.value}))} /> */}
            <button type='submit'>Submit</button>
          </form>
        </Box>
      </Modal>
    );
}