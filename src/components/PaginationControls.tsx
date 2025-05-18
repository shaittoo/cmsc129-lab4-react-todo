import React from 'react';
import { Box, Button, Typography } from '@mui/material';

interface PaginationControlsProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({ page, totalPages, onPrev, onNext }) => (
  <Box display="flex" justifyContent="center" alignItems="center" mt={2} gap={2}>
    <Button
      variant="outlined"
      disabled={page === 1}
      onClick={onPrev}
    >
      Previous
    </Button>
    <Typography variant="body2">
      Page {page} of {Math.max(1, totalPages)}
    </Typography>
    <Button
      variant="outlined"
      disabled={page === totalPages || totalPages === 0}
      onClick={onNext}
    >
      Next
    </Button>
  </Box>
);

export default PaginationControls; 