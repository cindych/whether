const express = require('express');
const mysql      = require('mysql');
var cors = require('cors')
const path = require('path');


const routes = require('./routes')
const config = require('./config.json')

const app = express();
const PORT = process.env.PORT || 8000;

// whitelist localhost 3000
app.use(cors({ credentials: true, origin: ['http://whether.herokuapp.com/'] }));

app.use('/', express.static(path.join(__dirname, '../client/build')));
// return all songs
app.get('/allSongs', routes.allSongs)

// get info for a given song. 
app.get('/songs', routes.songInfo)

// return all songs played on days with the specified weather condition
// /songs/weather, optional location query (/songs/weather?location)
app.get('/songs/:weather', routes.songsForWeather)

// get songs played on days with specified weather across multiple locations 
app.get('/songs/:weather/multlocations', routes.songsForWeatherMultLocations)

// return all songs played in a given region for the provided date (in query)
// /songs/location?date
app.get('/songs/locationdate/:location', routes.songsLocationDate)

// get all songs with request attribute, query high or low? (default high)
// /songs/attribute?high (high will be true or false)
app.get('/songs/:attribute', routes.songsAttrHighLow)

// get songs with request attribute for weather within min and max thresholds (query params)
app.get('/songs/:attribute/:weather', routes.songsAttrThresholdWeather)

// get playlist of 10 songs based on default weather in some location
// /playlist/location
app.get('/playlist', routes.basicPlaylist)

// get avg rainfall, temp, or snowfall (query param) on days when query song was played
app.get('/songAvgWeatherStats', routes.songAvgWeatherStats)

// get min, max, and avg query stat for songs played on days with query weather
app.get('/songStatsForWeather', routes.songStatsForWeather)

// return cities where average specified stat of songs played on weather days is above threshold
app.get('/cities/:attribute/:weather/:threshold', routes.cities)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });

app.listen(PORT, () => {
    console.log(PORT)
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});


module.exports = app;
