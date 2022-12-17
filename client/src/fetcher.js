import config from './config.json'
const PORT = process.env.PORT
const getAllSongs = async () => {
    var res = await fetch(`https://${config.server_host}/allSongs`, {
        method: 'GET',
    })
    return res.json()
}

const getSongsForWeather = async (weather, location) => {
    var res = await fetch(`https://${config.server_host}/songs/${weather}?location=${location}`, {
        method: 'GET',
    })
    return res.json()
}

const getSongsForWeatherMultLocations = async (weather) => {
    var res = await fetch(`https://${config.server_host}/songs/${weather}/multlocations`, {
        method: 'GET',
    })
    return res.json()
}

const getSongsLocationDate = async (location, date) => {
    var res = await fetch(`https://${config.server_host}/songs/locationdate/${location}?date=${date}`, {
        method: 'GET',
    })
    return res.json()
}

const getSongsAttrHighLow = async (attribute, high) => {
    var res = await fetch(`https://${config.server_host}/songs/${attribute}?high=${high}`, {
        method: 'GET',
    })
    return res.json()
}

const getBasicPlaylist = async (location, weather) => {
    var res = await fetch(`https://${config.server_host}/playlist?location=${location}&weather=${weather}`, {
        method: 'GET',
    })
    console.log("in get basic playlist")
    return res.json()
}

const getSongStatsForWeather = async (statistic, location, weather) => {
    var res = await fetch(`https://${config.server_host}/songStatsForWeather?statistic=${statistic}&location=${location}&weather=${weather}`, {
        method: 'GET',
    })
    return res.json()
}

const getSongAvgWeatherStats = async (artist, title) => {
    var res = await fetch(`http://${config.server_host}/songAvgWeatherStats?artist=${artist}&title=${title}`, {
        method: 'GET',
    })
    return res.json()
}

const getSongsAttrThresholdWeather = async (attribute, weather, minThreshold, maxThreshold) => {
    var res = await fetch(`http://${config.server_host}/songs/${attribute}/${weather}?minThreshold=${minThreshold}&maxThreshold=${maxThreshold}`, {
        method: 'GET',
    })
    return res.json()
}


const getSongInfo = async (artist, title) => {
    var res = await fetch(`http://${config.server_host}:${PORT}/songs?title=${title}&artist=${artist}`, {
        method: 'GET',
    })
    return res.json()
}

const getCities = async (attribute, weather, threshold) => {
    var res = await fetch(`http://${config.server_host}:${PORT}/cities/${attribute}/${weather}/${threshold}`, {
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
