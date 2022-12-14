import React, { useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';

import {
    getSongAvgWeatherStats, getAllSongs,
    getSongStatsForWeather, getSongsForWeather,
    getSongsForWeatherMultLocations,
    getSongsAttrThresholdWeather
} from '../fetcher';

function ExploreSongs() {
    const [artist, setArtist] = useState('');
    const [title, setTitle] = useState('');

    const [songInfoResults, setSongInfoResults] = useState([]);
    const [infoPage, setInfoPage] = React.useState(0);
    const [rowsPerInfoPage, setRowsPerInfoPage] = React.useState(5);
    const infoColumns = [
        { id: 'artist', label: 'Artist' },
        { id: 'title', label: 'Title' },
        { id: 'id', label: 'Id' },
        { id: 'acousticness', label: 'Acousticness' },
        { id: 'danceability', label: 'Danceability' },
        { id: 'energy', label: 'Energy' },
        { id: 'instrumentalness', label: 'Instrumentalness' },
        { id: 'speechiness', label: 'Speechiness' },
        { id: 'liveness', label: 'Liveness' },
        { id: 'loudness', label: 'Loudness' },
        { id: 'mode', label: 'Mode' },
        { id: 'tempo', label: 'Tempo' },
        { id: 'valence', label: 'Valence' },
        { id: 'key_track', label: 'Key_Track' },
        { id: 'duration', label: 'Duration' }
    ];

    const songStatsColumns = [
        { id: 'min', label: 'Minimum' },
        { id: 'max', label: 'Maximum' },
        { id: 'avg', label: 'Average' }
    ];

    const songsForWeatherColumns = [
        { id: 'title', label: 'Title' },
        { id: 'artist', label: 'Artist' },
        // { id: 'region', label: 'Region' }
    ];

    const [songStatResults, setSongStatResults] = useState([]);
    const [statPage, setStatPage] = React.useState(0);
    const [rowsPerStatPage, setRowsPerStatPage] = React.useState(5);
    const statColumns = [
        { id: 'artist', label: 'Artist' },
        { id: 'title', label: 'Title' },
        { id: 'avgPrecipitation', label: 'Avg Precipitation' },
        { id: 'avgTemp', label: 'Avg Temperature' },
        { id: 'avgSnowfall', label: 'Avg Snowfall' }
    ];

    const handleSongInfo = () => {
        getAllSongs().then(res => {
            setSongInfoResults(res.results)
            console.log(songInfoResults)
            console.log(songInfoResults.length)
        })
    };

    const handleSongAvgWeatherStats = () => {
        getSongAvgWeatherStats(artist, title).then(res => {
            setSongStatResults(res.results)
            console.log(songStatResults)
            console.log(songStatResults.length)
        })
    };

    const handleChangeInfoPage = (e, newPage) => {
        setInfoPage(newPage);
    }

    const handleChangeRowsPerInfoPage = e => {
        setRowsPerInfoPage(+e.target.value);
        setInfoPage(0);
    }

    const handleChangeStatPage = (e, newPage) => {
        setStatPage(newPage);
    }

    const handleChangeRowsPerStatPage = e => {
        setRowsPerStatPage(+e.target.value);
        setStatPage(0);
    }

    const [songStatsForWeatherResults, setSongStatsForWeatherResults] = useState([]);
    const [songStatsForWeatherAttr, setSongStatsForWeatherAttr] = useState("acousticness")
    const [songStatsForWeatherLocation, setSongStatsForWeatherLocation] = useState("United States")
    const [songStatsForWeatherWeather, setSongStatsForWeatherWeather] = useState("rainy")

    const handleSongStatsForWeather = () => {
        getSongStatsForWeather(songStatsForWeatherAttr, songStatsForWeatherLocation, songStatsForWeatherWeather).then(res => {
            setSongStatsForWeatherResults(res.results)
            console.log(songStatsForWeatherResults)
            console.log(songStatsForWeatherResults.length)
        })
    };

    const handleChangeSongStatsForWeatherAttr = e => {
        setSongStatsForWeatherAttr(e.target.value);
        getSongStatsForWeather(e.target.value, songStatsForWeatherLocation, songStatsForWeatherWeather).then(res => {
            setSongStatsForWeatherResults(res.results)
            console.log("THIS IS FOR SONG STATS FOR WEATHER")
            console.log(songStatsForWeatherResults)
            console.log(songStatsForWeatherResults.length)
        })
    }

    const handleChangeSongStatsForWeatherLocation = e => {
        setSongStatsForWeatherLocation(e.target.value);
        getSongStatsForWeather(songStatsForWeatherAttr, e.target.value, songStatsForWeatherWeather).then(res => {
            setSongStatsForWeatherResults(res.results)
            console.log(songStatsForWeatherResults)
            console.log(songStatsForWeatherResults.length)
        })
    }

    const handleChangeSongStatsForWeatherWeather = e => {
        setSongStatsForWeatherWeather(e.target.value);
        getSongStatsForWeather(songStatsForWeatherAttr, songStatsForWeatherLocation, e.target.value).then(res => {
            setSongStatsForWeatherResults(res.results)
            console.log(songStatsForWeatherResults)
            console.log(songStatsForWeatherResults.length)
        })
    }

    const [songsForWeatherResults, setSongsForWeatherResults] = useState([])
    const [songsForWeatherLocation, setSongsForWeatherLocation] = useState("")
    const [songsForWeatherWeather, setSongsForWeatherWeather] = useState("windy")

    const handleChangeSongsForWeatherLocation = e => {
        setSongsForWeatherLocation(e.target.value);
        getSongsForWeather(songsForWeatherWeather, e.target.value).then(res => {
            setSongsForWeatherResults(res.results)
            console.log(songsForWeatherResults)
        })
    }

    const handleChangeSongsForWeatherWeather = e => {
        setSongsForWeatherWeather(e.target.value)
        getSongsForWeather(e.target.value, songsForWeatherLocation).then(res => {
            setSongsForWeatherResults(res.results)
            console.log(songsForWeatherResults)
        })
        console.log("songs for weather weather updated")
    }

    const handleSongsForWeather = () => {
        getSongsForWeather(songsForWeatherWeather, songsForWeatherLocation).then(res => {
            setSongsForWeatherResults(res.results)
            console.log(songsForWeatherResults)
        })
    }


    const [songsForWeatherMultLocationsResults, setSongsForWeatherMultLocationsResults] = useState([])
    const [songsForWeatherMultLocationsWeather, setSongsForWeatherMultLocationsWeather] = useState("rainy")

    const handleSongsForWeatherMultLocations = () => {
        getSongsForWeatherMultLocations(songsForWeatherMultLocationsWeather).then(res => {
            setSongsForWeatherMultLocationsResults(res.results)
            console.log(songsForWeatherMultLocationsResults)
        })
    }

    const handleChangeSongsForWeatherMultLocationsWeather = e => {
        setSongsForWeatherMultLocationsWeather(e.target.value)
        getSongsForWeatherMultLocations(e.target.value).then(res => {
            setSongsForWeatherMultLocationsResults(res.results)
            console.log(songsForWeatherMultLocationsResults)
        })
    }

    const [songsAttrThresholdWeatherResults, setSongsAttrThresholdWeatherResults] = useState([])
    const [songsAttrThresholdWeatherAttr, setSongsAttrThresholdWeatherAttr] = useState("danceability")
    const [songsAttrThresholdWeatherWeather, setSongsAttrThresholdWeatherWeather] = useState("rainy")
    const [songsAttrThresholdWeatherMin, setSongsAttrThresholdWeatherMin] = useState(0.2)
    const [songsAttrThresholdWeatherMax, setSongsAttrThresholdWeatherMax] = useState(0.7)

    const handleSongsAttrThresholdWeather = () => {
        getSongsAttrThresholdWeather(songsAttrThresholdWeatherAttr, songsAttrThresholdWeatherWeather, songsAttrThresholdWeatherMin, songsAttrThresholdWeatherMax).then(res => {
            setSongsAttrThresholdWeatherResults(res.results)
            console.log(songsAttrThresholdWeatherResults)
        })
    }

    const handleChangeSongsAttrThresholdWeatherAttr = e => {
        setSongsAttrThresholdWeatherAttr(e.target.value)
        getSongsAttrThresholdWeather(e.target.value, songsAttrThresholdWeatherWeather, songsAttrThresholdWeatherMin, songsAttrThresholdWeatherMax).then(res => {
            setSongsAttrThresholdWeatherResults(res.results)
            console.log(songsAttrThresholdWeatherResults)
        })
        console.log(e.target.value)
    }

    const handleChangeSongsAttrThresholdWeatherWeather = e => {
        setSongsAttrThresholdWeatherWeather(e.target.value)
        getSongsAttrThresholdWeather(songsAttrThresholdWeatherAttr, e.target.value, songsAttrThresholdWeatherMin, songsAttrThresholdWeatherMax).then(res => {
            setSongsAttrThresholdWeatherResults(res.results)
            console.log(songsAttrThresholdWeatherResults)
        })
        console.log(e.target.value)
    }

    const handleChangeSongsAttrThresholdWeatherThreshold = e => {
        setSongsAttrThresholdWeatherMin(e.target.value[0])
        setSongsAttrThresholdWeatherMax(e.target.value[1])
        getSongsAttrThresholdWeather(songsAttrThresholdWeatherAttr, songsAttrThresholdWeatherWeather, e.target.value[0], e.target.value[1]).then(res => {
            setSongsAttrThresholdWeatherResults(res.results)
            console.log(songsAttrThresholdWeatherResults)
        })
    }


    return (
        <div className="indiv-song-page">
            <div style={{ width: '75%', margin: '0 auto', marginTop: '3%', display: 'flex', alignContent: 'center', flexDirection: 'column' }}>
                <div style={{ margin: '0 auto' }}>
                    <TextField style={{ marginRight: '5px' }} color="primary" variant="outlined" value={artist} label={"Artist"} onChange={e => setArtist(e.target.value)} />
                    <TextField variant="outlined" value={title} label={"Title"} onChange={e => setTitle(e.target.value)} />
                </div>
                <div style={{ margin: '0 auto', marginTop: '1%' }}>
                    <Button style={{ marginRight: '5px' }} variant="outlined" color="secondary" onClick={handleSongInfo}>Get all songs</Button>
                    <Button variant="outlined" onClick={handleSongAvgWeatherStats}>Get Average Weather Stats</Button>
                </div>
            </div>

            {/* sample dropdown menu button (does not do anything) */}
            <FormControl style={{ minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={10}
                    label="Age"
                    onChange={handleSongInfo}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>

            <div className="results">

                {/* table containing info for all songs */}
                {/* calls getAllSongs() */}
                <div className='allSongs()'>
                    <Paper elevation={4} sx={{ width: '90%', overflow: 'hidden', margin: '0 auto', padding: 3, marginTop: '20px' }}>
                        <Typography align="center" variant="h5"> 🎶 All Songs 🎶</Typography>
                        <TableContainer sx={{ height: "40%" }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {infoColumns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {songInfoResults
                                        .slice(infoPage * rowsPerInfoPage, infoPage * rowsPerInfoPage + rowsPerInfoPage)
                                        .map((row) => {
                                            return (
                                                <TableRow key={row.id}>
                                                    <TableCell>{row.artist}</TableCell>
                                                    <TableCell>{row.title}</TableCell>
                                                    <TableCell>{row.id}</TableCell>
                                                    <TableCell>{row.acousticness}</TableCell>
                                                    <TableCell>{row.danceability}</TableCell>
                                                    <TableCell>{row.energy}</TableCell>
                                                    <TableCell>{row.instrumentalness}</TableCell>
                                                    <TableCell>{row.speechiness}</TableCell>
                                                    <TableCell>{row.liveness}</TableCell>
                                                    <TableCell>{row.loudness}</TableCell>
                                                    <TableCell>{row.mode}</TableCell>
                                                    <TableCell>{row.tempo}</TableCell>
                                                    <TableCell>{row.valence}</TableCell>
                                                    <TableCell>{row.key_track}</TableCell>
                                                    <TableCell>{row.duration}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={songInfoResults.length}
                            rowsPerPage={rowsPerInfoPage}
                            page={infoPage}
                            onPageChange={handleChangeInfoPage}
                            onRowsPerPageChange={handleChangeRowsPerInfoPage}
                        />
                    </Paper>
                </div>

                {/* get the min, max, and average song stat for songs played in a given region with a particular weather */}
                {/* calls songStatsForWeather(attribute, location[region], weather) */}

                <div className='songStatsForWeather(attr, location, weather)'>
                    <FormControl style={{ minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-label">Song attribute</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={songStatsForWeatherAttr}
                            label="Age"
                            onChange={handleChangeSongStatsForWeatherAttr}
                        >
                            <MenuItem value={'acousticness'}>Accousticness</MenuItem>
                            <MenuItem value={'danceability'}>Danceability</MenuItem>
                            <MenuItem value={'energy'}>Energy</MenuItem>
                            <MenuItem value={'instrumentalness'}>Instrumentalness</MenuItem>
                            <MenuItem value={'speechiness'}>Speechiness</MenuItem>
                            <MenuItem value={'liveness'}>Liveliness</MenuItem>
                            <MenuItem value={'loudness'}>Loudness</MenuItem>
                            <MenuItem value={'mode'}>Mode</MenuItem>
                            <MenuItem value={'tempo'}>Tempo</MenuItem>
                            <MenuItem value={'valence'}>Valence</MenuItem>
                            <MenuItem value={'duration'}>Duration</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl style={{ minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-label">Region</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={songStatsForWeatherLocation}
                            label="Age"
                            onChange={handleChangeSongStatsForWeatherLocation}
                        >
                            <MenuItem value={'Africa'}>Africa</MenuItem>
                            <MenuItem value={'Argentina'}>Argentina</MenuItem>
                            <MenuItem value={'Australia'}>Australia</MenuItem>
                            <MenuItem value={'Brazil'}>Brazil</MenuItem>
                            <MenuItem value={'Canada'}>Canada</MenuItem>
                            <MenuItem value={'Chile'}>Chile</MenuItem>
                            <MenuItem value={'France'}>France</MenuItem>
                            <MenuItem value={'Germany'}>Germany</MenuItem>
                            <MenuItem value={'Greece'}>Greece</MenuItem>
                            <MenuItem value={'Japan'}>Japan</MenuItem>
                            <MenuItem value={'Mexico'}>Mexico</MenuItem>
                            <MenuItem value={'South Korea'}>South Korea</MenuItem>
                            <MenuItem value={'Spain'}>Spain</MenuItem>
                            <MenuItem value={'Ukraine'}>Ukraine</MenuItem>
                            <MenuItem value={'United States'}>United States</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl style={{ minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-label">Weather</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={songStatsForWeatherWeather}
                            label="Age"
                            onChange={handleChangeSongStatsForWeatherWeather}
                        >
                            <MenuItem value={'rainy'}>Rainy</MenuItem>
                            <MenuItem value={'snowy'}>Snowy</MenuItem>
                            <MenuItem value={'sunny'}>Sunny</MenuItem>
                        </Select>
                    </FormControl>

                    <div style={{ margin: '0 auto', marginTop: '1%' }}>
                        <Button variant="outlined" onClick={handleSongStatsForWeather}>Get Song Stats For Weather</Button>
                    </div>

                    <Paper elevation={4} sx={{ width: '90%', overflow: 'hidden', margin: '0 auto', padding: 3, marginTop: '20px' }}>
                        <Typography align="center" variant="h5"> Min, max, and average {songStatsForWeatherAttr} for songs played in {songStatsForWeatherLocation} on {songStatsForWeatherWeather} days</Typography>
                        <TableContainer sx={{ height: "40%" }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {songStatsColumns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {songStatsForWeatherResults
                                        .slice(infoPage * rowsPerInfoPage, infoPage * rowsPerInfoPage + rowsPerInfoPage)
                                        .map((row) => {
                                            return (
                                                <TableRow key={row.min}>
                                                    <TableCell>{row.min}</TableCell>
                                                    <TableCell>{row.max}</TableCell>
                                                    <TableCell>{row.avg}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            // rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={songStatsForWeatherResults.length}
                        // rowsPerPage={rowsPerInfoPage}
                        // page={infoPage}
                        // onPageChange={handleChangeInfoPage}
                        // onRowsPerPageChange={handleChangeRowsPerInfoPage}
                        />
                    </Paper>
                </div>

                {/* get songs played in a region for a particular weather */}
                {/* calls songsForWeather(weather, location[region]) */}
                <div className='songsForWeather(weather, location)'>
                    <FormControl style={{ minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-label">Region</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={songsForWeatherLocation}
                            label="Age"
                            onChange={handleChangeSongsForWeatherLocation}
                        >
                            <MenuItem value={''}>All regions</MenuItem>
                            <MenuItem value={'Africa'}>Africa</MenuItem>
                            <MenuItem value={'Argentina'}>Argentina</MenuItem>
                            <MenuItem value={'Australia'}>Australia</MenuItem>
                            <MenuItem value={'Brazil'}>Brazil</MenuItem>
                            <MenuItem value={'Canada'}>Canada</MenuItem>
                            <MenuItem value={'Chile'}>Chile</MenuItem>
                            <MenuItem value={'France'}>France</MenuItem>
                            <MenuItem value={'Germany'}>Germany</MenuItem>
                            <MenuItem value={'Greece'}>Greece</MenuItem>
                            <MenuItem value={'Japan'}>Japan</MenuItem>
                            <MenuItem value={'Mexico'}>Mexico</MenuItem>
                            <MenuItem value={'South Korea'}>South Korea</MenuItem>
                            <MenuItem value={'Spain'}>Spain</MenuItem>
                            <MenuItem value={'Ukraine'}>Ukraine</MenuItem>
                            <MenuItem value={'United States'}>United States</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl style={{ minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-label">Weather</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={songsForWeatherWeather}
                            label="Age"
                            onChange={handleChangeSongsForWeatherWeather}
                        >
                            <MenuItem value={'rainy'}>Rainy</MenuItem>
                            <MenuItem value={'snowy'}>Snowy</MenuItem>
                            <MenuItem value={'sunny'}>Sunny</MenuItem>
                            <MenuItem value={'cloudy'}>Cloudy</MenuItem>
                            <MenuItem value={'windy'}>Windy</MenuItem>
                        </Select>
                    </FormControl>

                    <div style={{ margin: '0 auto', marginTop: '1%' }}>
                        <Button variant="outlined" onClick={handleSongsForWeather}>Get Songs Played For Weather</Button>
                    </div>

                    <Paper elevation={4} sx={{ width: '90%', overflow: 'hidden', margin: '0 auto', padding: 3, marginTop: '20px' }}>
                        <Typography align="center" variant="h5"> Songs played in {songsForWeatherLocation ? songsForWeatherLocation : "all regions"} when the weather was {songsForWeatherWeather}</Typography>
                        <TableContainer sx={{ height: "40%" }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {songsForWeatherColumns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {songsForWeatherResults
                                        .slice(infoPage * rowsPerInfoPage, infoPage * rowsPerInfoPage + rowsPerInfoPage)
                                        .map((row) => {
                                            return (
                                                <TableRow key={row.title}>
                                                    <TableCell>{row.title}</TableCell>
                                                    <TableCell>{row.artist}</TableCell>
                                                    {/* <TableCell>{row.region}</TableCell> */}
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={songInfoResults.length}
                            rowsPerPage={rowsPerInfoPage}
                            page={infoPage}
                            onPageChange={handleChangeInfoPage}
                            onRowsPerPageChange={handleChangeRowsPerInfoPage}
                        />
                    </Paper>
                </div>

                {/* get songs played in given region for text field date (yyyy-mm-dd) */}
                {/* calls songsLocationDate(location, date) */}





                {/* get songs played for a weather within the given threshold */}
                {/* calls songsAttrThresholdWeather(attr, weather, minThreshold, maxThreshold) */}
                <div className='songsAttrThresholdWeather(attr, weather, min, max)'>

                    <FormControl style={{ minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-label">Song attribute</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={songsAttrThresholdWeatherAttr}
                            label="Age"
                            onChange={handleChangeSongsAttrThresholdWeatherAttr}
                        >
                            <MenuItem value={'acousticness'}>Accousticness</MenuItem>
                            <MenuItem value={'danceability'}>Danceability</MenuItem>
                            <MenuItem value={'energy'}>Energy</MenuItem>
                            <MenuItem value={'instrumentalness'}>Instrumentalness</MenuItem>
                            <MenuItem value={'speechiness'}>Speechiness</MenuItem>
                            <MenuItem value={'liveness'}>Liveliness</MenuItem>
                            <MenuItem value={'loudness'}>Loudness</MenuItem>
                            <MenuItem value={'mode'}>Mode</MenuItem>
                            <MenuItem value={'tempo'}>Tempo</MenuItem>
                            <MenuItem value={'valence'}>Valence</MenuItem>
                            <MenuItem value={'duration'}>Duration</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl style={{ minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-label">Weather</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={songsAttrThresholdWeatherWeather}
                            label="Age"
                            onChange={handleChangeSongsAttrThresholdWeatherWeather}
                        >
                            <MenuItem value={'rainy'}>Rainy</MenuItem>
                            <MenuItem value={'snowy'}>Snowy</MenuItem>
                            <MenuItem value={'sunny'}>Sunny</MenuItem>
                            <MenuItem value={'cloudy'}>Cloudy</MenuItem>
                            <MenuItem value={'windy'}>Windy</MenuItem>
                        </Select>
                    </FormControl>

                    <Slider
                        getAriaLabel={() => 'Temperature range'}
                        value={[songsAttrThresholdWeatherMin, songsAttrThresholdWeatherMax]}
                        onChange={handleChangeSongsAttrThresholdWeatherThreshold}
                        valueLabelDisplay="auto"
                    />

                    <div style={{ margin: '0 auto', marginTop: '1%' }}>
                        <Button variant="outlined" onClick={handleSongsAttrThresholdWeather}>Get Songs With Attribute Within Threshold For Weather</Button>
                    </div>

                    <Paper elevation={4} sx={{ width: '90%', overflow: 'hidden', margin: '0 auto', padding: 3, marginTop: '20px' }}>
                        <Typography align="center" variant="h5"> Songs with {songsAttrThresholdWeatherAttr} between {songsAttrThresholdWeatherMin} and {songsAttrThresholdWeatherMax} played on {songsAttrThresholdWeatherWeather} days</Typography>
                        <TableContainer sx={{ height: "40%" }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {infoColumns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {songsAttrThresholdWeatherResults
                                        .slice(infoPage * rowsPerInfoPage, infoPage * rowsPerInfoPage + rowsPerInfoPage)
                                        .map((row) => {
                                            return (
                                                <TableRow key={row.id}>
                                                    <TableCell>{row.artist}</TableCell>
                                                    <TableCell>{row.title}</TableCell>
                                                    <TableCell>{row.id}</TableCell>
                                                    <TableCell>{row.acousticness}</TableCell>
                                                    <TableCell>{row.danceability}</TableCell>
                                                    <TableCell>{row.energy}</TableCell>
                                                    <TableCell>{row.instrumentalness}</TableCell>
                                                    <TableCell>{row.speechiness}</TableCell>
                                                    <TableCell>{row.liveness}</TableCell>
                                                    <TableCell>{row.loudness}</TableCell>
                                                    <TableCell>{row.mode}</TableCell>
                                                    <TableCell>{row.tempo}</TableCell>
                                                    <TableCell>{row.valence}</TableCell>
                                                    <TableCell>{row.key_track}</TableCell>
                                                    <TableCell>{row.duration}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={songsAttrThresholdWeatherResults.length}
                            rowsPerPage={rowsPerInfoPage}
                            page={infoPage}
                            onPageChange={handleChangeInfoPage}
                            onRowsPerPageChange={handleChangeRowsPerInfoPage}
                        />
                    </Paper>


                </div>

                {/* get songs played for a given weather across multiple locations */}
                {/* calls songsForWeatherMultLocations(weather) */}

                <div className='songsForWeatherMultLocations(weather)'>
                    <FormControl style={{ minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-label">Weather</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={songsForWeatherMultLocationsWeather}
                            label="Age"
                            onChange={handleChangeSongsForWeatherMultLocationsWeather}
                        >
                            <MenuItem value={'rainy'}>Rainy</MenuItem>
                            <MenuItem value={'snowy'}>Snowy</MenuItem>
                            <MenuItem value={'sunny'}>Sunny</MenuItem>
                            <MenuItem value={'cloudy'}>Cloudy</MenuItem>
                            <MenuItem value={'windy'}>Windy</MenuItem>
                        </Select>
                    </FormControl>

                    <div style={{ margin: '0 auto', marginTop: '1%' }}>
                        <Button variant="outlined" onClick={handleSongsForWeatherMultLocations}>Get Songs For Weather (Multiple Locations)</Button>
                    </div>

                    <Paper elevation={4} sx={{ width: '90%', overflow: 'hidden', margin: '0 auto', padding: 3, marginTop: '20px' }}>
                        <Typography align="center" variant="h5"> Songs played on {songsForWeatherMultLocationsWeather} days across multiple locations</Typography>
                        <TableContainer sx={{ height: "40%" }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {songsForWeatherColumns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {songsForWeatherMultLocationsResults
                                        .slice(infoPage * rowsPerInfoPage, infoPage * rowsPerInfoPage + rowsPerInfoPage)
                                        .map((row) => {
                                            return (
                                                <TableRow key={row.title}>
                                                    <TableCell>{row.title}</TableCell>
                                                    <TableCell>{row.artist}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={songsForWeatherMultLocationsResults.length}
                            rowsPerPage={rowsPerInfoPage}
                            page={infoPage}
                            onPageChange={handleChangeInfoPage}
                            onRowsPerPageChange={handleChangeRowsPerInfoPage}
                        />
                    </Paper>
                </div>

            </div>
        </div>
    );
};

export default ExploreSongs;