import config from './config.json'

const getAllSongs = async (page, pagesize, league) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/allSongs`, {
        method: 'GET',
    })
    return res.json()
}

const getSongsForWeather= async (weather, location) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/songs/${weather}?location=${location}`, {
        method: 'GET',
    })
    return res.json()
}

const getSongsForWeatherMultLocations= async (weather) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/songs/${weather}/multlocations`, {
        method: 'GET',
    })
    return res.json()
}

const getSongsLocationDate= async (location, date) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/songs/${location}&date=${date}`, {
        method: 'GET',
    })
    return res.json()
}

const getSongsAttrHighLow= async (attribute, high) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/songs/${attribute}&high=${high}`, {
        method: 'GET',
    })
    return res.json()
}

const getBasicPlaylist = async (location, weather) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/playlist?location=${location}&weather=${weather}`, {
        method: 'GET',
    })
    return res.json()
}

const getSongStatsForWeather = async (statistic, location, weather) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/songStatsForWeather?statistic=${statistic}&location=${location}&weather=${weather}`, {
        method: 'GET',
    })
    return res.json()
}

const getSongAvgWeatherStats = async (artist, title) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/songAvgWeatherStats?artist=${artist}&title=${title}`, {
        method: 'GET',
    })
    return res.json()
}

const getSongsAttrThresholdWeather = async (attribute, weather, minThreshold, maxThreshold) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/songs/${attribute}/${weather}?minThreshold=${minThreshold}&maxThreshold=${maxThreshold}`, {
        method: 'GET',
    })
    return res.json()
}


const getSongInfo = async (title, artist) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/songs?title=${title}&artist=${artist}`, {
        method: 'GET',
    })
    return res.json()
}

const getCities = async (attribute, weather, threshold) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/cities/${attribute}/${weather}/${threshold}`, {
        method: 'GET',
    })
    return res.json()
}






const getAllMatches = async (page, pagesize, league) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/matches/${league}?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getAllPlayers = async (page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/players?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getMatch = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/match?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

const getPlayer = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/player?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

const getMatchSearch = async (home, away, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/matches?Home=${home}&Away=${away}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getPlayerSearch = async (name, nationality, club, rating_high, rating_low, pot_high, pot_low, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/players?Name=${name}&Nationality=${nationality}&Club=${club}&RatingLow=${rating_low}&RatingHigh=${rating_high}&PotentialHigh=${pot_high}&PotentialLow=${pot_low}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}




export {
    getAllSongs,
    getBasicPlaylist,
    getSongStatsForWeather,
    getSongAvgWeatherStats,
    getSongsForWeather,
    getSongsLocationDate,
    getSongsAttrHighLow,
    getSongsAttrThresholdWeather,
    getSongInfo,
    getSongsForWeatherMultLocations,
    getCities,
    
    getAllMatches,
    getAllPlayers,
    getMatch,
    getPlayer,
    getMatchSearch,
    getPlayerSearch
}
