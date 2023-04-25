import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory, Link } from 'react-router-dom';

import { getJob, getJobsBySearch } from '../../actions/jobs';
import CommentSection from './CommentSection';
import useStyles from './styles';

const Job = () => {
  const { job, jobs, isLoading } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getJob(id));
  }, [id]);

  useEffect(() => {
    if (job) {
      dispatch(getJobsBySearch({ search: 'none' }));
    }
  }, [job]);

  if (!job) return null;

  const openJob = (_id) => history.push(`/jobs/${_id}`);

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const recommendedJobs = jobs.filter(({ _id }) => _id !== job._id);

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{job.title}</Typography>
          <Typography gutterBottom variant="body1" component="p">{job.message}</Typography>
          <Typography variant="h6">
            Created by:
            <Link to={`/creators/${job.name}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              {` ${job.name}`}
            </Link>
          </Typography>
          <Typography variant="body1">{moment(job.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection job={job} />
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={job.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={job.title} />
        </div>
      </div>
      {!!recommendedJobs.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div className={classes.recommendedJobs}>
            {recommendedJobs.map(({ title, name, message, likes, selectedFile, _id }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openJob(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                <img src={selectedFile} width="200px" />
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default Job;
