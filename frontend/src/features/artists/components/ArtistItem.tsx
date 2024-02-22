import { Card, CardActions, CardHeader, CardMedia, Grid, IconButton, styled } from '@mui/material';
import imageNotAvailable from '../../../assets/images/image_not_available.png';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { apiURL } from '../../../constants.ts';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

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

  return (
    <Grid item sm md={6} lg={4}>
      <Card sx={{height: '100%'}}>
        <CardHeader title={name}/>
        <ImageCardMedia image={cardImage} />
        <CardActions>
          <IconButton component={RouterLink} to={'/artists/' + id}>
            <ArrowForwardIcon/> more...
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ArtistItem;