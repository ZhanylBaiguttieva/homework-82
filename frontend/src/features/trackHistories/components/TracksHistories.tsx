import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectFetching, selectTracksListened } from '../TracksListenedSlice.ts';
import { useEffect } from 'react';
import { fetchTracksListened } from '../TracksListenedThunk.ts';
import { CircularProgress, Grid } from '@mui/material';
import TrackHistory from './TrackHistory.tsx';


const TracksHistories = () => {
  const dispatch = useAppDispatch();
  const tracksListened = useAppSelector(selectTracksListened);

  const isLoading = useAppSelector(selectFetching );

  useEffect(() => {
    dispatch(fetchTracksListened());
  }, [dispatch]);


  let tracksListenedArea: React.ReactNode = <CircularProgress/>;
  if(!isLoading && tracksListened) {
    tracksListenedArea = tracksListened.map(trackListened => (
      <TrackHistory
        key={trackListened._id}
        trackListened={trackListened}
      />
    ));
  }
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container spacing={2}>
        {tracksListenedArea}
      </Grid>
    </Grid>
  );
};

export default TracksHistories;