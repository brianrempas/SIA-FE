import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import LoginPage from "./pages/Auth/LoginPage";
import { PrivateRoute } from "./routes/PrivateRoute";
import { PublicRoute } from "./routes/PublicRoute";
import Layout from "./Components/Layout";
import UserPage from "./pages/user/UserPage";
import SubjectPage from "./pages/subject/SubjectPage";
import LecturePage from "./pages/lecture/LecturePage";
import StudentPage from "./pages/student/StudentPage";
import ProdiPage from "./pages/prodi/ProdiPage"
import SchedulePage from "./pages/schedule/SchedulePage";
import ScorePage from "./pages/score/ScorePage";
import ProfilPage from "./pages/Auth/ProfilPage";


function App() {
  
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
            <Route path="/prodi" element={<ProdiPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/score" element={<ScorePage />} />
            <Route path="/profile" element={<ProfilPage />} />
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
