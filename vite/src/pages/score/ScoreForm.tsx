import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormControl, IconButton, InputLabel, MenuItem, Tooltip, Typography } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CloseIcon from '@mui/icons-material/Close';
import { StudentListOptionSelected } from '../student/StudentList';
import AddchartIcon from '@mui/icons-material/Addchart';
import ScoreStTable from './ScoreStTable';
import GradingIcon from '@mui/icons-material/Grading';

export default function ScoreForm({ formData, userData, toggleSubmit, toggleUpdate }: any) {
    const [open, setOpen] = useState(false);
    const [idProdi, setIdProdi] = useState(userData.idProdi);
    const [idStudent, setIdStudent] = useState('');
    const [input, setInput] = useState(``);

    const data = {
        idProdi: userData.idProdi,
        idSubject: userData.subject_id,
        idStudent: idStudent,
        input: input,
        scoreId: userData ? userData.score_id : 0
    }

    const table = {
        formData
    }

    const handleInputChange = (event: SelectChangeEvent) => {
        setInput(event.target.value);
    };

    function inputStudentId(data: any) {
        setIdStudent(data);
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleSubmit(data:any) {
        setOpen(false)
        toggleSubmit(data)
    }

    function handeSubmitUpdate(data:any) {
        setOpen(false)
        toggleUpdate(data)
    }

    useEffect(() => {
        setInput('')
    }, [open]);

    return (
        <>

            <div>
                <Tooltip disableInteractive title="Grade" sx={
                    {
                        color: "primary.dark",
                        transition: "0.2s",
                        "&:hover": {
                            backgroundColor: "primary.lightFade",
                            transition: "0.2s"
                        }
                    }
                }><IconButton onClick={handleOpen}><GradingIcon /></IconButton></Tooltip>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '80%',
                            height: '80%',
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            pt: 0,
                            pb: 4,
                            pr: 4,
                            pl: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            overflow: 'auto'
                        }}
                    >
                        <h2
                            style={{
                                justifyContent: 'space-between',
                                display: 'flex',
                                marginTop: 40,
                                marginBottom: 10
                            }}
                            id="modal-title"
                        >
                            Grade Students <IconButton onClick={handleClose}><CloseIcon /></IconButton>
                        </h2>
                        <ScoreStTable formData={formData} idProdi={userData.idProdi} idSubjects={userData.subject_id} toggleCreate={handleSubmit} toggleUpdate={handeSubmitUpdate} />
                    </Box>
                </Modal>
            </div>
        </>
    )
}
