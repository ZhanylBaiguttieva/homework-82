import React from 'react';
import imageNotAvailable from '../../../assets/images/image_not_available.png';
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, styled } from '@mui/material';
import { apiURL } from '../../../constants.ts';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink, useNavigate} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectUser } from '../../users/usersSlice.ts';
import { selectDeletingAlbum } from '../albumsSlice.ts';
import { LoadingButton } from '@mui/lab';
import { deleteAlbum, fetchAlbums, publishAlbum } from '../albumsThunks.ts';
import { Album } from '../../../types';

interface Props {
  album: Album;
}

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%', // 16:9
});
const AlbumItem: React.FC<Props> = ({album}) => {
  let cardImage = imageNotAvailable;

  if (album.image) {
    cardImage = apiURL + '/' + album.image;
  }

  const user = useAppSelector(selectUser);
  const isDeleting = useAppSelector(selectDeletingAlbum);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();


  const removeAlbum = async() => {
    await dispatch(deleteAlbum(album._id));
    navigate('/');
  };

  const makePublishedAlbum = async () => {
    await dispatch(publishAlbum(album._id));
    await dispatch(fetchAlbums(album.artist._id));
  };


  return (
    <Grid item sm md={6} lg={4}>
      <Card sx={{height: '100%'}}>
        <CardHeader title={album.name}/>
        <ImageCardMedia image={cardImage}/>
        <CardContent>
          <p>
            <strong>Artist:</strong> {album.artist.name}
          </p>
          <strong>Published year:</strong> {album.date}
        </CardContent>
        <CardActions>
          <Grid container justifyContent="space-between">
            <Grid item>
              <IconButton component={RouterLink} to={'/tracks/' + album._id}>
                <ArrowForwardIcon/>
              </IconButton>
            </Grid>
            <Grid item>
              {user?.role === 'admin' && (
                <Grid item>
                  <LoadingButton
                    color="primary"
                    onClick={removeAlbum}
                    loading={isDeleting}
                    disabled={isDeleting}
                  >
                    Delete
                  </LoadingButton>
                </Grid>
              )}
              {user?.role === 'admin' && album.isPublished === false && (
                <Grid item>
                  <Button
                    color="primary"
                    onClick={makePublishedAlbum}
                  >
                    Publish
                  </Button>
                </Grid>
              )}
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default AlbumItem;