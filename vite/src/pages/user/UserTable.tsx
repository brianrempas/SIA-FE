import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import UserForm from './UserForm';

export default function UserTable({ formData, data, toggleSubmitUpdate, toggleSubmitDelete }: any) {
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

  const findMixById = ({idStudent, idLecture} : any) => {
      if(idStudent !== 0) {
        const result = formData.studentData.find((student: any) => student.student_id === idStudent);
        if(result === undefined) {
          return {
            name: 'unidentified st'
          }
        }
        return result
      } else if (idLecture !== 0) {
        const result = formData.lectureData.find((lecture: any) => lecture.lecture_id === idLecture);
        if(result === undefined) {
          return {
            name: 'unidentified le'
          }
        }
        return result
      } else {
        return {
          name: ''
        }
      }
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>User Full Name</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((rowData: any) => (
              <TableRow key={rowData.user_id}>
                <TableCell>{incrementN()}</TableCell>
                <TableCell>{rowData.user_id}</TableCell>
                <TableCell>{rowData.username}</TableCell>
                <TableCell>{rowData.role}</TableCell>
                <TableCell>{findMixById({idStudent: rowData.student_id, idLecture: rowData.lecture_id})?.name}</TableCell>
                <TableCell style={{ display: "flex", gap: "0", alignItems: "center", flexWrap: "nowrap" }}>
                  <UserForm userData={rowData} toggleSubmit={toggleSubmitDelete} modal='delete' />
                  <UserForm formData={formData} userData={rowData} toggleSubmit={toggleSubmitUpdate} modal='CU' />
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
  );
}
