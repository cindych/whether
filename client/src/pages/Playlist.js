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

import { getBasicPlaylist } from '../fetcher';

function Playlist() {


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

    const handleChangeInfoPage = (e, newPage) => {
        setInfoPage(newPage);
    }

    const handleChangeRowsPerInfoPage = e => {
        setRowsPerInfoPage(+e.target.value);
        setInfoPage(0);
    }


    const playlistColumns = [
        { id: 'title', label: 'Title' },
        { id: 'artist', label: 'Artist' },
    ];

    const [playlistResults, setPlaylistResults] = useState([]);
    const [playlistRegion, setPlaylistRegion] = useState("Argentina")
    const [playlistWeather, setPlaylistWeather] = useState("rainy")

    const handleChangePlaylistRegion = e => {
        setPlaylistRegion(e.target.value);
        getBasicPlaylist(e.target.value, playlistWeather).then(res => {
            setPlaylistResults(res.results)
            console.log(playlistResults)
        })
    }

    const handleChangePlaylistWeather = e => {
        setPlaylistWeather(e.target.value);
        getBasicPlaylist(playlistRegion, e.target.value).then(res => {
            setPlaylistResults(res.results)
            console.log(playlistResults)
        })
    }

    const handlePlaylist = () => {
        getBasicPlaylist(playlistRegion, playlistWeather).then(res => {
            setPlaylistResults(res.results)
            console.log(playlistResults)
        })
    }

    return (
        <div className="playlist-page">
            <FormControl style={{ minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">Region</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={playlistRegion}
                    label="Age"
                    onChange={handleChangePlaylistRegion}
                >
                    {/* <MenuItem value={''}>All regions</MenuItem> */}
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
                    value={playlistWeather}
                    label="Age"
                    onChange={handleChangePlaylistWeather}
                >
                    <MenuItem value={'rainy'}>Rainy</MenuItem>
                    <MenuItem value={'snowy'}>Snowy</MenuItem>
                    <MenuItem value={'sunny'}>Sunny</MenuItem>
                    {/* <MenuItem value={'cloudy'}>Cloudy</MenuItem>
                <MenuItem value={'windy'}>Windy</MenuItem> */}
                </Select>
            </FormControl>

            <div style={{ margin: '0 auto', marginTop: '1%' }}>
                <Button variant="outlined" onClick={handlePlaylist}>Get Playlist</Button>
            </div>

            <Paper elevation={4} sx={{ width: '90%', overflow: 'hidden', margin: '0 auto', padding: 3, marginTop: '20px' }}>
                <Typography align="center" variant="h5"> Playlist for songs played in {playlistRegion} when the weather was {playlistWeather}</Typography>
                <TableContainer sx={{ height: "40%" }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {playlistColumns.map((column) => (
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
                            {playlistResults
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
                    count={songInfoResults.length}
                    rowsPerPage={rowsPerInfoPage}
                    page={infoPage}
                    onPageChange={handleChangeInfoPage}
                    onRowsPerPageChange={handleChangeRowsPerInfoPage}
                />
            </Paper>
        </div>
    );
};

export default Playlist;