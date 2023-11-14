import LectureForm from "./LectureForm";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function LectureTable({ data, toggleSubmitUpdate, toggleSubmitDelete }: any) {
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
                <TableCell>Name</TableCell>
                <TableCell>NIP</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Updated At</TableCell>
                <TableCell>Action</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {data.map((data: any) => (
                <TableRow key={data.lecture_id}>
                <TableCell>{incrementN()}</TableCell>
                <TableCell>{data.lecture_id}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.nip}</TableCell>
                <TableCell>{data.email}</TableCell>
                <TableCell>{data.createdAt}</TableCell>
                <TableCell>{data.updatedAt}</TableCell>
                <TableCell>
                <LectureForm userData={data} toggleSubmit={toggleSubmitDelete} modal='delete'/>
                <LectureForm userData={data} toggleSubmit={toggleSubmitUpdate} modal='CU'/></TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    )
}
