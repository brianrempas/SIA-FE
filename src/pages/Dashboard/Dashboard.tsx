import { Box } from "@mui/material";

import Summaries from "./Summaries";

function Dashboard() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      }}
    >
      <Summaries />
    </Box>
  );
}

export default Dashboard;
