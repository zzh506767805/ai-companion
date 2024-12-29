import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Switch } from '@mui/material';

const Settings = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        设置
      </Typography>
      <List>
        <ListItem>
          <ListItemText 
            primary="深色模式" 
            secondary="切换深色/浅色主题"
          />
          <Switch />
        </ListItem>
        <ListItem>
          <ListItemText 
            primary="消息通知" 
            secondary="接收新消息通知"
          />
          <Switch defaultChecked />
        </ListItem>
        <ListItem>
          <ListItemText 
            primary="声音提醒" 
            secondary="新消息声音提醒"
          />
          <Switch />
        </ListItem>
      </List>
    </Box>
  );
};

export default Settings; 