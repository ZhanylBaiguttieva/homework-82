import React, { useState } from 'react';
import { User } from '../types';
import { Button, Menu, MenuItem, styled, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks.ts';
import { logout } from '../features/users/usersThunk.ts';
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
      <Button color="inherit" onClick={handleClick}>
        Hello, {user.username}
      </Button>
      <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClose} keepMounted>
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;