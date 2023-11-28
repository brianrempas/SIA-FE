import StudentTable from "./StudentTable"
import StudentForm from "./StudentForm";
import { useAppDispatch, useAppSelector } from '../../reducers/hooks'
import { selectProdiData, setStudentData } from '../../reducers/AllDataSlice'
import { selectStudentData, selectUserData } from '../../reducers/AllDataSlice';
import { useGetStudentQuery, useCreateStudentMutation, useUpdateStudentMutation, useDeleteStudentMutation } from "../../services/StudentService";
import { setSnackbar } from "../../reducers/snackbar";
import { useEffect } from "react";
import { selectRole } from "../../reducers/authSlice";


export default function StudentPage() {

    const dispatch = useAppDispatch()
    const studentData = useAppSelector(selectStudentData)
    const prodiData = useAppSelector(selectProdiData)
    const formData = {
        prodiData
    }

    const roleData = useAppSelector(selectRole)

    if (roleData !== 'admin'){
        return <h1>Unauthorized</h1>
    }

    const { data: getData, isSuccess: getIsSuccess, isError: getIsError, error: getError, isLoading: getLoading, refetch: getRefetch } =
        useGetStudentQuery();
    const [createStudent, { data: createData, isSuccess: createIsSuccess, isError: createIsError, error: createError, isLoading: createLoading }] =
        useCreateStudentMutation();
    const [updateStudent, { data: updateData, isSuccess: updateIsSuccess, isError: updateIsError, error: updateError, isLoading: updateLoading }] =
        useUpdateStudentMutation();
    const [deleteStudent, { data: deleteData, isSuccess: deleteIsSuccess, isError: deleteIsError, error: deleteError, isLoading: deleteLoading }] =
        useDeleteStudentMutation();


    const submitSignup = async (n: any) => {
        await createStudent(n)
        refreshTable()
    }

    const submitUpdate = async (data: any) => {
        await updateStudent(data);
        refreshTable();
    };

    const submitDelete = async (inputId: number) => {
        await deleteStudent(inputId);
        refreshTable();
    };

    const refreshTable = async () => {
        await getRefetch();
    };


    useEffect(() => {
        if (getIsSuccess) {
            dispatch(setStudentData({ studentData: getData?.result }));
        }
        if (getIsError) {
            console.log('error: ' + getError)
        }
    }, [getData, getIsSuccess, getIsError]);

    useEffect(() => {
        if (createIsSuccess) {
            dispatch(
                setSnackbar({
                    open: true,
                    message: "Create Student Success",
                    alertColor: "success",
                })
            );
        }
        if (createIsError) {
            dispatch(
                setSnackbar({
                    open: true,
                    message: "Create Student Failed",
                    alertColor: "error",
                })
            );
        }
    }, [createIsSuccess, createIsError]);

    useEffect(() => {
        if (updateIsSuccess) {
            dispatch(
                setSnackbar({
                    open: true,
                    message: "Update Student Success",
                    alertColor: "success",
                })
            );
        }
        if (updateIsError) {
            dispatch(
                setSnackbar({
                    open: true,
                    message: "Update Student Failed",
                    alertColor: "error",
                })
            );
        }
    }, [updateIsSuccess, updateIsError]);

    useEffect(() => {
        if (deleteIsSuccess) {
            dispatch(
                setSnackbar({
                    open: true,
                    message: "Delete Student Success",
                    alertColor: "success",
                })
            );
        }
        if (deleteIsError) {
            dispatch(
                setSnackbar({
                    open: true,
                    message: "Delete Student Failed",
                    alertColor: "error",
                })
            );
        }
    }, [deleteIsSuccess, deleteIsError]);

    return (
        <div style={{display:'flex', flexDirection:'column', gap:10}}>
            <h1>Student Page</h1>
            <StudentForm formData={formData} modal='CU' toggleSubmit={submitSignup} />
            <StudentTable formData={formData} data={studentData} toggleSubmitDelete={submitDelete} toggleSubmitUpdate={submitUpdate} />
        </div>
    )
}
