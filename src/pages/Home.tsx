import React, { useState } from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  Box,
  Chip,
  Stack,
} from '@mui/material';
import { Link } from 'react-router-dom';

const characters = [
  {
    id: 1,
    name: '埃隆·马斯克',
    description: '特斯拉和SpaceX的CEO',
    avatar: 'https://via.placeholder.com/150',
    tags: ['企业家', '科技', '创新'],
  },
  {
    id: 2,
    name: '爱因斯坦',
    description: '著名物理学家',
    avatar: 'https://via.placeholder.com/150',
    tags: ['科学家', '物理学', '相对论'],
  },
  {
    id: 3,
    name: '莎士比亚',
    description: '伟大的戏剧家和诗人',
    avatar: 'https://via.placeholder.com/150',
    tags: ['文学', '戏剧', '诗歌'],
  },
  {
    id: 4,
    name: '苏格拉底',
    description: '古希腊哲学家',
    avatar: 'https://via.placeholder.com/150',
    tags: ['哲学', '教育', '智慧'],
  },
  {
    id: 5,
    name: '路飞',
    description: '海贼王主角',
    avatar: 'https://via.placeholder.com/150',
    tags: ['冒险', '热血', '友情'],
  },
];

const Home = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = Array.from(
    characters.flatMap(char => char.tags)
      .reduce((acc, tag) => {
        acc.set(tag, (acc.get(tag) || 0) + 1);
        return acc;
      }, new Map<string, number>())
  ).sort((a, b) => b[1] - a[1]).map(([tag]) => tag);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredCharacters = characters.filter(char =>
    selectedTags.length === 0 || selectedTags.some(tag => char.tags.includes(tag))
  );

  return (
    <Box sx={{ px: 1 }}>
      {/* 标签筛选区 */}
      <Box 
        sx={{ 
          position: 'sticky',
          top: 64,
          zIndex: 1,
          bgcolor: 'background.default',
          py: 1.5,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            overflow: 'auto',
            '&::-webkit-scrollbar': { display: 'none' },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          <Typography 
            color="text.secondary"
            sx={{ 
              fontSize: '0.875rem',
              whiteSpace: 'nowrap',
              pl: 1,
            }}
          >
            探索角色：
          </Typography>
          <Stack 
            direction="row" 
            spacing={1} 
            sx={{ 
              flexWrap: 'nowrap',
              minWidth: 'min-content',
            }}
          >
            {allTags.map(tag => (
              <Chip
                key={tag}
                label={tag}
                onClick={() => handleTagToggle(tag)}
                color={selectedTags.includes(tag) ? 'primary' : 'default'}
                variant={selectedTags.includes(tag) ? 'filled' : 'outlined'}
                size="small"
                sx={{ 
                  whiteSpace: 'nowrap',
                  '&.MuiChip-outlined': {
                    borderColor: 'rgba(0, 0, 0, 0.12)',
                  },
                  '&.MuiChip-filled': {
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                  },
                  '&:hover': {
                    bgcolor: selectedTags.includes(tag) ? 'primary.dark' : 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              />
            ))}
          </Stack>
        </Box>
      </Box>

      {/* 角色列表 */}
      <Box sx={{ mt: 2 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          {selectedTags.length > 0 ? '筛选结果' : '推荐角色'}
          {selectedTags.length > 0 && 
            <Typography 
              component="span"
              variant="body2"
              color="text.secondary"
              sx={{ 
                display: 'inline-flex',
                alignItems: 'center',
                bgcolor: 'rgba(0, 0, 0, 0.04)',
                px: 1,
                py: 0.5,
                borderRadius: 1,
              }}
            >
              {filteredCharacters.length} 个角色
            </Typography>
          }
        </Typography>

        <Grid container spacing={2}>
          {filteredCharacters.map((character) => (
            <Grid item xs={12} sm={6} md={3} key={character.id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.08)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={character.avatar}
                  alt={character.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ p: 1.5, flexGrow: 1 }}>
                  <Typography variant="subtitle1" component="div" sx={{ fontWeight: 600 }}>
                    {character.name}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      mb: 1.5,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      height: 40,
                    }}
                  >
                    {character.description}
                  </Typography>
                  <Box sx={{ mb: 1.5 }}>
                    {character.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        onClick={() => handleTagToggle(tag)}
                        color={selectedTags.includes(tag) ? 'primary' : 'default'}
                        variant={selectedTags.includes(tag) ? 'filled' : 'outlined'}
                        sx={{ 
                          mr: 0.5,
                          mb: 0.5,
                          fontSize: '0.75rem',
                        }}
                      />
                    ))}
                  </Box>
                  <Button
                    component={Link}
                    to={`/chat/${character.id}`}
                    variant="contained"
                    fullWidth
                    size="small"
                    sx={{
                      mt: 'auto',
                    }}
                  >
                    开始聊天
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Home; 