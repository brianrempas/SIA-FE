import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import StudentForm from "./StudentForm";

export default function StudentTable({ formData, data, toggleSubmitUpdate, toggleSubmitDelete }: any) {
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

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>ID</TableCell>
                            <TableCell>Full Name</TableCell>
                            <TableCell>Nim</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Program Study Assigned</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((rowData: any) => (
                            <TableRow key={rowData.student_id}>
                                <TableCell>{incrementN()}</TableCell>
                                <TableCell>{rowData.student_id}</TableCell>
                                <TableCell>{rowData.name}</TableCell>
                                <TableCell>{rowData.nim}</TableCell>
                                <TableCell>{rowData.email}</TableCell>
                                <TableCell>{rowData.gender}</TableCell>
                                <TableCell>{findProdiById(rowData.idProdi)?.name}</TableCell>
                                <TableCell style={{ display: "flex", gap: "0", alignItems: "center", flexWrap: "wrap" }}>
                                    <StudentForm formData={formData} userData={rowData} toggleSubmit={toggleSubmitDelete} modal='delete' />
                                    <StudentForm formData={formData} userData={rowData} toggleSubmit={toggleSubmitUpdate} modal='CU' />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
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
