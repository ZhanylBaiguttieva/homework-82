import { Card, CardActions, CardHeader, CardMedia, Grid, IconButton, styled } from '@mui/material';
import imageNotAvailable from '../../../assets/images/image_not_available.png';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { apiURL } from '../../../constants.ts';
import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectUser } from '../../users/usersSlice.ts';
import { selectDeletingArtist } from '../artistsSlice.ts';
import { deleteArtist, fetchArtists } from '../artistsThunks.ts';
import { LoadingButton } from '@mui/lab';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%', // 16:9
});

interface Props {
  id: string;
  name: string;
  image: string | null;
}

const ArtistItem: React.FC<Props> = ({id,name, image}) => {
  let cardImage = imageNotAvailable;

  if (image) {
    cardImage = apiURL + '/' + image;
  }

  const user = useAppSelector(selectUser);
  const isDeleting = useAppSelector(selectDeletingArtist);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const removeArtist = async() => {
    await dispatch(deleteArtist(id));
    await dispatch(fetchArtists());
    navigate('/');
  };

  return (
    <Grid item sm md={6} lg={4}>
      <Card sx={{height: '100%'}}>
        <CardHeader title={name}/>
        <ImageCardMedia image={cardImage} />
        <CardActions>
          <Grid container justifyContent="space-between">
            <Grid item>
              <IconButton component={RouterLink} to={'/albums/' + id}>
                <ArrowForwardIcon/> more...
              </IconButton>
            </Grid>
            <Grid item>
              {user?.role === 'admin' && (
                <LoadingButton
                  color="primary"
                  onClick={removeArtist}
                  loading={isDeleting}
                  disabled={isDeleting}
                >
                  Delete
                </LoadingButton>
              )}
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ArtistItem;