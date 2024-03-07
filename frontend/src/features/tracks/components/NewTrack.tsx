import { useAppDispatch } from '../../../app/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { TrackMutation } from '../../../types';
import { Typography } from '@mui/material';
import { createTrack } from '../tracksThunks.ts';
import TrackForm from './TrackForm.tsx';

const NewTrack = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFormSubmit = async (trackMutation: TrackMutation) => {
    await dispatch(createTrack(trackMutation)).unwrap();
    navigate('/');
  };

  return (
    <>
      <Typography variant="h4">New Album</Typography>
      <TrackForm onSubmit={onFormSubmit} />
    </>
  );
};

export default NewTrack;