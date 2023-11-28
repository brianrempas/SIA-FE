import SubjectTable from "./SubjectTable"
import SubjectForm from "./SubjectForm";
import { useAppDispatch, useAppSelector } from '../../reducers/hooks'
import { selectProdiData, setSubjectData } from '../../reducers/AllDataSlice'
import { useEffect } from 'react'
import { setSnackbar } from "../../reducers/snackbar";
import { selectSubjectData } from '../../reducers/AllDataSlice';
import { useGetSubjectQuery, useCreateSubjectMutation, useUpdateSubjectMutation, useDeleteSubjectMutation } from "../../services/SubjectService";
import { selectRole } from "../../reducers/authSlice";

export default function SubjectPage() {

    const dispatch = useAppDispatch()
    const subjectData = useAppSelector(selectSubjectData)

    const roleData = useAppSelector(selectRole)
    const prodiData = useAppSelector(selectProdiData)
    const formData = {
        prodiData
    }

    if (roleData !== 'admin'){
        return <h1>Unauthorized</h1>
    }
    
    const { data: getData, isSuccess: getIsSuccess, isError: getIsError, error: getError, isLoading: getLoading, refetch: getRefetch } =
        useGetSubjectQuery();
    const [createSubject, { data: createData, isSuccess: createIsSuccess, isError: createIsError, error: createError, isLoading: createLoading }] =
        useCreateSubjectMutation();
    const [updateSubject, { data: updateData, isSuccess: updateIsSuccess, isError: updateIsError, error: updateError, isLoading: updateLoading }] =
        useUpdateSubjectMutation();
    const [deleteSubject, { data: deleteData, isSuccess: deleteIsSuccess, isError: deleteIsError, error: deleteError, isLoading: deleteLoading }] =
        useDeleteSubjectMutation();


    const submitSignup = async (n: any) => {
        await createSubject(n)
        refreshTable()
    }

    const submitUpdate = async (data: any) => {
        await updateSubject(data);
        refreshTable();
    };

    const submitDelete = async (inputId: number) => {
        await deleteSubject(inputId);
        refreshTable();
    };

    const refreshTable = async () => {
        await getRefetch();
    };


    useEffect(() => {
        if (getIsSuccess) {
            dispatch(setSubjectData({ subjectData: getData?.result }));
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
                    message: "Create Subject Success",
                    alertColor: "success",
                })
            );
        }
        if (createIsError) {
            dispatch(
                setSnackbar({
                    open: true,
                    message: "Create Subject Failed",
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
                    message: "Update Subject Success",
                    alertColor: "success",
                })
            );
        }
        if (updateIsError) {
            dispatch(
                setSnackbar({
                    open: true,
                    message: "Update Subject Failed",
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
                    message: "Delete Subject Success",
                    alertColor: "success",
                })
            );
        }
        if (deleteIsError) {
            dispatch(
                setSnackbar({
                    open: true,
                    message: "Delete Subject Failed",
                    alertColor: "error",
                })
            );
        }
    }, [deleteIsSuccess, deleteIsError]);

    return (
        <div style={{display:'flex', flexDirection:'column', gap:10}}>
            <h1>Subject Page</h1>
            <SubjectForm formData={formData} modal='CU' toggleSubmit={submitSignup} />
            <SubjectTable formData={formData} data={subjectData} toggleSubmitDelete={submitDelete} toggleSubmitUpdate={submitUpdate}/>
        </div>
    )
}
