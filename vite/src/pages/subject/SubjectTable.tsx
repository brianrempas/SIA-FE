import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import SubjectForm from "./SubjectForm";

export default function SubjectTable({ formData, data, toggleSubmitUpdate, toggleSubmitDelete }: any) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    console.log(formData)
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
                            <TableCell>Code</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Program Study</TableCell>
                            <TableCell>SKS</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((rowData: any) => (
                            <TableRow key={rowData.subject_id}>
                                <TableCell>{incrementN()}</TableCell>
                                <TableCell>{rowData.subject_id}</TableCell>
                                <TableCell>{rowData.code}</TableCell>
                                <TableCell>{rowData.name}</TableCell>
                                <TableCell>{findProdiById(rowData.idProdi)?.name}</TableCell>
                                <TableCell>{rowData.sks}</TableCell>
                                <TableCell style={{ display: "flex", gap: "0", alignItems: "center", flexWrap: "wrap" }}>
                                    <SubjectForm formData={formData} userData={rowData} toggleSubmit={toggleSubmitDelete} modal='delete' />
                                    <SubjectForm formData={formData} userData={rowData} toggleSubmit={toggleSubmitUpdate} modal='CU' />
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
