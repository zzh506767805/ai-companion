import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Avatar,
  Paper,
  Divider,
  Button,
  Chip,
} from '@mui/material';
import {
  Send as SendIcon,
  ArrowBack as ArrowBackIcon,
  Circle as CircleIcon,
} from '@mui/icons-material';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const SIDEBAR_WIDTH = 320;

const Chat = () => {
  const { characterId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  // 模拟角色数据
  const character = {
    id: characterId,
    name: '埃隆·马斯克',
    avatar: 'https://via.placeholder.com/150',
    description: '特斯拉和SpaceX的CEO',
    status: '在线',
    tags: ['企业家', '科技', '创新'],
    background: '埃隆·马斯克是一位科技企业家、工程师和投资者。他是特斯拉公司的CEO和首席工程师，SpaceX的创始人、CEO和首席工程师。他还创立了The Boring Company，并且是Neuralink和OpenAI的联合创始人。',
    traits: [
      { label: '创新思维', value: 95 },
      { label: '技术洞察', value: 90 },
      { label: '商业头脑', value: 88 },
      { label: '领导能力', value: 85 },
    ],
  };

  // 添加推荐角色数据
  const recommendedCharacters = [
    {
      id: '2',
      name: '爱因斯坦',
      avatar: 'https://via.placeholder.com/150',
      description: '著名物理学家',
      tags: ['科学家', '物理学'],
    },
    {
      id: '3',
      name: '莎士比亚',
      avatar: 'https://via.placeholder.com/150',
      description: '伟大的戏剧家和诗人',
      tags: ['文学', '戏剧'],
    },
    {
      id: '4',
      name: '苏格拉底',
      avatar: 'https://via.placeholder.com/150',
      description: '古希腊哲学家',
      tags: ['哲学', '教育'],
    },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // 模拟AI回复
    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now() + 1,
        text: '这是一个模拟的AI回复消息。',
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', bgcolor: '#F8FAFC' }}>
      {/* 左侧角色信息栏 */}
      <Box
        sx={{
          width: SIDEBAR_WIDTH,
          borderRight: '1px solid',
          borderColor: 'divider',
          bgcolor: 'white',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#E2E8F0',
            borderRadius: '4px',
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              mb: 3,
              mx: -1,
            }}
          >
            <IconButton 
              onClick={() => navigate(-1)}
              sx={{ 
                color: '#64748B',
                p: 1,
                '&:hover': {
                  bgcolor: 'rgba(100, 116, 139, 0.04)',
                },
              }}
            >
              <ArrowBackIcon fontSize="small" />
            </IconButton>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#64748B',
                fontWeight: 500,
                ml: 0.5,
              }}
            >
              角色信息
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
              <Avatar
                src={character.avatar}
                sx={{ 
                  width: 120, 
                  height: 120,
                  border: '4px solid white',
                  boxShadow: '0 0 20px rgba(148, 163, 184, 0.15)',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 4,
                  right: 4,
                  display: 'flex',
                  alignItems: 'center',
                  bgcolor: '#22C55E',
                  color: 'white',
                  fontSize: '12px',
                  py: 0.5,
                  px: 1,
                  borderRadius: 1,
                  boxShadow: '0 2px 4px rgba(34, 197, 94, 0.2)',
                }}
              >
                <CircleIcon sx={{ fontSize: 8, mr: 0.5 }} />
                {character.status}
              </Box>
            </Box>
            <Typography variant="h5" sx={{ color: '#334155', fontWeight: 700, mb: 0.5 }}>
              {character.name}
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748B' }}>
              {character.description}
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                mb: 1.5, 
                color: '#334155',
                fontWeight: 600,
                fontSize: '0.875rem',
              }}
            >
              标签
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {character.tags.map(tag => (
                <Chip 
                  key={tag} 
                  label={tag} 
                  size="small" 
                  sx={{
                    bgcolor: 'rgba(99, 102, 241, 0.08)',
                    color: '#6366F1',
                    fontWeight: 500,
                    '&:hover': {
                      bgcolor: 'rgba(99, 102, 241, 0.12)',
                    },
                  }}
                />
              ))}
            </Box>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                mb: 1.5,
                color: '#334155',
                fontWeight: 600,
                fontSize: '0.875rem',
              }}
            >
              背景介绍
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#64748B',
                lineHeight: 1.6,
              }}
            >
              {character.background}
            </Typography>
          </Box>

          <Box>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                mb: 2,
                color: '#334155',
                fontWeight: 600,
                fontSize: '0.875rem',
              }}
            >
              更多推荐
            </Typography>
            {recommendedCharacters.map((rec) => (
              <Box
                key={rec.id}
                onClick={() => navigate(`/chat/${rec.id}`)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 1.5,
                  mb: 1,
                  borderRadius: 2,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: 'rgba(99, 102, 241, 0.04)',
                  },
                }}
              >
                <Avatar
                  src={rec.avatar}
                  sx={{ 
                    width: 40, 
                    height: 40,
                    mr: 2,
                    border: '2px solid white',
                    boxShadow: '0 2px 4px rgba(148, 163, 184, 0.1)',
                  }}
                />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      color: '#334155',
                      fontWeight: 600,
                      mb: 0.5,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {rec.name}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    {rec.tags.slice(0, 2).map(tag => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: '0.75rem',
                          bgcolor: 'rgba(99, 102, 241, 0.08)',
                          color: '#6366F1',
                          '& .MuiChip-label': {
                            px: 1,
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* 聊天区域 */}
      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        bgcolor: '#F8FAFC',
      }}>
        {/* 消息列表 */}
        <Box 
          sx={{ 
            flex: 1, 
            overflow: 'auto',
            p: 4,
            '&::-webkit-scrollbar': {
              width: '4px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#E2E8F0',
              borderRadius: '4px',
            },
          }}
        >
          {messages.map((message) => (
            <Box
              key={message.id}
              sx={{
                display: 'flex',
                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                mb: 3,
              }}
            >
              {message.sender === 'ai' && (
                <Avatar
                  src={character.avatar}
                  sx={{ 
                    width: 36, 
                    height: 36, 
                    mr: 1.5,
                    border: '2px solid white',
                    boxShadow: '0 2px 4px rgba(148, 163, 184, 0.1)',
                  }}
                />
              )}
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  maxWidth: '70%',
                  bgcolor: message.sender === 'user' ? '#6366F1' : 'white',
                  color: message.sender === 'user' ? 'white' : '#334155',
                  borderRadius: 2.5,
                  boxShadow: message.sender === 'user' 
                    ? '0 4px 12px rgba(99, 102, 241, 0.2)' 
                    : '0 4px 12px rgba(148, 163, 184, 0.1)',
                }}
              >
                <Typography 
                  variant="body1"
                  sx={{ 
                    lineHeight: 1.6,
                    fontWeight: message.sender === 'user' ? 400 : 500,
                  }}
                >
                  {message.text}
                </Typography>
              </Paper>
            </Box>
          ))}
        </Box>

        {/* 输入框 */}
        <Paper 
          component="form" 
          onSubmit={handleSendMessage}
          elevation={0}
          sx={{ 
            p: 3,
            bgcolor: 'white',
            borderTop: '1px solid',
            borderColor: '#E2E8F0',
          }}
        >
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="输入消息..."
              variant="outlined"
              size="small"
              autoComplete="off"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '& fieldset': {
                    borderColor: '#E2E8F0',
                  },
                  '&:hover fieldset': {
                    borderColor: '#CBD5E1',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#6366F1',
                  },
                },
              }}
            />
            <IconButton 
              type="submit" 
              disabled={!newMessage.trim()}
              sx={{
                bgcolor: '#6366F1',
                color: 'white',
                '&:hover': {
                  bgcolor: '#4F46E5',
                },
                '&.Mui-disabled': {
                  bgcolor: '#E2E8F0',
                  color: '#94A3B8',
                },
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Chat; 