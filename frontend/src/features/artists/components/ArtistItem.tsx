import { Button, Card, CardActions, CardHeader, CardMedia, Grid, IconButton, styled } from '@mui/material';
import imageNotAvailable from '../../../assets/images/image_not_available.png';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { apiURL } from '../../../constants.ts';
import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectUser } from '../../users/usersSlice.ts';
import { selectDeletingArtist } from '../artistsSlice.ts';
import { deleteArtist, fetchArtists, publishArtist } from '../artistsThunks.ts';
import { LoadingButton } from '@mui/lab';
import { Artist } from '../../../types';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%', // 16:9
});

interface Props {
  artist: Artist;
}

const ArtistItem: React.FC<Props> = ({artist}) => {
  const user = useAppSelector(selectUser);
  const isDeleting = useAppSelector(selectDeletingArtist);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  let cardImage = imageNotAvailable;

  if (artist.image) {
    cardImage = apiURL + '/' + artist.image;
  }

  const removeArtist = async() => {
    await dispatch(deleteArtist(artist._id));
    await dispatch(fetchArtists());
    navigate('/');
  };

  const makePublishedArtist = async () => {
    await dispatch(publishArtist(artist._id));
    await dispatch(fetchArtists());
  };

  return (
    <Grid item sm md={6} lg={4}>
      <Card sx={{height: '100%'}}>
        <CardHeader title={artist.name}/>
        <ImageCardMedia image={cardImage} />
        <CardActions>
          <Grid container justifyContent="space-between">
            <Grid item>
              <IconButton component={RouterLink} to={'/albums/' + artist._id}>
                <ArrowForwardIcon/> more...
              </IconButton>
            </Grid>
            {user?.role === 'admin' && (
              <Grid item>
                <LoadingButton
                  color="primary"
                  onClick={removeArtist}
                  loading={isDeleting}
                  disabled={isDeleting}
                >
                  Delete
                </LoadingButton>
              </Grid>
            )}
            {user?.role === 'admin' && artist.isPublished === false && (
              <Grid item>
                <Button
                  color="primary"
                  onClick={makePublishedArtist}
                >
                  Publish
                </Button>
              </Grid>
            )}
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ArtistItem;