import ScoreTable from "./ScoreTable"
import ScoreForm from "./ScoreForm";
import { useAppDispatch, useAppSelector } from '../../reducers/hooks'
import { selectLectureData, selectProdiData, selectStudentData, selectSubjectData, setScoreData } from '../../reducers/AllDataSlice'
import { selectScoreData } from '../../reducers/AllDataSlice';
import { useGetScoreQuery, useCreateScoreMutation, useUpdateScoreMutation, useDeleteScoreMutation } from "../../services/ScoreService";
import { setSnackbar } from "../../reducers/snackbar";
import { useEffect } from "react";
import { selectMixId, selectRole } from "../../reducers/authSlice";
import ScoreStTable from "./ScoreStTable";

export default function ScorePage() {

    const dispatch = useAppDispatch()
    const scoreData = useAppSelector(selectScoreData)
    const prodiData = useAppSelector(selectProdiData)
    const subjectData = useAppSelector(selectSubjectData)
    const studentData = useAppSelector(selectStudentData)
    const lectureData = useAppSelector(selectLectureData)
    const mixId = useAppSelector(selectMixId)
    const roleData = useAppSelector(selectRole)

    const formData = {
        prodiData,
        studentData,
        subjectData,
        scoreData,
        lectureData,
        roleData
    }

    let prodiFilter: any
    let dataTable: any
    let flattenedArray: any = [];

    if (roleData === 'lecture') {
        prodiFilter = prodiData.filter((s) => s.idLecture === mixId);

        dataTable = prodiFilter.map((filteredProdi) => {
            const result = subjectData.filter(
                (subject) => subject.idProdi === filteredProdi.prodi_id
            );
            return {
                result
            };
        });

        flattenedArray = [].concat(...dataTable.map(item => item.result));
    } else if (roleData === 'student') {
        flattenedArray = scoreData.filter((score) => score.idStudent === mixId)
        console.log(flattenedArray)
    }

    const { data: getData, isSuccess: getIsSuccess, isError: getIsError, error: getError, isLoading: getLoading, refetch: getRefetch } =
        useGetScoreQuery();
    const [createScore, { data: createData, isSuccess: createIsSuccess, isError: createIsError, error: createError, isLoading: createLoading }] =
        useCreateScoreMutation();
    const [updateScore, { data: updateData, isSuccess: updateIsSuccess, isError: updateIsError, error: updateError, isLoading: updateLoading }] =
        useUpdateScoreMutation();
    const [deleteScore, { data: deleteData, isSuccess: deleteIsSuccess, isError: deleteIsError, error: deleteError, isLoading: deleteLoading }] =
        useDeleteScoreMutation();


    const submitCreate = async (n: any) => {
        await createScore(n)
        refreshTable()
    }

    const submitUpdate = async (data: any) => {
        await updateScore(data);
        refreshTable();
    };

    const submitDelete = async (inputId: number) => {
        await deleteScore(inputId);
        refreshTable();
    };

    const refreshTable = async () => {
        await getRefetch();
    };


    useEffect(() => {
        if (getIsSuccess) {
            dispatch(setScoreData({ scoreData: getData?.result }));
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
                    message: "Create Score Success",
                    alertColor: "success",
                })
            );
        }
        if (createIsError) {
            dispatch(
                setSnackbar({
                    open: true,
                    message: "Create Score Failed",
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
                    message: "Update Score Success",
                    alertColor: "success",
                })
            );
        }
        if (updateIsError) {
            dispatch(
                setSnackbar({
                    open: true,
                    message: "Update Score Failed",
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
                    message: "Delete Score Success",
                    alertColor: "success",
                })
            );
        }
        if (deleteIsError) {
            dispatch(
                setSnackbar({
                    open: true,
                    message: "Delete Score Failed",
                    alertColor: "error",
                })
            );
        }
    }, [deleteIsSuccess, deleteIsError]);

    //formData: Program Study for names in table, Student is for store data to student options.
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <h1>Score Page</h1>
            <ScoreTable formData={formData} data={flattenedArray} toggleSubmitCreate={submitCreate} toggleSubmitUpdate={submitUpdate} />

        </div>
    )
}

