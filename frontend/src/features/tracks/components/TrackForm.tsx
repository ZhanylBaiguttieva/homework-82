import { TrackMutation } from '../../../types';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectAlbums } from '../../albums/albumsSlice.ts';
import { Grid, MenuItem, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { selectCreatingTrack } from '../tracksSlice.ts';
import { fetchAllAlbums } from '../../albums/albumsThunks.ts';

interface Props {
  onSubmit: (mutation: TrackMutation) => void;
}


const TrackForm: React.FC<Props> = ({onSubmit}) => {

  const [state, setState] = useState<TrackMutation>({
    album: '',
    name: '',
    number: '',
    length: '',
  });

  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const isCreating = useAppSelector(selectCreatingTrack);

  useEffect(()=> {
    dispatch(fetchAllAlbums());
  },[dispatch]);

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  return (
    <form
      autoComplete="off"
      onSubmit={submitFormHandler}
    >
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            select
            id="album" label="Album"
            value={state.album}
            onChange={inputChangeHandler}
            name="album"
            required
          >
            <MenuItem value="" disabled>Please select an album</MenuItem>
            {albums.map(album => (
              <MenuItem key={album._id} value={album._id}>
                {album.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs>
          <TextField
            id="name" label="Name"
            value={state.name}
            onChange={inputChangeHandler}
            name="name"
            required
          />
        </Grid>
        <Grid item xs>
          <TextField
            id="number" label="Number"
            value={state.number}
            onChange={inputChangeHandler}
            name="number"
            required
          />
        </Grid>

        <Grid item xs>
          <TextField
            id="length" label="Length"
            value={state.length}
            onChange={inputChangeHandler}
            name="length"
            required
          />
        </Grid>

        <Grid item xs>
          <LoadingButton type="submit" color="primary" variant="contained" loading={isCreating}>Add track</LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default TrackForm;