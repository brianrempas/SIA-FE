import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import { useAppSelector } from '../../reducers/hooks';
import { selectMixId, selectRole } from '../../reducers/authSlice';
import { selectLectureData, selectStudentData } from '../../reducers/AllDataSlice';

export default function ProfilPage() {

    const mixId = useAppSelector(selectMixId)
    const role = useAppSelector(selectRole)
    const studentData = useAppSelector(selectStudentData)
    const lectureData = useAppSelector(selectLectureData)
    let data: any

    switch (role) {
        case 'student':
            data = studentData.find(v => v.student_id === mixId)
            console.log(data)
            break;
        case 'lecture':
            data = lectureData.find(v => v.lecture_id === mixId)
            console.log(data)
            break;
        default:
            return

    }
    return (
        <>
            <h1>Profile</h1>
            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{width: '30%'}}>{data.nip ? 'NIP' : 'NIM'}</TableCell>
                            <TableCell>: {data.nip || data.nim}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Full Name</TableCell>
                            <TableCell>: {data.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell>: {data.email}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Gender</TableCell>
                            <TableCell>: {data.gender}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
