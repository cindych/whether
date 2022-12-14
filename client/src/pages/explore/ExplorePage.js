import React, { useState } from 'react';

import SongsForAttributeWeatherComponent from './SongsForAttributeWeatherComponent.js';
import SongsForDateRegionComponent from './SongsForDateRegionComponent.js';
import SongsForRegionWeatherComponent from './SongsForRegionWeatherComponent.js';
import SongStatsComponent from './SongStatsComponent.js';

export default function ExplorePage() {
    // TODO: add toggle to flip between location date/weather region
    return (
        <div>
            <SongsForRegionWeatherComponent />
            <SongsForDateRegionComponent />
            <SongsForAttributeWeatherComponent />
            <SongStatsComponent />
        </div>
    )
};