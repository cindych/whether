const config = require('./config.json')
const mysql = require('mysql');
const e = require('express');

// credentials in config file
const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
});
connection.connect();

// get all songs
async function allSongs(req, res) {
    // if the page is defined
    if (req.query.page && !isNaN(req.query.page)) {
        const page = req.query.page
        const pagesize = req.query.pagesize ? req.query.pagesize: 10
        const offset = (page - 1) * pagesize

        // when charts data is uploaded, change query to:
        // SELECT [all song attrs except id + song artist, title]
        // FROM Songs s JOIN Charts c ON s.id = c.id (or natural join)

        connection.query(`
        SELECT DISTINCT title, artist, id, acousticness, danceability, energy, instrumentalness, speechiness, liveness, loudness, mode, tempo, valence, key_track, duration
        FROM Songs NATURAL JOIN Chart
        LIMIT ${pagesize} OFFSET ${offset}
        `, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
                console.log("results are:", results)
            }
        })
   
    } else { // page is undefined
        connection.query(`
        SELECT DISTINCT title, artist, id, acousticness, danceability, energy, instrumentalness, speechiness, liveness, loudness, mode, tempo, valence, key_track, duration
        FROM Songs NATURAL JOIN Chart
        `, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }
}

// get info of specified song
// also possible to search for information on songs by a particular artist => e.g. artist = 'zayn' and title = ''
async function songInfo(req, res) {
    connection.query(`
        SELECT DISTINCT title, artist, id, acousticness, danceability, energy, instrumentalness, speechiness, liveness, loudness, mode, tempo, valence, key_track, duration
        FROM Songs NATURAL JOIN Chart
        WHERE artist LIKE '%${req.query.artist}%' AND title LIKE '${req.query.title}%'
        ORDER BY title
        `, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        })
}

// return songs played for req.param.weather
async function songsForWeather(req, res) {

    var query = `SELECT DISTINCT title, artist \
    FROM Chart ch JOIN Weather w ON ch.date = w.Date`
    if (req.params.weather === 'rainy') {
        query += `\
        WHERE PRECIPITATION > 0.1`
    } else if (req.params.weather === 'sunny') {
        query += `\
        WHERE w.precipitation < 0.1 AND w.temperature > 50`
    } else if (req.params.weather === 'snowy') {
        query += `\
        WHERE w.snowfall > 0.1`
    } else if (req.params.weather === 'cloudy') {
        query += `\
        WHERE w.cloudiness > 400`
    } else if (req.params.weather === 'windy') {
        query += `\
        WHERE w.Wind_Speed > 20`
    } 

    if (req.query.location != undefined && req.query.location != '') {
        query += ` AND ch.region = '${req.query.location}'`
    }

    connection.query(`
    ${query}
    `, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

// get all songs played on query date in given location, date is optional
async function songsLocationDate(req, res) {
    // location must be one of the following: 
        // africa, argentina, australia, brazil, canada, chile, france, germany,
        // greece, japan, mexico, south korea, spain, ukraine, united states
    // date format must be "yyyy-mm-dd"

    var query = `
    SELECT DISTINCT title, artist, id, acousticness, danceability, energy, instrumentalness, speechiness, liveness, loudness, mode, tempo, valence, key_track, duration
    FROM Songs NATURAL JOIN Chart
    WHERE ch.region=${req.param.location}
    `

    if (req.query.date) {
        query += `AND ch.date=${req.query.date}`
    }

    connection.query(`
     ${query}
    `, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
  
}

// get songs with either high or low attr, as specified (high/low is query, attr is req)
async function songsAttrHighLow(req, res) {
    // song attribute must be one of the following:
        // acousticness, danceability, energy, instrumentalness,
        // speechiness, liveness, loudness, mode, tempo, valence, duration
    // high/low is named high, takes values true or false

    var query = `
    SELECT * 
    FROM Songs
    WHERE ${req.param.attribute}
    `
    const high = req.query.high ? req.query.high : 'true';

    if (high === 'true') {
        query += `>= 0.5`
    } else {
        query += `< 0.5`
    }

    connection.query(`
    ${query}
    `, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
  
}

// get songs with specified attribute within threshold min/max played on days with weather
async function songsAttrThresholdWeather(req, res) {
    // song attribute must be one of the following:
        // acousticness, danceability, energy, instrumentalness,
        // speechiness, liveness, loudness, mode, tempo, valence, duration
    // high/low is named high, takes values true or false

    const min = req.query.minThreshold ? req.query.minThreshold: 0

    const max = req.query.maxThreshold ? req.query.maxThreshold: 1

    var query = `
    SELECT * 
    FROM Songs s JOIN Chart ch ON s.id = ch.id
        JOIN Weather w ON w.Date = ch.date
    WHERE ${req.params.attribute} >= ${min} AND ${req.params.attribute} <= ${max}
    `

    if (req.params.weather === 'rainy') {
        query += `AND w.precipitation > 0.1`
    } else if (req.params.weather === 'sunny') {
        query += `AND w.precipitation < 0.1 AND w.temperature > 50`
    } else if (req.params.weather === 'snowy') {
        query += `AND w.snowfall > 0.1`
    } else if (req.params.weather === 'cloudy') {
        query += `AND w.cloudiness > 400`
    } else if (req.params.weather === 'windy') {
        query += `AND w.Wind_Speed > 20`
    } 

    connection.query(`
    ${query}
    `, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
  
}



// get basic playlist
async function basicPlaylist(req, res) {
    // note: location must be a region from the following list:
        // africa, argentina, australia, brazil, canada, chile, france, germany,
        // greece, japan, mexico, south korea, spain, ukraine, united states
    // and weather must be from the following list:
        // sunny (avg temp > 50 and precipitation < 0.1), rainy (precipitation >= 0.1), snowy (snowfall > 0.1)
    
    var query = `WITH weatherDays(date) AS (
        SELECT date
        FROM Weather w JOIN Cities c ON w.location = c.city`
    
        if (req.query.weather === 'rainy') {
            query += `\
            WHERE w.precipitation > 0.1
            `
        } else if (req.query.weather === 'snowy') {
            query += `\
            WHERE w.snowfall > 0.1
            `
        } else if (req.query.weather === 'sunny') {
            query += `\
            WHERE w.precipitation < 0.1 AND w.temperature > 50
            `
        }

        query += `AND c.region = '${req.query.location}'),
        regionSongs(title, artist, date) AS (
            SELECT title, artist, date
            FROM Chart
            WHERE region = '${req.query.location}')
        SELECT DISTINCT title, artist
        FROM regionSongs NATURAL JOIN weatherDays
        ORDER BY RAND()
        LIMIT 10
        `

        connection.query(`
        ${query}
        `, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
}

// get min, max, and avg query stat for songs played on days with query weather
async function songStatsForWeather(req, res) {
    // song statistic must be one of the following:
        // acousticness, danceability, energy, instrumentalness,
        // speechiness, liveness, loudness, mode, tempo, valence, duration
    // and weather must be from the following list:
        // sunny (avg temp > 50 and precipitation < 0.1), rainy (precipitation >= 0.1), snowy (snowfall > 0.1)
    
    // note: boolean condition needs to be added! 
    // (corresponds to NOT IN instead of IN)
        if (req.query.weather = 'rainy') {
        connection.query(`
        WITH regionWeatherSongs(id) AS (
            SELECT ch.id
            FROM Chart ch JOIN Cities c on c.region = ch.region
                JOIN Weather w ON w.location = c.city AND w.date = ch.date
            WHERE w.precipitation > 0.1 AND c.region = '${req.query.location}'
        )
        SELECT MIN(${req.query.statistic}), MAX(${req.query.statistic}), AVG(${req.query.statistic})
        FROM Songs s
        WHERE s.id IN (SELECT * FROM regionWeatherSongs)
        `, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    } else if (req.query.weather = 'snowy') {
        connection.query(`
        WITH regionWeatherSongs(id) AS (
            SELECT ch.id
            FROM Chart ch JOIN Cities c on c.region = ch.region
                JOIN Weather w ON w.location = c.city AND w.date = ch.date
            WHERE w.snowfall > 0.1 AND c.region = '${req.query.location}'
        )
        SELECT MIN(${req.query.statistic}), MAX(${req.query.statistic}), AVG(${req.query.statistic})
        FROM Songs s
        WHERE s.id IN (SELECT * FROM regionWeatherSongs)
        `, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    } else if (req.query.weather = 'sunny') {
        connection.query(`
        WITH regionWeatherSongs(id) AS (
            SELECT ch.id
            FROM Chart ch JOIN Cities c on c.region = ch.region
                JOIN Weather w ON w.location = c.city AND w.date = ch.date
            WHERE w.precipitation < 0.1 AND w.temperature > 50 AND c.region = '${req.query.location}'
        )
        SELECT MIN(${req.query.statistic}), MAX(${req.query.statistic}), AVG(${req.query.statistic})
        FROM Songs s
        WHERE s.id IN (SELECT * FROM regionWeatherSongs)
        `, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }
  
}

// songAvgWeatherStats: get avg weather stats for query song
// added group by to show avg weather stats for EACH song
// e.g. to look for avg song stats of all songs by zayn, artist = 'zayn' and title = ''
async function songAvgWeatherStats(req, res) {
    // song query must include title and artist, formatted correctly
    // some leeway is given to title (query checks Like% instead of =) but must be mostly correct
    // if multiple artists, at least one must be included
    // optional location?

    connection.query(`
    SELECT artist, title, AVG(w.precipitation) AS avgPrecipitation, AVG(temperature) as avgTemp, AVG(snowfall) as avgSnowfall
    FROM Chart ch JOIN Weather w ON ch.date = w.Date
    WHERE ch.artist LIKE '%${req.query.artist}%' AND ch.title LIKE '${req.query.title}%'
    GROUP BY artist, title
    ORDER BY title
    `, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

module.exports = {
    allSongs, 
    basicPlaylist,
    songStatsForWeather,
    songAvgWeatherStats,
    songsForWeather,
    songsLocationDate,
    songsAttrHighLow,
    songsAttrThresholdWeather,
    songInfo
}
