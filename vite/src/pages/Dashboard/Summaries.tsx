import {
  GroupOutlined,
  SchoolOutlined,
  PeopleOutlineOutlined,
  PersonOutlineOutlined,
  MenuBookOutlined,
  EventNoteOutlined,
} from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import Card from '@mui/material/Card';
import { Link } from "react-router-dom";
import { useAppSelector } from "../../reducers/hooks";
import { selectRole } from "../../reducers/authSlice";
import PortraitIcon from '@mui/icons-material/Portrait';
import GradeIcon from '@mui/icons-material/Grade';

const Summaries = (allData: any) => {

  const roleData = useAppSelector(selectRole)
  let dataSummaries:any = []
  

  if (roleData === 'admin') {
    dataSummaries = [
      {
        title: "Total Students",
        value: allData.data.studentData.length,
        icon: <PeopleOutlineOutlined fontSize="medium" />,
        path: "/student",
      },
      {
        title: "Total Lecturers",
        value: allData.data.lectureData.length,
        icon: <PeopleOutlineOutlined fontSize="medium" />,
        path: "/lecture",
      },
      {
        title: "Total Users",
        value: allData.data.userData.length,
        icon: <PersonOutlineOutlined fontSize="medium" />,
        path: "/user",
      },
      {
        title: "Total Subjects",
        value: allData.data.subjectData.length,
        icon: <MenuBookOutlined fontSize="medium" />,
        path: "/subject",
      },
      {
        title: "Total Program Studies",
        value: allData.data.prodiData.length,
        icon: <SchoolOutlined fontSize="medium" />,
        path: "/prodi",
      },
      {
        title: "Total Schedules",
        value: allData.data.scheduleData.length,
        icon: <EventNoteOutlined fontSize="medium" />,
        path: "/schedule",
      },
    ];
  } else if (roleData === 'student') {
    dataSummaries = [
      {
        title: "Press to View",
        value: 'Profile',
        icon: <PortraitIcon fontSize="medium" />,
        path: "/profile",
      },
      {
        title: "Total Schedules",
        value: allData.data.scheduleData.length,
        icon: <EventNoteOutlined fontSize="medium" />,
        path: "/schedule",
      },
    ];
  } else if (roleData === 'lecture') {
    dataSummaries = [
      {
        title: "Press to View",
        value: 'Profile',
        icon: <PortraitIcon fontSize="medium" />,
        path: "/profile",
      },
      {
        title: "Total Schedules",
        value: allData.data.scheduleData.length,
        icon: <EventNoteOutlined fontSize="medium" />,
        path: "/schedule",
      },
      {
        title: "Total Students to Score",
        value: allData.data.scheduleData.length,
        icon: <GradeIcon fontSize="medium" />,
        path: "/score",
      },
    ];
  }

  const role = allData.data.personalData?.role;
  return (
    <Grid container item xs={12}>
      <h1 style={{margin:0, marginTop:14}}>
        Welcome, {allData.data.personalData?.username}.</h1>
      <Typography variant="subtitle1" component="div" sx={{ mb: 3, color:'gray', width:"100%"}}>
        {role === 'student' && (
          <p>Hi! You're the knowledge seeker. Dive into courses, submit assignments, and thrive in the collaborative learning playground. Enjoy the ride!
          </p>
        )}
        {role === 'lecture' && (
          <p>Howdy! You're the maestro of knowledge. This is your zone to create and handle courses, grade assignments, and be the academic rockstar.
          </p>
        )}
        {role === 'admin' && (
          <p>Hey there! You're the wizard behind the scenes. Here, you manage user accounts, keep the system running smoothly, and ensure everything stays secure.</p>
        )}
      </Typography>
      <Grid container spacing={3}>
        {dataSummaries.map((value) => (
          <Grid key={value.title} item xs={12} md={4}>
            <Link to={value.path} style={{ textDecoration: 'none' }}>
              <Card sx={{
                p: 2.4,
                borderRadius: 3,
                opacity: 1,
                transition: 'opacity 0.3s',
                '&:hover': {
                  opacity: 0.7, 
                },
              }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    paddingX: "1rem",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#ababab",
                    }}
                  >
                    {value.title}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        color: (theme) =>
                          theme.palette.mode === "dark" ? "#fff" : "#000",
                        fontSize: 35,
                        fontWeight: 600,
                      }}
                    >
                      {value.value}
                    </Typography>
                    <Box
                      sx={{
                        //   padding: '0.8rem',
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "50%",
                        backgroundColor: "#4a1e81",
                        color: "#fff",
                      }}
                    >
                      {value.icon}
                    </Box>
                  </Box>
                </Box>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Summaries;
