import React from 'react';
import imageNotAvailable from '../../../assets/images/image_not_available.png';
import { Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, styled } from '@mui/material';
import { apiURL } from '../../../constants.ts';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink } from 'react-router-dom';
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
          <IconButton component={RouterLink} to={'/tracks/' + id}>
            <ArrowForwardIcon/>
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default AlbumItem;