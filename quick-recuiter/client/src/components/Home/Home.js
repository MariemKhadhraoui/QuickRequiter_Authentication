import React, { useState } from 'react';
import { Container, Grow, Grid, AppBar, TextField, Button, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { getJobsBySearch,filterByLocation } from '../../actions/jobs';
import Jobs from '../Jobs/Jobs';
import Form from '../Form/Form';
import Pagination from '../Pagination';
import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Home = () => {
  const classes = useStyles();
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const [locationFilter, setLocationFilter] = useState("");

   


  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const history = useHistory();

  const searchJob = () => {
    if (search.trim()) {
      dispatch(getJobsBySearch({ search}));
      history.push(`/jobs/search?searchQuery=${search || 'none'}`);
    } else {
      history.push('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchJob();
    }
  };


//fonction pour applique le filter
const handleLocationFilterChange = (event) => {
  setLocationFilter(event.target.value);
  dispatch(filterByLocation(event.target.value));
};


  return (
    <Grow in>
      <section className='aboutHome'>
        <div className='container flexSB'>
        <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={9}>
            <Jobs setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search jobs" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
              <Button onClick={searchJob} className={classes.searchButton} variant="contained" color="primary">Search</Button>
            </AppBar>


            <Grid item>
            <div style={{ padding: '5px 0', width: '94%' }}>
           

              <label>
                Filter by location:</label>
                <select name="localisation" style={{ padding: '6px 0', width: '105%' }} value={locationFilter} onChange={handleLocationFilterChange}  >   
                  <option value="" disabled>All</option>
                 
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
            </Grid>


            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {(!searchQuery) && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </div>
      </section>
    </Grow>
  );
};

export default Home;
