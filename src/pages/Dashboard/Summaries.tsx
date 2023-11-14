import { GroupOutlined } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import Card from "../../Components/common/Card";

const dataSummaries = [
  {
    title: "Total Mahasiswa",
    value: 89,
    icon: <GroupOutlined fontSize="medium" />,
  },
  {
    title: "Total Dosen",
    value: 34,
    icon: <GroupOutlined fontSize="medium" />,
  },
  {
    title: "Total Mata Kuliah",
    value: 100,
    icon: <GroupOutlined fontSize="medium" />,
  },
];

const Summaries = () => {
  return (
    <Grid container item xs={12}>
      <Grid container spacing={3}>
        {dataSummaries.map((value) => (
          <Grid key={value.title} item xs={12} md={4}>
            <Card>
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
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Summaries;
