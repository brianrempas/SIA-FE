import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import UserForm from './UserForm';

export default function UserTable({ data, toggleSubmitUpdate, toggleSubmitDelete }: any) {

  let n = 1;

  function incrementN() {
    return n++;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Updated At</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((data: any) => (
            <TableRow key={data.user_id}>
              <TableCell>{incrementN()}</TableCell>
              <TableCell>{data.user_id}</TableCell>
              <TableCell>{data.username}</TableCell>
              <TableCell>{data.role}</TableCell>
              <TableCell>{data.createdAt}</TableCell>
              <TableCell>{data.updatedAt}</TableCell>
              <TableCell><UserForm userData={data} toggleSubmit={toggleSubmitDelete} modal='delete'/>
              <UserForm userData={data} toggleSubmit={toggleSubmitUpdate} modal='CU'/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
