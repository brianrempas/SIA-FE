import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import { ProdiListOption } from '../prodi/ProdiList';
import { SubjectListOption, SubjectListOptionSelected } from '../subject/SubjectList';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { FormControl, IconButton, Tooltip, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function ScheduleForm({ formData, userData, modal, toggleSubmit }: any) {

    const [open, setOpen] = useState(false);
    const [idProdi, setIdProdi] = useState('')
    const [idSubject, setIdSubject] = useState('');
    const [inputDay, setInputDay] = useState('');
    const [inputTimeStart, setInputTimeStart] = useState('');
    const [inputTimeEnd, setInputTimeEnd] = useState('');
    const [modalType, setModalType] = useState('create')

    function inputProdiId(data: any) {
        setIdProdi(data);
    }
    function inputSubjectId(data: any) {
        setIdSubject(data);
    }

    const data = {
        idProdi: idProdi,
        idSubject: idSubject,
        day: inputDay,
        tS: inputTimeStart,
        tE: inputTimeEnd,
        scheduleId: userData ? userData.schedule_id : 0
    }

    const handleDayChange = (event: SelectChangeEvent) => {
        setInputDay(event.target.value);
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
        toggleSubmit(data.scheduleId)
    }

    useEffect(() => {
        if (userData) {
            setModalType('update')
            setIdProdi(userData.idProdi);
            setIdSubject(userData.idSubject);
            setInputDay(userData.day);
            setInputTimeStart(userData.timeStart);
            setInputTimeEnd(userData.timeEnd);
        }
    }, [open]);

    return (
        <>

            {modal === 'CU' && (
                <div>
                    {modalType === 'create' &&
                        <Button variant="contained" onClick={handleOpen}>
                            Create Schedule
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
                                        Create Schedule <IconButton onClick={handleClose}><CloseIcon/></IconButton>
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
                                        Update Schedule <IconButton onClick={handleClose}><CloseIcon/></IconButton>
                                    </h2>
                                }

                                {modalType === 'create' &&
                                    <>
                                        <ProdiListOption
                                            data={formData.prodiData}
                                            toggleRoleId={inputProdiId}
                                        />
                                        <SubjectListOptionSelected
                                            data={formData.subjectData}
                                            toggleRoleId={inputSubjectId}
                                            selectedProdiId={idProdi}
                                        />
                                    </>
                                }

                                {modalType === 'update' &&
                                    <>
                                        <ProdiListOption
                                            data={formData.prodiData}
                                            toggleRoleId={inputProdiId}
                                            optionValue={userData.idProdi}
                                        />
                                        <SubjectListOptionSelected
                                            data={formData.subjectData}
                                            toggleRoleId={inputSubjectId}
                                            selectedProdiId={idProdi}
                                            optionValue={userData.idSubject}
                                        />
                                    </>
                                }
                                <FormControl sx={{ minWidth: 320 }}>
                                    <InputLabel>Choose Day</InputLabel>
                                    <Select sx={{ minWidth: 320 }} value={inputDay} onChange={handleDayChange} label="Choose Day">
                                        <MenuItem value="">None</MenuItem>
                                        <MenuItem value="Monday">Monday</MenuItem>
                                        <MenuItem value="Tuesday">Tuesday</MenuItem>
                                        <MenuItem value="Wednesday">Wednesday</MenuItem>
                                        <MenuItem value="Thursday">Thursday</MenuItem>
                                        <MenuItem value="Friday">Friday</MenuItem>
                                        <MenuItem value="Saturday">Saturday</MenuItem>
                                        <MenuItem value="Sunday">Sunday</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    type='time'
                                    value={inputTimeStart}
                                    label="Time Start (WITA)"
                                    onChange={(e) => setInputTimeStart(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    fullWidth
                                    required
                                />
                                <TextField
                                    type='time'
                                    value={inputTimeEnd}
                                    label="Time End (WITA)"
                                    onChange={(e) => setInputTimeEnd(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    fullWidth
                                    required
                                />

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
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2.3
                                }}
                            >
                                <h2
                                    style={{
                                        justifyContent: 'space-between',
                                        display: 'flex',
                                    }}
                                    id="modal-title"
                                >
                                    Delete Program Study <IconButton onClick={handleClose}><CloseIcon/></IconButton>
                                </h2>
                                <Typography variant='h6'>Are you sure you want to delete this Schedule?</Typography>
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