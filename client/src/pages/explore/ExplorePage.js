import React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import SongsForAttributeWeatherComponent from './SongsForAttributeWeatherComponent.js';
import SongsForDateRegionComponent from './SongsForDateRegionComponent.js';
import SongsForRegionWeatherComponent from './SongsForRegionWeatherComponent.js';
import SongStatsComponent from './SongStatsComponent.js';
import { maxHeight } from '@mui/system';

export default function ExplorePage() {
    // TODO: add toggle to flip between location date/weather region
    return (
        <Container>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                maxHeight: '100%'
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}>
                    <SongsForRegionWeatherComponent />
                    <SongsForDateRegionComponent />
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}>
                    <SongsForAttributeWeatherComponent />
                    <SongStatsComponent />
                </Box>
            </Box>
        </Container>
    )
};