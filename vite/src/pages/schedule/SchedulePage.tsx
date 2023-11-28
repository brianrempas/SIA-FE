import ScheduleTable from "./ScheduleTable"
import ScheduleForm from "./ScheduleForm";
import { useAppDispatch, useAppSelector } from '../../reducers/hooks'
import { selectLectureData, selectStudentData, selectSubjectData, setScheduleData } from '../../reducers/AllDataSlice'
import { useEffect } from 'react'
import { setSnackbar } from "../../reducers/snackbar";
import { selectScheduleData, selectProdiData } from '../../reducers/AllDataSlice';
import { useGetScheduleQuery, useCreateScheduleMutation, useUpdateScheduleMutation, useDeleteScheduleMutation } from "../../services/ScheduleService";
import { selectMixId, selectRole } from "../../reducers/authSlice";

export default function SchedulePage() {

    const dispatch = useAppDispatch()
    const scheduleData = useAppSelector(selectScheduleData)
    const prodiData = useAppSelector(selectProdiData)
    const subjectData = useAppSelector(selectSubjectData)
    const roleData = useAppSelector(selectRole)
    const studentData = useAppSelector(selectStudentData)
    const lectureData = useAppSelector(selectLectureData)
    const mixId = useAppSelector(selectMixId)

    const formData = {
        prodiData,
        subjectData,
        roleData,
        studentData,
        lectureData,
        mixId
    }


    if (roleData === '' || roleData === null) {
        return <h1>Unauthorized</h1>
    }

    const { data: getData, isSuccess: getIsSuccess, isError: getIsError, error: getError, isLoading: getLoading, refetch: getRefetch } =
        useGetScheduleQuery();
    const [createSchedule, { data: createData, isSuccess: createIsSuccess, isError: createIsError, error: createError, isLoading: createLoading }] =
        useCreateScheduleMutation();
    const [updateSchedule, { data: updateData, isSuccess: updateIsSuccess, isError: updateIsError, error: updateError, isLoading: updateLoading }] =
        useUpdateScheduleMutation();
    const [deleteSchedule, { data: deleteData, isSuccess: deleteIsSuccess, isError: deleteIsError, error: deleteError, isLoading: deleteLoading }] =
        useDeleteScheduleMutation();


    const submitSignup = async (n: any) => {
        await createSchedule(n)
        refreshTable()
    }

    const submitUpdate = async (data: any) => {
        await updateSchedule(data);
        refreshTable();
    };

    const submitDelete = async (inputId: number) => {
        await deleteSchedule(inputId);
        refreshTable();
    };

    const refreshTable = async () => {
        await getRefetch();
    };


    useEffect(() => {
        if (getIsSuccess) {
            dispatch(setScheduleData({ scheduleData: getData?.result }));
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
                    message: "Create Schedule Success",
                    alertColor: "success",
                })
            );
        }
        if (createIsError) {
            dispatch(
                setSnackbar({
                    open: true,
                    message: "Create Schedule Failed",
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
                    message: "Update Schedule Success",
                    alertColor: "success",
                })
            );
        }
        if (updateIsError) {
            dispatch(
                setSnackbar({
                    open: true,
                    message: "Update Schedule Failed",
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
                    message: "Delete Schedule Success",
                    alertColor: "success",
                })
            );
        }
        if (deleteIsError) {
            dispatch(
                setSnackbar({
                    open: true,
                    message: "Delete Schedule Failed",
                    alertColor: "error",
                })
            );
        }
    }, [deleteIsSuccess, deleteIsError]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <h1>Schedule Page</h1>
            {roleData === 'admin' && (
                <ScheduleForm formData={formData} modal='CU' toggleSubmit={submitSignup} />
            )}
            <ScheduleTable formData={formData} data={scheduleData} toggleSubmitDelete={submitDelete} toggleSubmitUpdate={submitUpdate} />
        </div>
    )
}
