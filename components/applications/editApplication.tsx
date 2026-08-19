import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Application } from '@/types/application';
import { useState, FormEvent, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

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

const inputClass = "w-full rounded-md border border-[#cfc7bc] bg-[#fbfaf7] px-3 py-2.5 text-sm text-[#221f1f] outline-none transition placeholder:text-[#9c9287] focus:border-[#756a5f] focus:bg-white focus:ring-2 focus:ring-[#d7cec2]";


interface Params {
  open: boolean;
  handleClose: () => void;
  editApp: Application;
  refresh: () => void;
}


export default function EditApplication({ open, handleClose, editApp, refresh }: Params) {
  const [updatedApp, setUpdatedApp] = useState<Application>(editApp)


  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const res = await fetch(`/api/applications/${editApp.id}`,
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
  }, [editApp])

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: '#221f1f', fontWeight: 700, mb: 0.5 }}>
          Edit application
        </Typography>
        <Typography id="modal-modal-description" sx={{ color: '#6d655c', fontSize: 14, mb: 3 }}>
          Update the role details and current pipeline status.
        </Typography>
        <form className="grid gap-3" onSubmit={handleSubmit}>
          <input className={inputClass} type="text" name="company" id="" value={updatedApp.company} onChange={(e) => setUpdatedApp((prev) => ({ ...prev, company: e.target.value }))} />
          <input className={inputClass} type="text" placeholder="position" name="position" value={updatedApp.position} onChange={(e) => setUpdatedApp((prev) => ({ ...prev, position: e.target.value }))} />
          <input className={inputClass} type="text" name="salary" id="" value={updatedApp.salary === null ? "" : updatedApp.salary} onChange={(e) => setUpdatedApp((prev) => ({ ...prev, salary: Number(e.target.value) }))} />
          <input
            className={inputClass}
            type="date"
            name="dateApplied"
            value={updatedApp.dateApplied
              ? new Date(updatedApp.dateApplied).toISOString().split("T")[0]
              : ""}
            onChange={(e) =>
              setUpdatedApp((prev) => ({
                ...prev,
                dateApplied: new Date(e.target.value)
              }))
            }
          />
          <input className={inputClass} type="text" placeholder="location" name="location" value={updatedApp.location} onChange={(e) => setUpdatedApp((prev) => ({ ...prev, location: e.target.value }))} />
          <input className={inputClass} type="text" placeholder='notes' name='notes' value={updatedApp.notes ? updatedApp.notes : ""} onChange={(e) => setUpdatedApp((prev) => ({ ...prev, notes: e.target.value }))} />
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={updatedApp.status}
              label="Status"
              onChange={(e) => setUpdatedApp((prev) => ({ ...prev, status: e.target.value }))}
              sx={{
                borderRadius: '6px',
                backgroundColor: '#fbfaf7',
                color: '#221f1f',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#cfc7bc' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#a99d8e' },
              }}
            >
              <MenuItem value={"Want to Apply"}>Want to Apply</MenuItem>
              <MenuItem value={"Applied"}>Applied</MenuItem>
              <MenuItem value={"Interview"}>Interview</MenuItem>
              <MenuItem value={"Offer"}>Offer</MenuItem>
            </Select>
          </FormControl>
          <button className="mt-2 rounded-md bg-[#221f1f] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#393431] focus:outline-none focus:ring-2 focus:ring-[#221f1f] focus:ring-offset-2" type='submit'>Submit</button>
        </form>
      </Box>
    </Modal>
  );
}
