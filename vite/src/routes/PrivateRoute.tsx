import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store";
import { useEffect } from "react";
import { useAppDispatch } from "../reducers/hooks";
import { setAllData } from "../reducers/AllDataSlice";
import { useGetLectureQuery } from "../services/LectureService";
import { useGetUserQuery } from "../services/UserService";
import { useGetStudentQuery } from "../services/StudentService";
import { useGetSubjectQuery } from "../services/SubjectService";
import { useGetProdiQuery } from "../services/ProdiService";
import { useGetScheduleQuery } from "../services/ScheduleService";
import { useGetScoreQuery } from "../services/ScoreService";

export const PrivateRoute = () => {

  const isLogin = useSelector((state: RootState) =>
    Boolean(state.authReducer.token)
  );

  const dispatch = useAppDispatch();

  const {
    data: lectureData,
    isSuccess: lectureSuccess,
    isLoading: lectureLoading,
    refetch: refetchLecture,
  } = useGetLectureQuery();

  const {
    data: subjectData,
    isSuccess: subjectSuccess,
    isLoading: subjectLoading,
    refetch: refetchSubject,
  } = useGetSubjectQuery();

  const {
    data: userData,
    isSuccess: userSuccess,
    isLoading: userLoading,
    refetch: refetchUser,
  } = useGetUserQuery();

  const {
    data: studentData,
    isSuccess: studentSuccess,
    isLoading: studentLoading,
    refetch: refetchStudent,
  } = useGetStudentQuery();

  const {
    data: prodiData,
    isSuccess: prodiSuccess,
    isLoading: prodiLoading,
    refetch: refetchProdi,
  } = useGetProdiQuery();

  const {
    data: scheduleData,
    isSuccess: scheduleSuccess,
    isLoading: scheduleLoading,
    refetch: refetchSchedule,
  } = useGetScheduleQuery();

  const {
    data: scoreData,
    isSuccess: scoreSuccess,
    isLoading: scoreLoading,
    refetch: refetchScore,
  } = useGetScoreQuery();


  const refreshData = () => {
    refetchLecture();
    refetchSubject();
    refetchUser();
    refetchStudent();
    refetchProdi();
    refetchSchedule();
    refetchScore();
  };

  useEffect(() => {
    if (isLogin) {
      refreshData();
    }
  }, [isLogin]);
  
  useEffect(() => {
    console.log(scoreData?.result)
    if (lectureSuccess && subjectSuccess && userSuccess && studentSuccess && prodiSuccess && scheduleSuccess && scoreSuccess) {
      dispatch(
        setAllData({
          userData: userData?.result,
          subjectData: subjectData?.result,
          lectureData: lectureData?.result,
          studentData: studentData?.result,
          prodiData: prodiData?.result,
          scheduleData: scheduleData?.result,
          scoreData: scoreData?.result
        })
      );
    }
  }, [lectureSuccess, subjectSuccess, userSuccess, studentSuccess, prodiSuccess, scheduleSuccess, scoreSuccess]);

  if (lectureLoading || subjectLoading || userLoading || studentLoading || prodiLoading || scheduleLoading || scoreLoading) {
    return <p>Loading...</p>;
  }

  return isLogin ? <Outlet /> : <Navigate to="/login" />;
};
