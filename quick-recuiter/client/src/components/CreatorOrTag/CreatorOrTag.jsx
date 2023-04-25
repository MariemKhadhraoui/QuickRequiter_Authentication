import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Typography, CircularProgress, Grid, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import Job from '../Jobs/Job/Job';
import { getJobsByCreator, getJobsBySearch } from '../../actions/jobs';

const CreatorOrTag = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { jobs, isLoading } = useSelector((state) => state.jobs);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/tags')) {
      dispatch(getJobsBySearch({ tags: name }));
    } else {
      dispatch(getJobsByCreator(name));
    }
  }, []);

  if (!jobs.length && !isLoading) return 'No jobs';

  return (
    <div>
      <Typography variant="h2">{name}</Typography>
      <Divider style={{ margin: '20px 0 50px 0' }} />
      {isLoading ? <CircularProgress /> : (
        <Grid container alignItems="stretch" spacing={3}>
          {jobs?.map((job) => (
            <Grid key={job._id} item xs={12} sm={12} md={6} lg={3}>
              <Job job={job} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default CreatorOrTag;
