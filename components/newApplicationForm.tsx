"use client"

import { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

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

interface FormData {
    company: string;
    position: string;
    status: string;
    location: string;
    dateApplied: string;
    salary: string | number;
    notes: string;
}


export default function ApplicationForm() {
    const [formData, setformData] = useState<FormData>({company: "", position: "", status: "", location: "", dateApplied: "", salary: "", notes: ""})
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (event: SelectChangeEvent) => {
        setformData((prev) => ({...prev, status: event.target.value}));
      };


    async function handleSubmit() {
        const resData = {...formData, salary: formData.salary === "" ? null : formData.salary };
        const res = await fetch("/api/applications", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(resData),
            }
        )
        const data = await res.json();
        console.log(data)
    }

    return (
        <div>
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
                        New application
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ color: '#6d655c', fontSize: 14, mb: 3 }}>
                        Add the company, role, and current pipeline status.
                    </Typography>
                    <form className="grid gap-3" onSubmit={handleSubmit}>
                        <input className={inputClass} type="text" placeholder= "Company" name="company" id="" value={formData.company} onChange={(e) => setformData((prev) => ({...prev, company: e.target.value}))}/>
                        <input className={inputClass} type="text" placeholder= "Position" name= "position" value= {formData.position} onChange={(e) => setformData((prev) => ({...prev, position: e.target.value}))}/>
                        <input className={inputClass} type="number" placeholder= "Salary" name="salary" id="" value={formData.salary} onChange={(e) => setformData((prev) => ({...prev, salary: e.target.value === "" ? "" : Number(e.target.value)}))}/>
                        <input className={inputClass} type="date" name="dateApplied" value= {formData.dateApplied} id="" onChange={(e) => setformData((prev) => ({...prev, dateApplied: e.target.value}))} />
                        <input className={inputClass} type="text" placeholder= "Location" name= "location" value={formData.location} onChange={(e) => setformData((prev) => ({...prev, location: e.target.value}))}/>
                        <input className={inputClass} type="text" placeholder= "Notes" name= "notes" value={formData.notes} onChange={(e) => setformData((prev) => ({...prev, notes: e.target.value}))}/>
                        <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formData.status}
                            label="Status"
                            onChange={handleChange}
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
                        <button className="mt-2 rounded-md bg-[#221f1f] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#393431] focus:outline-none focus:ring-2 focus:ring-[#221f1f] focus:ring-offset-2" type="submit">Submit</button>
                    </form>
                    </Box>
                </Modal>
        </div>
    );
}
