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
            <Button onClick={handleOpen}>New Application</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder= "company" name="company" id="" value={formData.company} onChange={(e) => setformData((prev) => ({...prev, company: e.target.value}))}/>
                        <input type="number" placeholder= "salary" name="salary" id="" value={formData.salary} onChange={(e) => setformData((prev) => ({...prev, salary: e.target.value === "" ? "" : Number(e.target.value)}))}/>
                        <input type="date" name="dateApplied" value= {formData.dateApplied} id="" onChange={(e) => setformData((prev) => ({...prev, dateApplied: e.target.value}))} />
                        <input type="text" placeholder= "location" name= "location" value={formData.location} onChange={(e) => setformData((prev) => ({...prev, location: e.target.value}))}/>
                        <input type="text" placeholder= "notes" name= "notes" value={formData.notes} onChange={(e) => setformData((prev) => ({...prev, notes: e.target.value}))}/>
                        <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formData.status}
                            label="Age"
                            onChange={handleChange}
                        >
                            <MenuItem value={"Want to Apply"}>Want to Apply</MenuItem>
                            <MenuItem value={"Applied"}>Applied</MenuItem>
                            <MenuItem value={"Interview"}>Interview</MenuItem>
                            <MenuItem value={"Offer"}>Offer</MenuItem>
                        </Select>
                        </FormControl>
                        <input type="text" placeholder= "position" name= "position" value= {formData.position} onChange={(e) => setformData((prev) => ({...prev, position: e.target.value}))}/>
                        <button type="submit">Submit</button>
                    </form>
                    </Box>
                </Modal>
        </div>
    );
}