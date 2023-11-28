import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from '@mui/material';
import ScheduleForm from './ScheduleForm';

export default function ScheduleTable({
  formData,
  data,
  toggleSubmitUpdate,
  toggleSubmitDelete,
}: any) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const calculateNo = (index: number) => page * rowsPerPage + index + 1;

  const findProdiById = (id: number) =>
    formData.prodiData.find((prodi: any) => prodi.prodi_id === id);

  const findSubjectById = (id: number) =>
    formData.subjectData.find((subject: any) => subject.subject_id === id);

  const filterDataByRole = () => {
    switch (formData.roleData) {
      case 'admin':
        return data;
      case 'student':
        const filterData = formData.studentData.find((value: any) => value.student_id === formData.mixId)
        const studentIds = formData.prodiData
          .filter((value) => value.prodi_id === filterData.idProdi)
          .map((value) => value.prodi_id);
          console.log(data)

        return data.filter((value: any) => studentIds.includes(value.idProdi));
      case 'lecture':
        const prodiIds = formData.prodiData
          .filter((value) => value.idLecture === formData.mixId)
          .map((value) => value.prodi_id);
          console.log(data)
        return data.filter((value: any) => prodiIds.includes(value.idProdi));
      default:
        return [];
    }
  };
  
  const filteredData = filterDataByRole();
  
  return (
    <div>
      <TableContainer component={Paper} style={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Program Study</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Day</TableCell>
              <TableCell>Time</TableCell>
              {formData.roleData === 'admin' && <TableCell>Action</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((rowData: any, index: number) => (
                <TableRow key={rowData.schedule_id}>
                  <TableCell>{calculateNo(index)}</TableCell>
                  <TableCell>{rowData.schedule_id}</TableCell>
                  <TableCell>{findProdiById(rowData.idProdi)?.name}</TableCell>
                  <TableCell>{findSubjectById(rowData.idSubject)?.name}</TableCell>
                  <TableCell>{rowData.day}</TableCell>
                  <TableCell>{`${rowData.timeStart} - ${rowData.timeEnd} WITA`}</TableCell>

                  {formData.roleData === 'admin' && (
                    <TableCell style={{ display: 'flex', gap: '0', alignItems: 'center', flexWrap: 'wrap' }}>
                      <ScheduleForm formData={formData} userData={rowData} toggleSubmit={toggleSubmitDelete} modal="delete" />
                      <ScheduleForm formData={formData} userData={rowData} toggleSubmit={toggleSubmitUpdate} modal="CU" />
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
