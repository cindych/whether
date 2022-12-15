import React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import SongsForAttributeWeatherComponent from './SongsForAttributeWeatherComponent.js';
import SongsForDateRegionComponent from './SongsForDateRegionComponent.js';
import SongsForRegionWeatherComponent from './SongsForRegionWeatherComponent.js';
import SongStatsComponent from './SongStatsComponent.js';
import { maxHeight } from '@mui/system';

export default function ExplorePage() {
    // TODO: add toggle to flip between location date/weather region
    return (
        <Container>
            <Typography align="center" variant="h2">explore</Typography>
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
                    <SongsForRegionWeatherComponent />
                    <SongsForDateRegionComponent />
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    width: '50%',
                }}>
                    <SongsForAttributeWeatherComponent />
                    <SongStatsComponent />
                </Box>
            </Box>
        </Container>
    )
};