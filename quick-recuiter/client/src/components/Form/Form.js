import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { createJob, updateJob } from '../../actions/jobs';
import useStyles from './styles';

const Form = ({ currentId, setCurrentId }) => {
  const [jobData, setJobData] = useState({ title: '',jobType:'', localisation:'', message: '', selectedFile: '' });
  const job = useSelector((state) => (currentId ? state.jobs.jobs.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  const clear = () => {
    setCurrentId(0);
    setJobData({ title: '', jobType:'', localisation:'', message: '', selectedFile: '' });
  };

  useEffect(() => {
    if (!job?.title) clear();
    if (job) setJobData(job);
  }, [job]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createJob({ ...jobData, name: user?.result?.name }, history));
      clear();
    } else {
      dispatch(updateJob(currentId, { ...jobData, name: user?.result?.name }));
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own jobs and like other's jobs.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${job?.title}"` : 'Creating a JOB'}</Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={jobData.title} onChange={(e) => setJobData({ ...jobData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={jobData.message} onChange={(e) => setJobData({ ...jobData, message: e.target.value })} />
        <div style={{ padding: '5px 0', width: '94%' }}>
        <select name="jobType" style={{ padding: '5px 0', width: '100%' }} value={jobData.jobType} onChange={(e) => setJobData({ ...jobData, jobType: e.target.value })} label="Type">
            <option value="Femme de ménage">Femme de ménage</option>
            <option value="Plombier">Plombier</option>
            <option value="Jardinier">Jardinier</option>
          </select>
          </div>
          <div style={{ padding: '5px 0', width: '94%' }}>
          <select name="localisation" style={{ padding: '5px 0', width: '100%' }} value={jobData.localisation} onChange={(e) => setJobData({ ...jobData, localisation: e.target.value })} label="Localisation">
          <option value="Ben Arous">Ben Arous</option>
          <option value="Ariana">Ariana</option>
          <option value="Béja">Béja</option>
          <option value="Bizerte">Bizerte</option>
          <option value="Gabés">Gabés</option>
          <option value="Gafsa">Gafsa</option>
          <option value="Jendouba">Jendouba</option>
          <option value="Kairouen">Kairouen</option>
          <option value="Kasserine">Kasserine</option>
          <option value="kebéli">kebéli</option>
          <option value="Kef">Le Kef</option>
          <option value="Mahdia">Mahdia</option>
          <option value="Manouba">Le Manouba</option>
          <option value="Mèdenine">Mèdenine</option>
          <option value="Monastir">Monastir</option>
          <option value="Sfax">Sfax</option>
          <option value="Sidi Bou Zid">Sidi Bou Zid</option>
          <option value="Siliana">Siliana</option>
          <option value="Sousse">Sousse</option>
          <option value="Tataouine">Tataouine</option>
          <option value="Tozeur">Tozeur</option>
          <option value="Tunis">Tunis</option>
          <option value="Zaghouane">Zaghouane</option>
          </select>
          </div>
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setJobData({ ...jobData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
