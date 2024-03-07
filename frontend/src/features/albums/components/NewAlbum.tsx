import { useAppDispatch } from '../../../app/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { AlbumMutation } from '../../../types';
import { Typography } from '@mui/material';
import { createAlbum } from '../albumsThunks.ts';
import AlbumForm from './AlbumForm.tsx';

const NewAlbum = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFormSubmit = async (albumMutation: AlbumMutation) => {
    await dispatch(createAlbum(albumMutation)).unwrap();
    navigate('/');
  };

  return (
    <>
      <Typography variant="h4">New Album</Typography>
      <AlbumForm onSubmit={onFormSubmit} />
    </>
  );
};

export default NewAlbum;