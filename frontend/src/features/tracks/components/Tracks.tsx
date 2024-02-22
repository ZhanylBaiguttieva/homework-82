import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { useParams } from 'react-router-dom';
import { fetchTracks } from '../tracksThunks.ts';
import { selectTracks } from '../tracksSlice.ts';
import { Grid, Typography } from '@mui/material';
import TrackItem from './TrackItem.tsx';

const Tracks = () => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTracks);
  const {id} = useParams() as {id: string};

  useEffect(() => {
    dispatch(fetchTracks(id));
  }, [dispatch,id]);
  return (
    <div>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h4">Tracks:</Typography>
        </Grid>
        <Grid item container spacing={2}>
          {tracks.map(track => (
            <TrackItem
              key={track._id}
              name={track.name}
              length={track.length}
              number={track.number}
            />
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default Tracks;