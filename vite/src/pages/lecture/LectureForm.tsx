import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormControl, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup, SelectChangeEvent, Tooltip, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


export default function LectureForm({ userData, modal, toggleSubmit }: any) {
    const [open, setOpen] = useState(false);
    const [inputName, setInputName] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputYearIn, setInputYearIn] = useState('');
    const [modalType, setModalType] = useState('create')
    const [inputGender, setInputGender] = useState('')

    const data = {
        name: inputName,
        email: inputEmail,
        yearIn: inputYearIn,
        gender: inputGender,
        lectureId: userData ? userData.lecture_id : 0
    }
    
    const handleGenderChange = (event: SelectChangeEvent) => {
        setInputGender(event.target.value);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setOpen(false)
        toggleSubmit(data)
    }

    function handleSubmitDelete(event: React.FormEvent) {
        event.preventDefault();
        setOpen(false)
        toggleSubmit(data.lectureId)
    }

    useEffect(() => {
        if (userData) {
            const removedLastTwo = userData.nip.slice(0, -2)
            setModalType('update')
            setInputName(userData.name)
            setInputEmail(userData.email)
            setInputYearIn(removedLastTwo)
            setInputGender(userData.gender)
        }
    }, [open]);

    return (
        <>
                {modal === 'CU' && (
                    <div>
                        {modalType === 'create' &&
                            <Button variant="contained" onClick={handleOpen}>
                                Create Lecturer 
                            </Button>
                        }

                        {modalType === 'update' &&
                            <Tooltip disableInteractive title="Update" sx={
                                {
                                    color: "primary.dark",
                                    transition: "0.2s",
                                    "&:hover": {
                                        backgroundColor: "primary.lightFade",
                                        transition: "0.2s"
                                    }
                                }
                            }><IconButton onClick={handleOpen}><UpdateIcon /></IconButton></Tooltip>
                        }
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-title"
                            aria-describedby="modal-description"
                        >
                            <form onSubmit={handleSubmit}>
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: '500px',
                                        bgcolor: 'background.paper',
                                        border: '2px solid #000',
                                        boxShadow: 24,
                                        p: 4,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 2
                                    }}
                                >
                                    {modalType === 'create' &&
                                        <h2
                                            style={{
                                                justifyContent: 'space-between',
                                                display: 'flex',
                                            }}
                                            id="modal-title"
                                        >
                                            Create Lecturer <IconButton onClick={handleClose}><CloseIcon/></IconButton>
                                        </h2>
                                    }
                                    {modalType === 'update' &&
                                        <h2
                                            style={{
                                                justifyContent: 'space-between',
                                                display: 'flex',
                                            }}
                                            id="modal-title"
                                        >
                                            Update Lecturer <IconButton onClick={handleClose}><CloseIcon/></IconButton>
                                        </h2>
                                    }

                                    <TextField
                                        value={inputName}
                                        label="Full Name"
                                        onChange={(e) => setInputName(e.target.value)}
                                        fullWidth
                                        required
                                    />
                                    <TextField
                                        value={inputEmail}
                                        label="Email"
                                        type='email'
                                        onChange={(e) => setInputEmail(e.target.value)}
                                        fullWidth
                                        required
                                    />
                                    <TextField
                                        value={inputYearIn}
                                        label="Year Admission"
                                        type='number'
                                        onChange={(e) => setInputYearIn(e.target.value)}
                                        fullWidth
                                        required
                                    />
                                    <FormControl>
                                    <FormLabel id="demo-radio-buttons-group-label">
                                    Choose Gender
                                    </FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        value={inputGender}
                                        onChange={handleGenderChange}
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel
                                            value="male"
                                            control={<Radio />}
                                            label="Male"
                                            required
                                        />
                                        <FormControlLabel
                                            value="female"
                                            control={<Radio />}
                                            label="Female"
                                            required
                                        />
                                    </RadioGroup>
                                </FormControl>
                                    {modalType === 'create' &&
                                        <Button variant="contained" type="submit">
                                            Create
                                        </Button>
                                    }
                                    {modalType === 'update' &&
                                        <Button variant="contained" type="submit">
                                            Update
                                        </Button>
                                    }
                                </Box>
                            </form>
                        </Modal>
                    </div>
                )}

                {modal === 'delete' && (
                    <div>
                        <Tooltip disableInteractive title="Delete" sx={
                                {
                                    color: "primary.dark",
                                    transition: "0.2s",
                                    "&:hover": {
                                        backgroundColor: "primary.lightFade",
                                        transition: "0.2s"
                                    }
                                }
                            }><IconButton onClick={handleOpen}><DeleteIcon /></IconButton></Tooltip>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-title"
                            aria-describedby="modal-description"
                        >
                            <form onSubmit={handleSubmitDelete}>
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: '500px',
                                        bgcolor: 'background.paper',
                                        border: '2px solid #000',
                                        boxShadow: 24,
                                        p: 4,
                                    }}
                                >
                                    <h2
                                        style={{
                                            justifyContent: 'space-between',
                                            display: 'flex',
                                        }}
                                        id="modal-title"
                                    >
                                        Delete Lecturer <IconButton onClick={handleClose}><CloseIcon/></IconButton>
                                    </h2>
                                    <Typography variant='h6'>Are you sure you want to delete this lecturer?</Typography>
                                    <Button variant="contained" type="submit">
                                        Delete
                                    </Button>
                                </Box>
                            </form>
                        </Modal>
                    </div>
                )}
        </>
    )
}
