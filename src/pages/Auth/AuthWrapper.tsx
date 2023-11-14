import { Grid, Card } from "@mui/material";

const AuthWrapper = ({ children }: { children: JSX.Element }) => (
  <Grid item xs={12}>
    <Grid
      item
      xs={12}
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: { xs: "calc(100vh - 134px)", md: "calc(100vh - 112px)" },
      }}
    >
      <Grid item>
        <Card sx={{ p: 5 }}>{children}</Card>
      </Grid>
    </Grid>
  </Grid>
);

export default AuthWrapper;
