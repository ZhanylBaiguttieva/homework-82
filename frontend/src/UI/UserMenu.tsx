import React, { useState } from 'react';
import { User } from '../types';
import { Button, Menu, MenuItem, styled, Typography, Avatar, Stack } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks.ts';
import { logout } from '../features/users/usersThunk.ts';
import { apiURL } from '../constants.ts';
const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit'
  },
});

interface Props {
  user: User;
}
const UserMenu: React.FC<Props> = ({user}) => {
  let avatarImage;

  if (user.avatar) {
    avatarImage = apiURL + '/' + user.avatar;
  }

  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Typography component="div">
        <Link to="/track_history">Track History</Link>
      </Typography>
      <Stack direction="row" spacing={1}>
        <Avatar alt={user.displayName} src={avatarImage} />
        <Button color="inherit" onClick={handleClick}>
          {user.displayName}
        </Button>
      </Stack>
      <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClose} keepMounted>
        <MenuItem>Profile</MenuItem>
        <MenuItem component={NavLink} to="/artists/new" color="inherit">Add new artist</MenuItem>
        <MenuItem component={NavLink} to="/albums/new" color="inherit">Add new album</MenuItem>
        <MenuItem component={NavLink} to="/tracks/new" color="inherit">Add new track</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;