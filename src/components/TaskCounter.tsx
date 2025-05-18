import React from 'react';
import { Box, Typography } from '@mui/material';

interface TaskCounterProps {
  total: number;
  done: number;
}

const TaskCounter: React.FC<TaskCounterProps> = ({ total, done }) => (
  <Box display="flex" justifyContent="center" alignItems="center" mb={2} gap={3}>
    <Typography variant="subtitle1">
      Total Tasks: <b>{total}</b>
    </Typography>
    <Typography variant="subtitle1" color="success.main">
      Done: <b>{done}</b>
    </Typography>
  </Box>
);

export default TaskCounter; 