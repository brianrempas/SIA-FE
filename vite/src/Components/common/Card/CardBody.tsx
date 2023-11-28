import { Paper } from '@mui/material';
import React from 'react';

const CardBody = ({
  children,
  padding = 2,
}: {
  children: React.ReactNode;
  padding?: number;
}) => {
  return (
    <Paper elevation={0} sx={{ borderRadius: '10px', p: padding }}>
      {children}
    </Paper>
  );
};

export default CardBody;
