
import { useAppDispatch } from '../../../app/hooks.ts';
import { ArtistMutation } from '../../../types';
import { createArtist } from '../artistsThunks.ts';
import { Typography } from '@mui/material';
import ArtistForm from './ArtistForm.tsx';
import { useNavigate } from 'react-router-dom';

const NewArtist = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFormSubmit = async (artistMutation: ArtistMutation) => {
      await dispatch(createArtist(artistMutation)).unwrap();
      navigate('/');
  };

  return (
    <>
      <Typography variant="h4">New Artist</Typography>
      <ArtistForm onSubmit={onFormSubmit} />
    </>
  );
};

export default NewArtist;