import config from './config.json'

const getAllSongs = async () => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/allSongs`, {
        method: 'GET',
    })
    return res.json()
}

const getSongsForWeather = async (weather, location) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/songs/${weather}?location=${location}`, {
        method: 'GET',
    })
    return res.json()
}

const getSongsForWeatherMultLocations = async (weather) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/songs/${weather}/multlocations`, {
        method: 'GET',
    })
    return res.json()
}

const getSongsLocationDate = async (location, date) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/songs/locationdate/${location}?date=${date}`, {
        method: 'GET',
    })
    return res.json()
}

const getSongsAttrHighLow = async (attribute, high) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/songs/${attribute}?high=${high}`, {
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
    var res = await fetch(`http://${config.server_host}:${config.server_port}/songAvgWeatherStats?artist=${artist.replace("'", "''")}&title=${title.replace("'", "''")}`, {
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


const getSongInfo = async (artist, title) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/songs?title=${title.replace("'", "''")}&artist=${artist.replace("'", "''")}`, {
        method: 'GET',
    })
    return res.json()
}

const getCities = async (attribute, weather, threshold) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/cities/${attribute}/${weather}/${threshold}`, {
        method: 'GET',
    })
    return res.json();
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
    getCities
}
