import { Box } from "@mui/material";

import Summaries from "./Summaries";
import { useAppSelector } from "../../reducers/hooks";
import { selectStudentData, selectLectureData, selectUserData, selectSubjectData, selectProdiData, selectScheduleData, selectScoreData } from "../../reducers/AllDataSlice";
import { selectAuth } from "../../reducers/authSlice";



function Dashboard() {
  const studentData = useAppSelector(selectStudentData)
  const lectureData = useAppSelector(selectLectureData)
  const userData = useAppSelector(selectUserData)
  const subjectData = useAppSelector(selectSubjectData)
  const prodiData = useAppSelector(selectProdiData)
  const scheduleData = useAppSelector(selectScheduleData)
  const personalData = useAppSelector(selectAuth)
  const scoreData = useAppSelector(selectScoreData)

  const data = {
    studentData,
    lectureData,
    userData,
    subjectData,
    prodiData,
    scheduleData,
    personalData,
    scoreData
  }
  console.log(personalData)

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      }}
    >
      <Summaries data={data} />
    </Box>
  );
}

export default Dashboard;
