import LectureTable from "./LectureTable"
import LectureForm from "./LectureForm";
import { useAppDispatch, useAppSelector } from '../../../reducers/hooks'
import { setLectureData } from '../../../reducers/AllDataSlice'
import { createAny, getAny, updateAny, deleteAny } from '../../../services/api'
import { selectLectureData } from '../../../reducers/AllDataSlice';
import { useEffect } from 'react'
import { useGetLectureQuery, useCreateLectureMutation, useUpdateLectureMutation, useDeleteLectureMutation } from "../../../services/LectureService";
import { setSnackbar } from "../../../reducers/snackbar";

export default function LecturePage() {

    const dispatch = useAppDispatch()
    const lectureData = useAppSelector(selectLectureData)

    const { data: getData, isSuccess: getIsSuccess, isError: getIsError, error: getError, isLoading: getLoading, refetch: getRefetch } =
        useGetLectureQuery();
    const [createLecture, { data: createData, isSuccess: createIsSuccess, isError: createIsError, error: createError, isLoading: createLoading }] =
        useCreateLectureMutation();
    const [updateLecture, { data: updateData, isSuccess: updateIsSuccess, isError: updateIsError, error: updateError, isLoading: updateLoading }] =
        useUpdateLectureMutation();
    const [deleteLecture, { data: deleteData, isSuccess: deleteIsSuccess, isError: deleteIsError, error: deleteError, isLoading: deleteLoading }] =
        useDeleteLectureMutation();

    const submitSignup = async (n: any) => {
        await createLecture(n);
        refreshTable();
    };

    const submitUpdate = async (data: any) => {
        await updateLecture(data);
        refreshTable();
    };

    const submitDelete = async (inputId: number) => {
        await deleteLecture(inputId);
        refreshTable();
    };

    const refreshTable = async () => {
        await getRefetch();
    };

    useEffect(() => {
        if (getIsSuccess) {
            console.log('Refresh Success')
            dispatch(setLectureData({ lectureData: getData?.result }));
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
            <h1>Lecture Page</h1>
            <LectureForm modal='CU' toggleSubmit={submitSignup} />
            <LectureTable data={lectureData} toggleSubmitDelete={submitDelete} toggleSubmitUpdate={submitUpdate} />
        </>
    )
}
