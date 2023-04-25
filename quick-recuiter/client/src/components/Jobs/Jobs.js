import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Job from './Job/Job';
import useStyles from './styles';

const Jobs = ({ setCurrentId }) => {
  const { jobs, isLoading } = useSelector((state) => state.jobs);
  const classes = useStyles();

  if (!jobs.length && !isLoading) return 'No jobs';

  return (
    isLoading ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {jobs?.map((job) => (
          <Grid key={job._id} item xs={12} sm={12} md={6} lg={3}>
            <Job job={job} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Jobs;
