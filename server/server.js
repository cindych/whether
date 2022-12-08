const express = require('express');
const mysql      = require('mysql');
var cors = require('cors')


const routes = require('./routes')
const config = require('./config.json')

const app = express();

// whitelist localhost 3000
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));

// return all songs
app.get('/allSongs', routes.allSongs)

// get info for a given song. 
app.get('/songs', routes.songInfo)

// return all songs played on days with the specified weather condition
// /songs/weather, optional location query (/songs/weather?location)
app.get('/songs/:weather', routes.songsForWeather)

// return all songs played in a given region for the provided date (in query)
// /songs/location?date
app.get('/songs/:location', routes.songsLocationDate)

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




// Route 1 - register as GET 
app.get('/hello', routes.hello)

// Route 2 - register as GET 
app.get('/jersey/:choice', routes.jersey)

// Route 3 - register as GET 
app.get('/matches/:league', routes.all_matches)

// Route 4 - register as GET 
app.get('/players', routes.all_players)

// Route 5 - register as GET 
app.get('/match', routes.match)

// Route 6 - register as GET 
app.get('/player', routes.player)

// Route 7 - register as GET 
app.get('/search/matches', routes.search_matches)

// Route 8 - register as GET 
app.get('/search/players', routes.search_players)





app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
