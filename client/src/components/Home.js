import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { delete_cookie } from 'sfcookies'
import MediaCard from "./partials/avatar"
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import SimpleBottomNavigation from './partials/bottom';
import RowAndColumnSpacing from './partials/grid2';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function BasicGrid() {

  const cookie_key = "navigate"   // clear cookie for navigating to reset page
  delete_cookie(cookie_key)
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div style={{ display: "flex", marginLeft: "98px" }}>
        <div style={{}}>
          <Paper      // search bar
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 374 }}
          >

            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search HandyWork"
              inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton type="button" sx={{ p: '12px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>

        <div style={{ marginLeft: "24px" }}>
          <MediaCard />
        </div>
      </div>

      <br></br>
      <RowAndColumnSpacing />

      <br></br>
      <div style={{ marginLeft: "135px" }}><SimpleBottomNavigation /></div>

    </>
  );
}
