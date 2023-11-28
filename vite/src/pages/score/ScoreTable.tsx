import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import ScoreForm from "./ScoreForm";

export default function ScoreTable({ formData, data, toggleSubmitCreate, toggleSubmitUpdate }: any) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    let n = page * rowsPerPage + 1;

    function incrementN() {
        return n++;
    }

    const findProdiById = (id: number) => {
        return formData.prodiData.find((prodi: any) => prodi.prodi_id === id);
    };

    const findLectureById = (id: number) => {
        return formData.lectureData.find((lecture: any) => lecture.lecture_id === id);
    };

    const findStudentById = (id: number) => {
        return formData.studentData.find((student: any) => student.student_id === id);
    };

    const findSubjectById = (id: number) => {
        return formData.subjectData.find((subject: any) => subject.subject_id === id);
    };

    return (
        <div>
            <TableContainer component={Paper}>
                {formData.roleData === 'lecture' && (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>No</TableCell>
                                <TableCell>ID</TableCell>
                                <TableCell>Program Study</TableCell>
                                <TableCell>Subject Name</TableCell>
                                <TableCell>Lecturer</TableCell>
                                <TableCell>SKS</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((rowData: any) => (
                                <TableRow key={rowData.subject_id}>
                                    <TableCell>{incrementN()}</TableCell>
                                    <TableCell>{rowData.subject_id}</TableCell>
                                    <TableCell>{findProdiById(rowData.idProdi)?.name}</TableCell>
                                    <TableCell>{rowData.name}</TableCell>
                                    <TableCell>{findLectureById(findProdiById(rowData.idProdi)?.idLecture).name}</TableCell>
                                    <TableCell>{rowData.sks}</TableCell>
                                    <TableCell style={{ display: "flex", gap: "0", alignItems: "center", flexWrap: "wrap" }}>
                                        <ScoreForm formData={formData} userData={rowData} toggleSubmit={toggleSubmitCreate} toggleUpdate={toggleSubmitUpdate} modal='scoreStudent' />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
                {formData.roleData === 'student' && (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>No</TableCell>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Program Study</TableCell>
                                <TableCell>Subject Name</TableCell>
                                <TableCell>Input</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((rowData: any) => (
                                <TableRow key={rowData.score_id}>
                                    <TableCell>{incrementN()}</TableCell>
                                    <TableCell>{rowData.score_id}</TableCell>
                                    <TableCell>{findStudentById(rowData.idStudent)?.name}</TableCell>
                                    <TableCell>{findSubjectById(rowData.idSubject)?.name}</TableCell>
                                    <TableCell>{findProdiById(rowData.idProdi)?.name}</TableCell>
                                    <TableCell>{rowData.input}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    )
}
