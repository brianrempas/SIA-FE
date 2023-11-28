import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material';

export default function ScoreStTable({ formData, idProdi, idSubjects, toggleCreate, toggleUpdate }: any) {
    const studentData = formData.studentData;
    const scoreData = formData.scoreData;

    const studentsInProdi = studentData.filter((student: { idProdi: any }) => idProdi === student.idProdi);
    console.log(idSubjects)
    const studentsWithScores = studentsInProdi.filter(student =>
        scoreData.some(score => score.idStudent === student.student_id)
    );
    // filter student data who is in the score table (meaning has took some changes to the score)

    const studentsWithoutScores = studentsInProdi.filter(student =>
        !scoreData.some(score => score.idStudent === student.student_id)
    );
    // filter student data who hasnt been scored

    const studentsCombined = studentsInProdi.map(student => {
        let hasScored = studentsWithScores.some(s => s.student_id === student.student_id);
        if (hasScored) {
            hasScored = scoreData.some(s => s.idSubject === idSubjects)
        }
        const idScore = hasScored ? scoreData.find(s => s.idSubject === idSubjects).score_id : null;
        const idSubject = hasScored ? scoreData.find(s => s.idSubject === idSubjects).idSubject : null;

        return {
            ...student,
            hasScored,
            idScore,
            idSubject
        };
    });
    const studentDataFix = studentsCombined.map(student => {
        const data = scoreData.find(s => s.score_id === student.idScore);
        const scoreId = data ? data.score_id : student.idScore;
        const idStudent = data ? data.idStudent : student.student_id;
        const idProdi = data ? data.idProdi : student.idProdi;
        const idSubject = data ? data.idSubject : idSubjects;
        const input = data ? data.input : '';
        const hasScored = student.hasScored;
        return {
            scoreId,
            idStudent,
            idProdi,
            idSubject,
            input,
            hasScored
        };
    });
    // score data version of previous student data (for table purposes)

    const [input, setInput] = useState(studentDataFix.map((s: any) => s.input));
    const [isButtonVisible, setIsButtonVisible] = useState(false);

    const changeInput = (event: SelectChangeEvent, index: number) => {
        const updatedInput = [...input];
        updatedInput[index] = event.target.value;
        setInput(updatedInput);
        setIsButtonVisible(true);
    };

    let n = 1;

    function incrementN() {
        return n++;
    }

    const findProdiById = (id: number) => {
        return formData.prodiData.find((prodi: any) => prodi.prodi_id === id);
    };
    const findStudentById = (id: number) => {
        return formData.studentData.find((student: any) => student.student_id === id);
    };
    const findSubjectById = (id: number) => {
        return formData.subjectData.find((subject: any) => subject.subject_id === id);
    };

    const data = studentDataFix.map((object, index) => {
        let inputPrep = '';

        if (input[index] !== '') {
            inputPrep = input[index];
        } else {
            inputPrep = '';
        }

        return {
            ...object,
            input: inputPrep
        };
    });

    function handleSubmit() {
        const dataFirst = data.filter((v: any) => v.input !== '');
        const dataUpdate = data.filter((v: any) => v.hasScored === true);
        const dataCreate = data.filter((v: any) => v.hasScored === false);

        toggleUpdate(dataUpdate);
        toggleCreate(dataCreate);
    }

    return (
        <div>
            {/*<Button
                id='buttonUpdate'
                sx={{ m: 3, ml: 0, display: isButtonVisible ? 'block' : 'none' }}
                variant='contained'
                onClick={() => handleSubmit()}
            >
                Update Changes
    </Button>*/}
            <TableContainer
                component={Paper}
                sx={{
                    position: 'relative', // Ensure the table container has a position
                    overflowX: 'initial'
                }}
            >
                <Table stickyHeader aria-label='sticky table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>ID</TableCell>
                            <TableCell>Student Full Name</TableCell>
                            <TableCell>Program Study</TableCell>
                            <TableCell>Subject</TableCell>
                            <TableCell>Final Score</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {studentDataFix.map((rowData: any, index: any) => (
                            <TableRow key={rowData.idStudent}>
                                <TableCell>{incrementN()}</TableCell>
                                <TableCell>{rowData.idStudent}</TableCell>
                                <TableCell>{findStudentById(rowData.idStudent)?.name}</TableCell>
                                <TableCell>{findProdiById(rowData.idProdi)?.name}</TableCell>
                                <TableCell>{findSubjectById(rowData.idSubject)?.name}</TableCell>
                                <TableCell>{rowData?.input}</TableCell>
                                <TableCell
                                    style={{ display: 'flex', gap: '0', alignItems: 'center', flexWrap: 'wrap' }}
                                >
                                    <FormControl>
                                        <FormControl>
                                            <InputLabel>Rate</InputLabel>
                                            <Select
                                                value={input[index]}
                                                label='Rate'
                                                sx={{ width: 80 }}
                                                onChange={(event) => changeInput(event, index)}
                                            >
                                                <MenuItem value={''}>...</MenuItem>
                                                <MenuItem value={'A+'}>A+</MenuItem>
                                                <MenuItem value={'A'}>A</MenuItem>
                                                <MenuItem value={'A-'}>A-</MenuItem>
                                                <MenuItem value={'B+'}>B+</MenuItem>
                                                <MenuItem value={'B'}>B</MenuItem>
                                                <MenuItem value={'B-'}>B-</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </FormControl>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button
                id='buttonUpdate'
                sx={{ mt: 3, mb: 3, display: isButtonVisible ? 'block' : 'none' }}
                variant='contained'
                onClick={() => handleSubmit()}
            >
                Update Changes
            </Button>
        </div>
    );
}
