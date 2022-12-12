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

import { getSongAvgWeatherStats, getSongInfo } from '../fetcher';

function IndivSong() {
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
        getSongInfo(artist, title).then(res => { 
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

    return (
        <div className="indiv-song-page">
            <div style={{ width: '75%', margin: '0 auto', marginTop: '3%', display: 'flex', alignContent: 'center', flexDirection: 'column' }}>
                <div style={{ margin: '0 auto'}}>
                    <TextField style={{ marginRight: '5px' }} color="primary" variant="outlined" value={artist} label={"Artist"} onChange={e => setArtist(e.target.value)} />
                    <TextField variant="outlined" value={title} label={"Title"} onChange={e => setTitle(e.target.value)} /> 
                </div>
                <div style={{ margin: '0 auto', marginTop: '1%'}}>
                    <Button style={{ marginRight: '5px'}} variant="outlined" color="secondary" onClick={handleSongInfo}>Get Song Info</Button>
                    <Button variant="outlined" onClick={handleSongAvgWeatherStats}>Get Average Weather Stats</Button>
                </div>
            </div>

            <div className="results">
                <Paper elevation={4} sx={{ width: '90%', overflow: 'hidden', margin: '0 auto', padding: 3, marginTop: '20px' }}>
                    <Typography align="center" variant="h5">Track Information 🎶</Typography>
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

export default IndivSong;