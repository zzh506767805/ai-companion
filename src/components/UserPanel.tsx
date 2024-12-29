import React, { useState } from 'react';
import {
  Box,
  Avatar,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Divider,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material';
import { AccountCircle, ExitToApp, Close as CloseIcon } from '@mui/icons-material';

interface User {
  name: string;
  avatar?: string;
  email: string;
}

const UserPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleLogin = () => {
    setUser({
      name: '测试用户',
      email: 'test@example.com',
      avatar: 'https://via.placeholder.com/40',
    });
    setIsLoggedIn(true);
    setLoginDialogOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setAnchorEl(null);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ p: 2 }}>
        {isLoggedIn ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              p: 1,
              borderRadius: 2,
              '&:hover': {
                bgcolor: '#f5f5f5',
              },
            }}
            onClick={handleMenuClick}
          >
            <Avatar
              src={user?.avatar}
              sx={{ 
                width: 40, 
                height: 40, 
                mr: 2,
                bgcolor: '#7E57C2',
              }}
            />
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {user?.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {user?.email}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Button
            startIcon={<AccountCircle />}
            onClick={() => setLoginDialogOpen(true)}
            fullWidth
            variant="outlined"
            sx={{
              borderColor: '#7E57C2',
              color: '#7E57C2',
              '&:hover': {
                borderColor: '#5E35B1',
                bgcolor: 'rgba(126, 87, 194, 0.04)',
              },
              p: 1.5,
              borderRadius: 2,
            }}
          >
            登录以探索更多
          </Button>
        )}
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            mt: 1,
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <MenuItem onClick={handleMenuClose} sx={{ minWidth: 150 }}>
          个人资料
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ color: '#d32f2f' }}>
          <ExitToApp sx={{ mr: 1, fontSize: 20 }} />
          退出登录
        </MenuItem>
      </Menu>

      <Dialog 
        open={loginDialogOpen} 
        onClose={() => setLoginDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 2,
            width: '100%',
            maxWidth: 400,
          },
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2, pb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            登录
          </Typography>
          <IconButton
            onClick={() => setLoginDialogOpen(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'grey.500',
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 2, pt: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            登录后可以与更多有趣的角色对话，探索无限可能！
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="邮箱"
            type="email"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="密码"
            type="password"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 1 }}>
          <Button 
            onClick={handleLogin} 
            variant="contained"
            fullWidth
            sx={{ 
              bgcolor: '#7E57C2',
              '&:hover': {
                bgcolor: '#5E35B1',
              },
              py: 1,
            }}
          >
            登录
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserPanel; 