import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

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
            {isLoading ? 'loading' : ''}
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
                    <SongsForRegionWeatherComponent setIsLoading={setIsLoading}/>
                    <SongsForDateRegionComponent setIsLoading={setIsLoading}/>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    width: '50%',
                }}>
                    <SongsForAttributeWeatherComponent setIsLoading={setIsLoading}/>
                    <SongStatsComponent isLoading={isLoading} setIsLoading={setIsLoading}/>
                </Box>
            </Box>
        </Container>
    )
};