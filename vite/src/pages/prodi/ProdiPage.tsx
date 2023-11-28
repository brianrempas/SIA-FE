import ProdiTable from "./ProdiTable"
import ProdiForm from "./ProdiForm";
import { useAppDispatch, useAppSelector } from '../../reducers/hooks'
import { selectLectureData, setProdiData } from '../../reducers/AllDataSlice'
import { selectUserData } from "../../reducers/AllDataSlice";
import { useEffect } from 'react'
import { setSnackbar } from "../../reducers/snackbar";
import { selectProdiData } from '../../reducers/AllDataSlice';
import { useGetProdiQuery, useCreateProdiMutation, useUpdateProdiMutation, useDeleteProdiMutation } from "../../services/ProdiService";
import { selectRole } from "../../reducers/authSlice";

export default function ProdiPage() {

    const dispatch = useAppDispatch()
    const prodiData = useAppSelector(selectProdiData)
    const lectureData = useAppSelector(selectLectureData)
    
    const formData = {
        lectureData
    }

    const roleData = useAppSelector(selectRole)

    if (roleData !== 'admin'){
        return <h1>Unauthorized</h1>
    }

    const { data: getData, isSuccess: getIsSuccess, isError: getIsError, error: getError, isLoading: getLoading, refetch: getRefetch } =
        useGetProdiQuery();
    const [createProdi, { data: createData, isSuccess: createIsSuccess, isError: createIsError, error: createError, isLoading: createLoading }] =
        useCreateProdiMutation();
    const [updateProdi, { data: updateData, isSuccess: updateIsSuccess, isError: updateIsError, error: updateError, isLoading: updateLoading }] =
        useUpdateProdiMutation();
    const [deleteProdi, { data: deleteData, isSuccess: deleteIsSuccess, isError: deleteIsError, error: deleteError, isLoading: deleteLoading }] =
        useDeleteProdiMutation();


    const submitSignup = async (n: any) => {
        await createProdi(n)
        refreshTable()
    }

    const submitUpdate = async (data: any) => {
        await updateProdi(data);
        refreshTable();
    };

    const submitDelete = async (inputId: number) => {
        await deleteProdi(inputId);
        refreshTable();
    };

    const refreshTable = async () => {
        await getRefetch();
    };


    useEffect(() => {
        if (getIsSuccess) {
            dispatch(setProdiData({ prodiData: getData?.result }));
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
                    message: "Create Prodi Success",
                    alertColor: "success",
                })
            );
        }
        if (createIsError) {
            dispatch(
                setSnackbar({
                    open: true,
                    message: "Create Prodi Failed",
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
                    message: "Update Prodi Success",
                    alertColor: "success",
                })
            );
        }
        if (updateIsError) {
            dispatch(
                setSnackbar({
                    open: true,
                    message: "Update Prodi Failed",
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
                    message: "Delete Prodi Success",
                    alertColor: "success",
                })
            );
        }
        if (deleteIsError) {
            dispatch(
                setSnackbar({
                    open: true,
                    message: "Delete Prodi Failed",
                    alertColor: "error",
                })
            );
        }
    }, [deleteIsSuccess, deleteIsError]);

    return (
        <div style={{display:'flex', flexDirection:'column', gap:10}}>
            <h1>Program Study Page</h1>
            <ProdiForm formData={formData} modal='CU' toggleSubmit={submitSignup} />
            <ProdiTable formData={formData} data={prodiData} toggleSubmitDelete={submitDelete} toggleSubmitUpdate={submitUpdate}/>
        </div>
    )
}
