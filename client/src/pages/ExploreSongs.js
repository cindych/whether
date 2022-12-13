import React, { useState, useEffect } from 'react';

import TextField from "@material-ui/core/TextField";
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

import { getSongAvgWeatherStats, getAllSongs,
         getSongStatsForWeather } from '../fetcher';

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

    const[songStatsForWeatherResults, setSongStatsForWeatherResults] = useState([]);
    const[songStatsForWeatherAttr, setSongStatsForWeatherAttr] = useState("acousticness")
    const[songStatsForWeatherLocation, setSongStatsForWeatherLocation] = useState("United States")
    const[songStatsForWeatherWeather, setSongStatsForWeatherWeather] = useState("rainy")

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
    

    return (
        <div className="indiv-song-page">
            <div style={{ width: '75%', margin: '0 auto', marginTop: '3%', display: 'flex', alignContent: 'center', flexDirection: 'column' }}>
                <div style={{ margin: '0 auto'}}>
                    <TextField style={{ marginRight: '5px' }} color="primary" variant="outlined" value={artist} label={"Artist"} onChange={e => setArtist(e.target.value)} />
                    <TextField variant="outlined" value={title} label={"Title"} onChange={e => setTitle(e.target.value)} /> 
                </div>
                <div style={{ margin: '0 auto', marginTop: '1%'}}>
                    <Button style={{ marginRight: '5px'}} variant="outlined" color="secondary" onClick={handleSongInfo}>Get all songs</Button>
                    <Button variant="outlined" onClick={handleSongAvgWeatherStats}>Get Average Weather Stats</Button>
                </div>
            </div>

            {/* sample dropdown menu button (does not do anything) */}
            <FormControl style={{minWidth: 120}}>
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


                {/* get the min, max, and average song stat for songs played in a given region with a particular weather */}
                {/* calls songStatsForWeather(attribute, location[region], weather) */}
                <FormControl style={{minWidth: 120}}>
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

                <FormControl style={{minWidth: 120}}>
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

                <FormControl style={{minWidth: 120}}>
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

                <div style={{ margin: '0 auto', marginTop: '1%'}}>
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





           
                <Paper elevation={4} sx={{ width: '90%', overflow: 'hidden', margin: '0 auto', padding: 3, marginTop: '20px' }}>
                    <Typography align="center" variant="h5">Weather Statistics ☂️</Typography>
                    <TableContainer sx={{ height: "40%" }}>
                        <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                            {statColumns.map((column) => (
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
                            {songStatResults
                            .slice(statPage * rowsPerStatPage, statPage * rowsPerStatPage + rowsPerStatPage)
                            .map((row) => {
                                return (
                                <TableRow key={row.id}>
                                    <TableCell>{row.artist}</TableCell>
                                    <TableCell>{row.title}</TableCell>
                                    <TableCell>{row.avgPrecipitation}</TableCell>
                                    <TableCell>{row.avgTemp}</TableCell>
                                    <TableCell>{row.avgSnowfall}</TableCell>
                                </TableRow>
                                );
                            })}
                        </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={songStatResults.length}
                        rowsPerPage={rowsPerStatPage}
                        page={statPage}
                        onPageChange={handleChangeStatPage}
                        onRowsPerPageChange={handleChangeRowsPerStatPage}
                    />
                </Paper>
            </div>
        </div>
    );
};

export default ExploreSongs;