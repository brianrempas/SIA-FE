import { Box, Paper, Typography } from '@mui/material';

const CardHeader = ({ title }: { title: React.ReactNode }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        borderTopRightRadius: '20px',
        borderTopLeftRadius: '20px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'start',
          gap: '0.4rem',
          boxShadow: '0px 3px 0px rgba(0, 0, 0, 0.08)',
          padding: '10px 20px',
          marginBottom: '5px',
        }}
      >
        {/* create line vertical */}
        <Box sx={{ marginTop: '8px' }}>
          <svg width='10px' height='20px' viewBox='0 0 10 20'>
            <line
              x1='0'
              y1='0'
              x2='0'
              y2='18px'
              stroke='#4a1e81'
              strokeWidth='6'
            />
          </svg>
        </Box>
        <Typography
          variant='h6'
          component='div'
          sx={{
            fontWeight: 'bold',
            width: '100%',
          }}
          color={'#4a1e81'}
        >
          {title}
        </Typography>
      </Box>
    </Paper>
  );
};

export default CardHeader;
