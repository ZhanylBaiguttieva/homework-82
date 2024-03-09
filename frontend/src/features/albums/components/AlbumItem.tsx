import React from 'react';
import imageNotAvailable from '../../../assets/images/image_not_available.png';
import { Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, styled } from '@mui/material';
import { apiURL } from '../../../constants.ts';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectUser } from '../../users/usersSlice.ts';
import { selectDeletingAlbum } from '../albumsSlice.ts';
import { LoadingButton } from '@mui/lab';
import { deleteAlbum } from '../albumsThunks.ts';
interface Props {
  id: string;
  name: string;
  date: number;
  image: string | null;
  artist: string;
}

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%', // 16:9
});
const AlbumItem: React.FC<Props> = ({id,name, date, image, artist}) => {
  let cardImage = imageNotAvailable;

  if (image) {
    cardImage = apiURL + '/' + image;
  }

  const user = useAppSelector(selectUser);
  const isDeleting = useAppSelector(selectDeletingAlbum);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();


  const removeAlbum = async() => {
    await dispatch(deleteAlbum(id));
    navigate('/');
  };

  return (
    <Grid item sm md={6} lg={4}>
      <Card sx={{height: '100%'}}>
        <CardHeader title={name}/>
        <ImageCardMedia image={cardImage}/>
        <CardContent>
          <p>
            <strong>Artist:</strong> {artist}
          </p>
          <strong>Published year:</strong> {date}
        </CardContent>
        <CardActions>
          <Grid container justifyContent="space-between">
            <Grid item>
              <IconButton component={RouterLink} to={'/tracks/' + id}>
                <ArrowForwardIcon/>
              </IconButton>
            </Grid>
            <Grid item>
              {user?.role === 'admin' && (
                <LoadingButton
                  color="primary"
                  onClick={removeAlbum}
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

export default AlbumItem;