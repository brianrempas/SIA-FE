import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import { StudentListOption } from '../student/StudentList';
import { LectureListOption } from '../lecture/LectureList';
import { IconButton, Tooltip, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


export default function UserForm({ formData, userData, toggleSubmit, modal }: any) {
  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [inputUsername, setInputUsername] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [roleId, setRoleId] = useState(0);
  const [lectureId, setLectureId] = useState(0);
  const [studentId, setStudentId] = useState(0);
  const [modalType, setModalType] = useState('create')

  let data = {
    username: inputUsername,
    password: inputPassword,
    role: selectedRole,
    mixId: roleId,
    userId: userData ? userData.user_id : 0
  };

  useEffect(() => {
    if (userData) {
      setModalType('update');
      setSelectedRole(userData.role);
      setInputUsername(userData.username);
      setInputPassword('');
      setLectureId(userData.lecture_id);
      setStudentId(userData.student_id);
  
      if (userData.role === 'lecture') {
        data.mixId = userData.lecture_id;
      } else if (userData.role === 'student') {
        data.mixId = userData.student_id;
      }
    } else {
      setModalType('create');
      setSelectedRole('');
      setInputUsername('');
      setInputPassword('');
      setLectureId(0);
      setStudentId(0);
    }
  }, [open]);
  
  function inputRoleId(data: any) {
    setRoleId(data);
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRole(event.target.value);
  };

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    toggleSubmit(data);
    setOpen(false)
  }

  function handleSubmitDelete(event: React.FormEvent) {
    event.preventDefault();
    toggleSubmit(data.userId);
    setOpen(false)
  }

  return (
    <>

      {modal === 'CU' && (
        <div>

          {modalType === 'create' &&
            <Button variant="contained" onClick={handleOpen}>
              Create User
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
                    Create User <IconButton onClick={handleClose}><CloseIcon /></IconButton>
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
                    Update User <IconButton onClick={handleClose}><CloseIcon /></IconButton>
                  </h2>
                }
                <TextField
                  value={inputUsername}
                  label="Username"
                  onChange={(e) => setInputUsername(e.target.value)}
                  fullWidth
                  required
                />
                {modalType === 'create' &&
                  <TextField
                    value={inputPassword}
                    label="Password"
                    type='password'
                    onChange={(e) => setInputPassword(e.target.value)}
                    fullWidth
                    required
                  />
                }
                {modalType === 'update' &&
                  <TextField
                    value={inputPassword}
                    label="New Password?"
                    type='password'
                    onChange={(e) => setInputPassword(e.target.value)}
                    fullWidth
                  />
                }
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Role
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={selectedRole}
                    onChange={handleRoleChange}
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="student"
                      control={<Radio />}
                      label="Student"
                      required
                    />
                    <FormControlLabel
                      value="lecture"
                      control={<Radio />}
                      label="Lecture"
                      required
                    />
                    <FormControlLabel
                      value="admin"
                      control={<Radio />}
                      label="Admin"
                      required
                    />
                  </RadioGroup>
                </FormControl>
                {modalType === 'create' &&
                  <>
                    {(selectedRole === 'student') && (
                      <StudentListOption
                        data={formData.studentData}
                        toggleRoleId={inputRoleId}
                      />
                    )}
                    {(selectedRole === 'lecture') && (
                      <LectureListOption
                        data={formData.lectureData}
                        toggleRoleId={inputRoleId}
                      />
                    )}
                  </>
                }

                {modalType === 'update' &&
                  <>
                    {(selectedRole === 'student') && (
                      <StudentListOption
                        data={formData.studentData}
                        toggleRoleId={inputRoleId}
                        optionValue={userData.student_id}
                      />
                    )}
                    {(selectedRole === 'lecture') && (
                      <LectureListOption
                        data={formData.lectureData}
                        toggleRoleId={inputRoleId}
                        optionValue={userData.lecture_id}
                      />
                    )}
                  </>
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
                  gap: 2
                }}
              >
                <h2
                  style={{
                    justifyContent: 'space-between',
                    display: 'flex',
                  }}
                  id="modal-title"
                >
                  Delete User <IconButton onClick={handleClose}><CloseIcon /></IconButton>
                </h2>
                <Typography variant='h6'>Are you sure you want to delete this user?</Typography>
                <Button variant="contained" type="submit">
                  Delete
                </Button>
              </Box>
            </form>
          </Modal>
        </div>
      )}
    </>
  );
}
