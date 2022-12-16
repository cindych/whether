import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';

import SongsForAttributeWeatherComponent from './SongsForAttributeWeatherComponent.js';
import SongsForDateRegionComponent from './SongsForDateRegionComponent.js';
import SongsForRegionWeatherComponent from './SongsForRegionWeatherComponent.js';
import SongStatsComponent from './SongStatsComponent.js';

export default function ExplorePage() {

    const [isLoading, setIsLoading] = useState(false);

    return (
        <Container>
            <Typography align="center" variant="h2">explore</Typography>
            <br></br>
            {isLoading ? 'loading' : ':)'}
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                maxHeight: '100%',
                paddingTop: '50px',
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    width: '50%',
                }}>
                    <Paper elevation={2} sx={{ padding: '2%', marginRight: '3%' }}>
                        <Typography sx={{ display: 'block', textAlign: 'center', marginBottom: '2%' }} variant="caption">find songs based on weather & region</Typography>
                        <SongsForRegionWeatherComponent setIsLoading={setIsLoading}/>
                    </Paper>
                    <Paper elevation={2} sx={{ padding: '2%', marginTop: '3%', marginRight: '3%' }}>
                        <Typography sx={{ display: 'block', textAlign: 'center', marginBottom: '2%' }} variant="caption">find songs based on region & date</Typography>
                        <SongsForDateRegionComponent setIsLoading={setIsLoading}/>
                    </Paper>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    width: '50%',
                }}>
                    <Paper elevation={2} sx={{ padding: '2%' }}>
                        <Typography sx={{ display: 'block', textAlign: 'center', marginBottom: '2%' }} variant="caption">find songs based on weather & attribute (default: all songs)</Typography>
                        <SongsForAttributeWeatherComponent setIsLoading={setIsLoading}/>
                    </Paper>
                    <Paper elevation={2} sx={{ padding: '2%', marginTop: '3%' }}>
                        <Typography sx={{ display: 'block', textAlign: 'center', marginBottom: '2%' }} variant="caption">find attribute stats for songs played on given weather & region</Typography>
                        <SongStatsComponent isLoading={isLoading} setIsLoading={setIsLoading}/>
                    </Paper>
                </Box>
            </Box>
        </Container>
    )
};