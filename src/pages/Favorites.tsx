import React from 'react';
import { Box, Typography } from '@mui/material';

const Favorites = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        我的收藏
      </Typography>
      <Typography variant="body1">
        你还没有收藏任何角色
      </Typography>
    </Box>
  );
};

export default Favorites; 