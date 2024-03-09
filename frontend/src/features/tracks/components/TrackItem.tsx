import React from 'react';
import { Box, Button, Card, CardContent, Grid, IconButton, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { addTrackToHistory } from '../../trackHistories/TracksListenedThunk.ts';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectUser } from '../../users/usersSlice.ts';
import { useNavigate } from 'react-router-dom';
import { selectDeletingTrack } from '../tracksSlice.ts';
import { deleteTrack, publishTrack } from '../tracksThunks.ts';
import { LoadingButton } from '@mui/lab';


interface Props {
  _id: string;
  name: string;
  number: number;
  length: string;
}

const TrackItem:React.FC<Props> = ({ _id,name, number, length,}) => {

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isDeleting = useAppSelector(selectDeletingTrack);
  const navigate = useNavigate();
  const addTrack = async() => {
    await dispatch(addTrackToHistory(_id));
  };

  const removeTrack = async() => {
    await dispatch(deleteTrack(_id));
    navigate('/');
  };

  const makePublishedTrack = async () => {
    await dispatch(publishTrack(_id));
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
            {user?.role === 'admin' && (
              <Grid container justifyContent="space-between">
                <Grid item>
                  <LoadingButton
                    color="primary"
                    onClick={removeTrack}
                    loading={isDeleting}
                    disabled={isDeleting}
                  >
                    Delete
                  </LoadingButton>
                </Grid>
                <Grid item>
                  <Button
                    color="primary"
                    onClick={makePublishedTrack}
                  >
                    Publish
                  </Button>
                </Grid>
              </Grid>
            )}
          </Box>
        </Box>
      </Card>
    </Grid>
  );
};

export default TrackItem;