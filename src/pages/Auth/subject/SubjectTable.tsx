import SubjectForm from "./SubjectForm";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function SubjectTable({ data, toggleSubmitUpdate, toggleSubmitDelete }: any) {
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
                <TableCell>Code</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>SKS</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Updated At</TableCell>
                <TableCell>Action</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {data.map((data: any) => (
                <TableRow key={data.subject_id}>
                <TableCell>{incrementN()}</TableCell>
                <TableCell>{data.subject_id}</TableCell>
                <TableCell>{data.code}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.sks}</TableCell>
                <TableCell>{data.createdAt}</TableCell>
                <TableCell>{data.updatedAt}</TableCell>
                <TableCell>
                <SubjectForm userData={data} toggleSubmit={toggleSubmitDelete} modal='delete'/>
                <SubjectForm userData={data} toggleSubmit={toggleSubmitUpdate} modal='CU'/></TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    )
}
