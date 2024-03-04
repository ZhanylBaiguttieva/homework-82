import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { useParams } from 'react-router-dom';
import { fetchTracks } from '../tracksThunks.ts';
import { selectTracks, selectTracksFetching } from '../tracksSlice.ts';
import { CircularProgress, Grid, Typography } from '@mui/material';
import TrackItem from './TrackItem.tsx';
import { fetchOneAlbum } from '../../albums/albumsThunks.ts';
import { selectOneAlbum } from '../../albums/albumsSlice.ts';

const Tracks = () => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTracks);
  const album = useAppSelector(selectOneAlbum);
  const {id} = useParams() as {id: string};
  const isLoading = useAppSelector(selectTracksFetching);

  useEffect(() => {
    dispatch(fetchTracks(id));
    dispatch(fetchOneAlbum(id));
  }, [dispatch,id]);

  let tracksArea: React.ReactNode = <CircularProgress/>;
  if(!isLoading && tracks) {
    tracksArea = tracks.map(track => (
        <TrackItem
          key={track._id}
          _id={track._id}
          name={track.name}
          length={track.length}
          number={track.number}
        />
    ));
  }

  return (
    <div>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h4"> <strong>Album:</strong> {album?.name}</Typography>
        </Grid>
        <Grid item container spacing={2}>
          {tracksArea}
        </Grid>
      </Grid>
    </div>
  );
};

export default Tracks;