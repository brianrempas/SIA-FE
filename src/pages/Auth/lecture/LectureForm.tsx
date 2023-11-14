import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';

export default function LectureForm({userData, modal, toggleSubmit}: any) {
    const [open, setOpen] = useState(false);
    const [inputName, setInputName] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputNIP, setInputNIP] = useState('');
    const [modalType, setModalType] = useState('create')

    const data = {
        name: inputName,
        email: inputEmail,
        nip: inputNIP,
        lectureId: userData ? userData.lecture_id : 0
    }

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

    function callData(){
    console.log('userData = ')
    console.log(data)
    }

    useEffect(() => {
        if(userData) {
            setModalType('update')
            setInputName(userData.name)
            setInputEmail(userData.email)
            setInputNIP(userData.nip)
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
                    <Button onClick={handleOpen}><UpdateIcon/></Button>
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
                        Create Lecturer <Button variant='contained' onClick={handleClose}>X</Button>
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
                        Update Lecturer <Button variant='contained' onClick={handleClose}>X</Button>
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
                    value={inputNIP}
                    label="NIP"
                    type='number'
                    onChange={(e) => setInputNIP(e.target.value)}
                    fullWidth
                    required
                    />
                    <br></br>
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
                    
                    <Button onClick={callData}>
                    call
                    </Button>
                </Box>
                </form>
            </Modal>
            </div>
        )}

        {modal === 'delete' && (
            <div>
                <Button onClick={handleOpen}><DeleteIcon/></Button>
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
                    Delete Lecturer <Button variant='contained' onClick={handleClose}>X</Button>
                    </h2>
                    <h2>Are you sure you want to delete this lecturer?</h2>
                    <Button variant="contained" type="submit">
                    Delete
                    </Button>
                    <Button onClick={callData}>
                    call
                    </Button>
                    </Box>
                </form>
                </Modal>
            </div>
        )}
        </>
    )
}
