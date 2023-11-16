import StudentTable from "./StudentTable"
import StudentForm from "./StudentForm";
import { useAppDispatch, useAppSelector } from '../../../reducers/hooks'
import { setStudentData } from '../../../reducers/AllDataSlice'
import { selectStudentData } from '../../../reducers/AllDataSlice';
import { useGetStudentQuery, useCreateStudentMutation, useUpdateStudentMutation, useDeleteStudentMutation } from "../../../services/StudentService";
import { setSnackbar } from "../../../reducers/snackbar";
import { useEffect } from "react";


export default function StudentPage() {

    const dispatch = useAppDispatch()
    const studentData = useAppSelector(selectStudentData)

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
            console.log('Refresh Success')
            dispatch(setStudentData({ studentData: getData?.result }));
        }
        if (getIsError) {
            console.log('error: ' + getError)
        }
    }, [getIsSuccess, getIsError]);


    useEffect(() => {
        if (createIsSuccess) {
            dispatch(
                setSnackbar({
                    open: true,
                    message: "Create User Success",
                    alertColor: "success",
                })
            );
        }
        if (createIsError) {
            dispatch(
                setSnackbar({
                    open: true,
                    message: "Create User Failed",
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
                    message: "Update User Success",
                    alertColor: "success",
                })
            );
        }
        if (updateIsError) {
            dispatch(
                setSnackbar({
                    open: true,
                    message: "Update User Failed",
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
                    message: "Delete User Success",
                    alertColor: "success",
                })
            );
        }
        if (deleteIsError) {
            dispatch(
                setSnackbar({
                    open: true,
                    message: "Delete User Failed",
                    alertColor: "error",
                })
            );
        }
    }, [deleteIsSuccess, deleteIsError]);

    return (
        <>
            <h1>Student Page</h1>
            <StudentForm modal='CU' toggleSubmit={submitSignup} />
            <StudentTable data={studentData} toggleSubmitDelete={submitDelete} toggleSubmitUpdate={submitUpdate} />
        </>
    )
}
