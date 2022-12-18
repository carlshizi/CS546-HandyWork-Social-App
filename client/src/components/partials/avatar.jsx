import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import profilePic from '../img/profile_image.jpg'

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));




export default function MediaCard({ person }) {
  // console.log(person)

  return (
    <Card sx={{ maxWidth: 200, maxHeight: 53 }}>
      <CardContent>   
      <Stack direction="row" spacing={2}>
      <Stack direction="row" spacing={2}>
      <Avatar alt="Remy Sharp" src={ person.currentUser.other.image } style={{top:"-11px"}} />
      <div style={{marginTop:"-3px"}}><h3 style={{fontSize:"20px"}}>{ person.currentUser.other.username }</h3></div>
    </Stack>
    </Stack>
      </CardContent>      
    </Card>
    
  );
}
