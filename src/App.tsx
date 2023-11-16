import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
// import TestLecture from './pages/lecture/TestLecture'
// import TestStudent from './pages/student/TestStudent'
// import TestSubject from './pages/subject/TestSubject'
// import TestUser from './pages/users/TestUser'
import Dashboard from "./pages/Dashboard/Dashboard";
import LoginPage from "./pages/Auth/LoginPage";
import { PrivateRoute } from "./routes/PrivateRoute";
import { PublicRoute } from "./routes/PublicRoute";
import Layout from "./Components/Layout";
//import StudentPage from "./pages/student";
import UserPage from "./pages/Auth/user/UserPage";
import SubjectPage from "./pages/Auth/subject/SubjectPage";
import LecturePage from "./pages/Auth/lecture/LecturePage";
import StudentPage from "./pages/Auth/student/StudentPage";
import { useAppDispatch } from "./reducers/hooks";
import { setAllData } from "./reducers/AllDataSlice";
import { useGetLectureQuery } from "./services/LectureService";
import { useGetUserQuery } from "./services/UserService";
import { useGetStudentQuery } from "./services/StudentService";
import { useGetSubjectQuery } from "./services/SubjectService";


function App() {
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

  const refreshData = () => {
    refetchLecture();
    refetchSubject();
    refetchUser();
    refetchStudent();
  };

  useEffect(() => {
    refreshData();
  }, []);

  useEffect(() => {
    if (lectureSuccess && subjectSuccess && userSuccess && studentSuccess) {
      dispatch(
        setAllData({
          userData: userData?.result,
          subjectData: subjectData?.result,
          lectureData: lectureData?.result,
          studentData: studentData?.result,
        })
      );
    }
  }, [lectureSuccess, subjectSuccess, userSuccess, studentSuccess]);

  if (lectureLoading || subjectLoading || userLoading || studentLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/lecture" element={<LecturePage />} />
            <Route path="/student" element={<StudentPage />} />
            <Route path="/subject" element={<SubjectPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
        <Route path="/" element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
