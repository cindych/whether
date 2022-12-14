import React, { useState } from 'react';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LocationCityIcon from '@mui/icons-material/LocationCity';

import City from '../components/City';

import { getCities } from '../fetcher';

function Cities() {
    const [weather, setWeather] = useState('');
    const [attribute, setAttribute] = useState('');
    const [threshold, setThreshold] = useState('');

    const [data, setData] = useState([]);

    return (
        <div className="cities=page">
            <Paper elevation={4} sx={{ padding: '2%', display: 'flex', flexDirection: 'column', width: '50%', marginLeft: '3%', marginTop: '2%', marginBottom: '2%' }}>
                <Typography style={{ marginBottom: '3%', textAlign: 'center' }} variant="caption">find cities where avg attribute of songs played on weather days is above x amount</Typography>
                <FormControl>
                    <FormLabel>weather</FormLabel>
                    <RadioGroup row name="weather-radio-buttons-group" value={weather} onChange={e => setWeather(e.target.value)}>
                        <FormControlLabel value="sunny" control={<Radio color="default" size="small" />} label="sunny" />
                        <FormControlLabel value="cloudy" control={<Radio color="default" size="small" />} label="cloudy" />
                        <FormControlLabel value="windy" control={<Radio color="default" size="small" />} label="windy" />
                        <FormControlLabel value="rainy" control={<Radio color="default" size="small" />} label="rainy" />
                        <FormControlLabel value="snowy" control={<Radio color="default" size="small" />} label="snowy" />
                    </RadioGroup>
                </FormControl>
                <FormControl sx= {{ marginTop: '2%' }}>
                    <FormLabel>song attribute</FormLabel>
                    <RadioGroup row name="attribute-radio-buttons-group" value={attribute} onChange={e => setAttribute(e.target.value)}>
                        <FormControlLabel value="energy" control={<Radio color="default" size="small" />} label="energy" />
                        <FormControlLabel value="danceability" control={<Radio color="default" size="small" />} label="danceability" />
                        <FormControlLabel value="liveness" control={<Radio color="default" size="small" />} label="liveness" />
                        <FormControlLabel value="tempo" control={<Radio color="default" size="small" />} label="tempo" />
                        <FormControlLabel value="valence" control={<Radio color="default" size="small" />} label="valence" />
                    </RadioGroup>
                </FormControl>
                <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} sx={{ marginTop: '2%' }} size="small" variant="filled" value={threshold} label="threshold" onChange={e => setThreshold(e.target.value)} />
                <Button sx={{
                            background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 19%, rgba(124,124,124,1) 100%)',
                            border: 0,
                            borderRadius: 2,
                            boxShadow: '0 3px 5px 2px rgba(2, 0, 36, .15)',
                            color: 'white',
                            height: 48,
                            padding: '0 25px',
                            marginTop: '3%'
                        }}
                        onClick={() => getCities(attribute, weather, threshold).then(res => setData(res.results))}
                        startIcon={<LocationCityIcon />}
                    >
                    Get cities
                </Button>
            </Paper>
            <div style={{ margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', textAlign: 'center', width: '80%' }}>
                { data.map(entry => <City key={entry.location} name={entry.location} />)}
            </div>
        </div>
    )   
}

export default Cities;