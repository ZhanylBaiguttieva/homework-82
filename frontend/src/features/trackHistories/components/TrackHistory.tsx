import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';
import { TrackListened } from '../../../types';
import dayjs from 'dayjs';
interface Props {
  trackListened: TrackListened;
}
const TrackHistory: React.FC<Props> = ({trackListened}) => {
  const currentDate = dayjs(trackListened.datetime);
  const formattedDate = currentDate.format('YYYY-MM-DD HH:mm:ss');

  return (
    <Grid item sm md={6} lg={4}>
      <Card sx={{ display: 'flex' }} >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
              {trackListened.track.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              <strong>Listened at:</strong> {formattedDate}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              <strong>Artist name:</strong> {trackListened.artist.name}
             </Typography>
          </CardContent>
        </Box>
      </Card>
    </Grid>
  );
};

export default TrackHistory;