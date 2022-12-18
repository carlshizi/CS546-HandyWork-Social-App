import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HandymanIcon from '@mui/icons-material/Handyman';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Create" icon={<AddCircleIcon />} />
        <BottomNavigationAction label="All HandyMen" icon={<HandymanIcon />} />
        <BottomNavigationAction label="Friends" icon={<PeopleAltIcon />} />
      </BottomNavigation>
    </Box>
  );
}
