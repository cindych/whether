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
async function songInfo(req, res) {

    connection.query(`
        SELECT DISTINCT title, artist, id, acousticness, danceability, energy, instrumentalness, speechiness, liveness, loudness, mode, tempo, valence, key_track, duration
        FROM Songs NATURAL JOIN Chart
        WHERE artist LIKE '%${req.query.artist}%' AND title LIKE '${req.query.title}%'
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


// get avg weather stats for query song
async function songAvgWeatherStats(req, res) {
    // song query must include title and artist, formatted correctly
    // some leeway is given to title (query checks Like% instead of =) but must be mostly correct
    // if multiple artists, at least one must be included
    // optional location?

    connection.query(`
    SELECT AVG(w.precipitation), AVG(temperature), AVG(snowfall)
    FROM Chart ch JOIN Weather w ON ch.date = w.Date
    WHERE ch.artist LIKE '%${req.query.artist}%' AND ch.title LIKE '${req.query.title}%'
    `, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });

}






















// ********************************************
//            SIMPLE ROUTE EXAMPLE
// ********************************************

// Route 1 (handler)
async function hello(req, res) {
    // a GET request to /hello?name=Steve
    if (req.query.name) {
        res.send(`Hello, ${req.query.name}! Welcome to the FIFA server!`)
    } else {
        res.send(`Hello! Welcome to the FIFA server!`)
    }
}


// ********************************************
//                  WARM UP 
// ********************************************

// Route 2 (handler)
async function jersey(req, res) {
    const colors = ['red', 'blue', 'white']
    const jersey_number = Math.floor(Math.random() * 20) + 1
    const name = req.query.name ? req.query.name : "player"

    if (req.params.choice === 'number') {
        // TODO: TASK 1: inspect for issues and correct 
        res.json({ message: `Hello, ${name}!`, jersey_number: jersey_number })
    } else if (req.params.choice === 'color') {
        var lucky_color_index = Math.floor(Math.random() * 2);
        // TODO: TASK 2: change this or any variables above to return only 'red' or 'blue' at random (go Quakers!)
        res.json({ message: `Hello, ${name}!`, jersey_color: colors[lucky_color_index] })
    } else {
        // TODO: TASK 3: inspect for issues and correct
        res.json({ message: `Hello, ${name}, we like your jersey!` })
    }
}

// ********************************************
//               GENERAL ROUTES
// ********************************************


// Route 3 (handler)
async function all_matches(req, res) {
    const league = req.params.league ? req.params.league : 'D1'

    if (req.query.page && !isNaN(req.query.page)) {

        const page = req.query.page
        const pagesize = req.query.pagesize ? req.query.pagesize: 10
        const offset = (page - 1) * pagesize

        connection.query(`
        SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals
        FROM Matches
        WHERE Division = '${league}'
        ORDER BY MatchId
        LIMIT ${pagesize} OFFSET ${offset}
        `, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        })
   
    } else {
        connection.query(`SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals  
        FROM Matches 
        WHERE Division = '${league}'
        ORDER BY HomeTeam, AwayTeam`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }
}

// Route 4 (handler)
async function all_players(req, res) {

    // if page is defined
    if (req.query.page && !isNaN(req.query.page)) {

        // define page, pagesize (default 10), offset variables
        const page = req.query.page
        const pagesize = req.query.pagesize ? req.query.pagesize: 10
        const offset = (page - 1) * pagesize
    
        connection.query(`
        SELECT PlayerId, Name, Nationality, OverallRating AS Rating, Potential, Club, Value
        FROM Players
        ORDER BY Name
        LIMIT ${pagesize} OFFSET ${offset}
        `, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        })

    } else { // page is not defined
        connection.query(`
        SELECT PlayerId, Name, Nationality, OverallRating AS Rating, Potential, Club, Value
        FROM Players
        ORDER BY Name
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


// ********************************************
//             MATCH-SPECIFIC ROUTES
// ********************************************

// Route 5 (handler)
async function match(req, res) {
    
    // TODO: TASK 6: implement and test, potentially writing your own (ungraded) tests

    const id = req.query.id

    // if id is not a number (either a word or not provided)
    if (isNaN(id)) {
        res.status(400).send("/matches id NaN")
        return;
    }

    connection.query(`
        SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals, HalfTimeGoalsH AS HTHomeGoals, HalfTimeGoalsA AS HTAwayGoals, ShotsH AS ShotsHome, ShotsA AS ShotsAway, ShotsOnTargetH AS ShotsOnTargetHome, ShotsOnTargetA AS ShotsOnTargetAway, FoulsH AS FoulsHome, FoulsA AS FoulsAway, CornersH AS CornersHome, CornersA AS CornersAway, YellowCardsH AS YCHome, YellowCardsA AS YCAway, RedCardsH AS RCHome, RedCardsA AS RCAway
        FROM Matches
        WHERE ${id}=MatchId
        `, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results }) // will return [] if no results.
            }
    })
  
}

// ********************************************
//            PLAYER-SPECIFIC ROUTES
// ********************************************

// Route 6 (handler)
async function player(req, res) {

    const id = req.query.id

    // if id is not a number (either a word or not provided)
    if (isNaN(id)) {
        res.status(400).send("/player id NaN")
        return;
    }

    connection.query(`
        SELECT PlayerId, Name, Age, Photo, Nationality, Flag, OverallRating AS Rating, Potential, Club, ClubLogo, Value, Wage, InternationalReputation, Skill, JerseyNumber, ContractValidUntil, Height, Weight, BestPosition, BestOverallRating, ReleaseClause, GKPenalties, GKDiving, GKHandling, GKKicking, GKPositioning, GKReflexes, NPassing, NBallControl, NAdjustedAgility, NStamina, NStrength, NPositioning
        FROM Players
        WHERE PlayerId=${id}
        `, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                if (results.length == 0) { // player id was not found
                    res.json({ results: results }) // will return [] if no results.
                } else { // player was found
                    if (results[0].BestPosition == "GK") {
                        const GKSelect = results.map((
                            {NPassing, 
                             NBallControl, 
                             NAdjustedAgility, 
                             NStamina, 
                             NStrength, 
                             NPositioning, 
                             ...rest}) => { return rest })
                        res.json({ results: GKSelect })
                    } else {
                        const NSelect = results.map((
                            {GKPenalties, 
                             GKDiving, 
                             GKHandling, 
                             GKKicking, 
                             GKPositioning, 
                             GKReflexes,
                             ...rest}) => { return rest })
                        res.json({ results: NSelect })
                    }
                }
    }});

    // TODO: TASK 7: implement and test, potentially writing your own (ungraded) tests
}


// ********************************************
//             SEARCH ROUTES
// ********************************************

// Route 7 (handler)
async function search_matches(req, res) {
    // TODO: TASK 8: implement and test, potentially writing your own (ungraded) tests
    // IMPORTANT: in your SQL LIKE matching, use the %query% format to match the search query to substrings, not just the entire string

    const home = req.query.Home ? req.query.Home: ""
    const away = req.query.Away ? req.query.Away: ""
    const page = req.query.page 
    const pagesize = req.query.pagesize ? req.query.pagesize: 10
    const offset = (page - 1) * pagesize

    if (req.query.page && !isNaN(req.query.page)) { // if page parameter is given

        connection.query(`
        SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals
        FROM Matches
        WHERE HomeTeam LIKE '%${home}%' AND AwayTeam LIKE '%${away}%'
        ORDER BY Home, Away
        LIMIT ${pagesize} OFFSET ${offset}
        `, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
    })} else { // page param is not given. return all results
        connection.query(`
        SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals
        FROM Matches
        WHERE HomeTeam LIKE '%${home}%' AND AwayTeam LIKE '%${away}%'
        ORDER BY Home, Away
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

// Route 8 (handler)
async function search_players(req, res) {
    // TODO: TASK 9: implement and test, potentially writing your own (ungraded) tests
    // IMPORTANT: in your SQL LIKE matching, use the %query% format to match the search query to substrings, not just the entire string
    
    const name = req.query.Name ? req.query.Name: ""
    const natl = req.query.Nationality ? req.query.Nationality: ""
    const club = req.query.Club ? req.query.Club: ""
    const rl = req.query.RatingLow ? req.query.RatingLow: 0
    const rh = req.query.RatingHigh ? req.query.RatingHigh: 100
    const pl = req.query.PotentialLow ? req.query.PotentialLow: 0
    const ph = req.query.PotentialHigh ? req.query.PotentialHigh: 100
    const page = req.query.page
    const pagesize = req.query.pagesize ? req.query.pagesize: 10
    const offset = (page - 1) * pagesize

    if (req.query.page && !isNaN(req.query.page)) { // if page parameter is given

        connection.query(`
        SELECT PlayerId, Name, Nationality, OverallRating AS Rating, Potential, Club, Value
        FROM Players
        WHERE Name LIKE '%${name}%' AND Nationality LIKE '%${natl}%' AND Club LIKE '%${club}%' AND ${rl}<=OverallRating AND OverallRating<=${rh} AND ${pl}<=Potential AND Potential<=${ph} 
        LIMIT ${pagesize} OFFSET ${offset}
        `, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
    })} else { // page param is not given. return all results
        connection.query(`
        SELECT PlayerId, Name, Nationality, OverallRating AS Rating, Potential, Club, Value
        FROM Players
        WHERE Name LIKE '%${name}%' AND Nationality LIKE '%${natl}%' AND Club LIKE '%${club}%' AND ${rl}<=OverallRating AND OverallRating<=${rh} AND ${pl}<=Potential AND Potential<=${ph} 
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

module.exports = {
    allSongs, 
    basicPlaylist,
    songStatsForWeather,
    songAvgWeatherStats,
    songsForWeather,
    songsLocationDate,
    songsAttrHighLow,
    songsAttrThresholdWeather,
    songInfo,

    hello,
    jersey,
    all_matches,
    all_players,
    match,
    player,
    search_matches,
    search_players
}
