import { AlbumMutation } from '../../../types';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { Grid, MenuItem, TextField } from '@mui/material';
import FileInput from '../../../UI/FileInput.tsx';
import { LoadingButton } from '@mui/lab';
import { selectCreatingAlbum } from '../albumsSlice.ts';
import { selectArtists } from '../../artists/artistsSlice.ts';
import { fetchArtists } from '../../artists/artistsThunks.ts';

interface Props {
  onSubmit: (mutation: AlbumMutation) => void;
}

const AlbumForm: React.FC<Props> = ({onSubmit}) => {

  const [state, setState] = useState<AlbumMutation>({
    artist: '',
    name: '',
    date: '',
    image: null,
  });

  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const isCreating = useAppSelector(selectCreatingAlbum);

  useEffect(()=> {
    dispatch(fetchArtists());
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

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files) {
      setState(prevState => ({
        ...prevState, [name]: files[0]
      }));
    }
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
            id="artist" label="Artist"
            value={state.artist}
            onChange={inputChangeHandler}
            name="artist"
            required
          >
            <MenuItem value="" disabled>Please select an artist</MenuItem>
            {artists.map(artist => (
              <MenuItem key={artist._id} value={artist._id}>
                {artist.name}
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
            id="date" label="Date"
            value={state.date}
            onChange={inputChangeHandler}
            name="date"
            required
          />
        </Grid>
        <Grid item xs>
          <FileInput
            label="Image"
            name="image"
            onChange={fileInputChangeHandler}
          />
        </Grid>

        <Grid item xs>
          <LoadingButton type="submit" color="primary" variant="contained" loading={isCreating}>Add album</LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default AlbumForm;