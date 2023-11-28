import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import { LectureListOption } from '../lecture/LectureList';
import { IconButton, Tooltip, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function ProdiForm({ formData, userData, modal, toggleSubmit }: any) {
    const [open, setOpen] = useState(false);
    const [inputName, setInputName] = useState('');
    const [idLecture, setIdLecture] = useState('');
    const [modalType, setModalType] = useState('create')

    const data = {
        name: inputName,
        idLecture: idLecture,
        prodiId: userData ? userData.prodi_id : 0
    }

    const inputLectureId = (data: any) => {
        setIdLecture(data)
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
        toggleSubmit(data.prodiId)
    }

    useEffect(() => {
        if (userData) {
            setModalType('update')
            setInputName(userData.name)
            setIdLecture(userData.idLecture)
        } else {
            setInputName('')
            setIdLecture('')
        }
    }, [open]);

    return (
        <>

            {modal === 'CU' && (
                <div>
                    {modalType === 'create' &&
                        <Button variant="contained" onClick={handleOpen}>
                            Create Program Study
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
                                        Create Program Study <IconButton onClick={handleClose}><CloseIcon/></IconButton>
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
                                        Update Program Study <IconButton onClick={handleClose}><CloseIcon/></IconButton>
                                    </h2>
                                }

                                <TextField
                                    value={inputName}
                                    label="Program Study Name"
                                    onChange={(e) => setInputName(e.target.value)}
                                    fullWidth
                                    required
                                />
                                {modalType === 'create' &&
                                    <LectureListOption
                                        data={formData.lectureData}
                                        toggleRoleId={inputLectureId}
                                    />
                                }
                                {modalType === 'update' &&
                                    <LectureListOption
                                        data={formData.lectureData}
                                        toggleRoleId={inputLectureId}
                                        optionValue={userData.idLecture}
                                    />
                                }

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
                                <Typography variant='h6'>Are you sure you want to delete this Program Study?</Typography>
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
