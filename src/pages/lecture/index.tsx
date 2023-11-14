import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useGetStudentQuery } from '../../services/StudentService';
import { useGetLectureQuery } from '../../services/LectureService';

export default function LecturePage() {

const {data } = useGetLectureQuery()

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>NIP</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Updated At</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.result.map((user) => (
            <TableRow key={user.lecture_id}>
              <TableCell>{user.lecture_id}</TableCell>
              <TableCell>{user.lecture_id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.nip}</TableCell>
              <TableCell>{user.createdAt}</TableCell>
              <TableCell>{user.updatedAt}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
