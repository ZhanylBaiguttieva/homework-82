import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectAlbums } from '../albumsSlice.ts';
import { useEffect } from 'react';
import { fetchAlbums } from '../albumsThunks.ts';
import { Grid, Typography } from '@mui/material';
import AlbumItem from './AlbumItem.tsx';
import { useParams } from 'react-router-dom';


const Albums = () => {
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const {id} = useParams() as {id: string};
  useEffect(() => {
    dispatch(fetchAlbums(id));
  }, [dispatch,id]);

  return (
    <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h4">Albums:</Typography>
        </Grid>
      <Grid item container spacing={2}>
        {albums.map(album => (
          <AlbumItem
            key={album._id}
            id={album._id}
            name={album.name}
            date={album.date}
            image={album.image}
            artist={album.artist.name}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default Albums;