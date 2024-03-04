import React from 'react';
import { Box, Card, CardContent, Grid, IconButton, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { addTrackToHistory } from '../../trackHistories/TracksListenedThunk.ts';
import { useAppDispatch } from '../../../app/hooks.ts';


interface Props {
  _id: string;
  name: string;
  number: number;
  length: string;
}

const TrackItem:React.FC<Props> = ({ _id,name, number, length,}) => {

  const dispatch = useAppDispatch();
  const addTrack = async() => {
    await dispatch(addTrackToHistory(_id));
  };

  return (
    <Grid item sm md={6} lg={4}>
      <Card sx={{ display: 'flex' }} >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h6">
              # {number}
            </Typography>
            <Typography component="div" variant="h5">
              {name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {length}
            </Typography>
          </CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            <IconButton onClick={addTrack} aria-label="play/pause">
              <PlayArrowIcon sx={{ height: 38, width: 38 }} />
            </IconButton>
          </Box>
        </Box>
      </Card>
    </Grid>
  );
};

export default TrackItem;