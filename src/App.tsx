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
import LecturePage from "./pages/lecture";
import StudentPage from "./pages/Auth/student/StudentPage";
import { getAny } from "./services/api";
import { useAppDispatch } from "./reducers/hooks";
import { setAllData } from "./reducers/AllDataSlice";



function App() {

  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJyaWFucmVtcGFzIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjk5OTY3MjQ3fQ.87G1ceVjFiFnxMw9vi-SXSExmnobsuPpaphl2zbAtRU';
  const dispatch = useAppDispatch()

  async function fetchAll(){
    const fetchUser = await getAny( token, 'http://localhost:3000/api/user')
    const fetchSubject = await getAny( token, 'http://localhost:3000/api/subject')
    const fetchLecture = await getAny( token, 'http://localhost:3000/api/lecture')
    const fetchStudent = await getAny( token, 'http://localhost:3000/api/student')
    console.log(fetchUser)
    console.log(fetchSubject)
    console.log(fetchLecture)
    console.log(fetchStudent)

    dispatch(setAllData({ 
      userData: fetchUser.data.result,
      subjectData: fetchSubject.data.result,
      lectureData: fetchLecture.data.result,
      studentData: fetchStudent.data.result,
    }));
  }


  useEffect(() => {
    fetchAll()
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/lecture" element={<LecturePage />} />
          </Route>
        </Route>
        <Route path="/" element={<PublicRoute />}>
          <Route path="/student" element={<StudentPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
