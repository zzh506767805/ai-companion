import React from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  styled,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Avatar,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import StarIcon from '@mui/icons-material/Star';
import SettingsIcon from '@mui/icons-material/Settings';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import UserPanel from './UserPanel';

const DRAWER_WIDTH = 240;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const menuItems = [
  { text: '发现新角色', icon: <HomeIcon />, path: '/' },
  { text: '探索世界', icon: <ExploreIcon />, path: '/explore' },
  { text: '我的收藏', icon: <StarIcon />, path: '/favorites' },
  { text: '设置', icon: <SettingsIcon />, path: '/settings' },
];

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isChatPage = location.pathname.includes('/chat/');

  return (
    <Box sx={{ display: 'flex', bgcolor: '#F8FAFC' }}>
      {!isChatPage && (
        <AppBar 
          position="fixed" 
          elevation={0}
          sx={{ 
            zIndex: (theme) => theme.zIndex.drawer + 1,
            bgcolor: 'white',
            borderBottom: '1px solid',
            borderColor: 'divider',
            height: 48,
            color: '#334155',
          }}
        >
          <Toolbar sx={{ minHeight: '48px !important' }}>
            <StyledLink to="/">
              <Avatar
                sx={{
                  width: 26,
                  height: 26,
                  mr: 1,
                  bgcolor: '#818CF8',
                  fontSize: '1rem',
                }}
              >
                <SmartToyOutlinedIcon sx={{ fontSize: '1.1rem' }} />
              </Avatar>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  fontWeight: 600,
                  background: 'linear-gradient(120deg, #818CF8, #6366F1)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  fontSize: '0.95rem',
                }}
              >
                AI Companion
              </Typography>
            </StyledLink>
          </Toolbar>
        </AppBar>
      )}
      
      {!isChatPage && (
        <Drawer
          variant="permanent"
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
              bgcolor: '#ffffff',
              borderRight: '1px solid #e0e0e0',
              mt: '48px',
              height: 'calc(100vh - 48px)',
            },
          }}
        >
          <List sx={{ flex: 1, pt: 1 }}>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  selected={location.pathname === item.path}
                  sx={{
                    minHeight: 44,
                    borderRadius: '0 24px 24px 0',
                    mr: 2,
                    '&.Mui-selected': {
                      bgcolor: '#EDE7F6',
                      color: '#6366F1',
                      '& .MuiListItemIcon-root': {
                        color: '#6366F1',
                      },
                    },
                    '&:hover': {
                      bgcolor: '#F5F5F5',
                      '&.Mui-selected': {
                        bgcolor: '#EDE7F6',
                      },
                    },
                  }}
                >
                  <ListItemIcon 
                    sx={{ 
                      minWidth: 36,
                      color: location.pathname === item.path ? '#6366F1' : '#64748B',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      fontWeight: location.pathname === item.path ? 600 : 400,
                      color: location.pathname === item.path ? '#6366F1' : '#64748B',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 1 }} />
          <UserPanel />
        </Drawer>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: isChatPage ? 0 : 3,
          width: '100%',
          marginTop: isChatPage ? 0 : '48px',
          bgcolor: '#f8f9fa',
          minHeight: '100vh',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout; 