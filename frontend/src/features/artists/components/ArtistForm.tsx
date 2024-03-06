import { ArtistMutation } from '../../../types';
import React, { useState } from 'react';
import { Grid, TextField } from '@mui/material';
import FileInput from '../../../UI/FileInput.tsx';
import { useAppSelector } from '../../../app/hooks.ts';
import { selectCreating } from '../artistsSlice.ts';
import { LoadingButton } from '@mui/lab';

interface Props {
  onSubmit: (mutation: ArtistMutation) => void;
}
const ArtistForm: React.FC<Props> = ({onSubmit}) => {

  const [state, setState] = useState<ArtistMutation>({
    name: '',
    image: null,
  });

  const isCreating = useAppSelector(selectCreating);

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
            id="name" label="Name"
            value={state.name}
            onChange={inputChangeHandler}
            name="name"
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
          <LoadingButton type="submit" color="primary" variant="contained" loading={isCreating}>Add artist</LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default ArtistForm;