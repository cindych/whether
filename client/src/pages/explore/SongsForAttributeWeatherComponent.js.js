import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


import {
    getAllSongs, getSongsAttrThresholdWeather
} from '../../fetcher';


// TODO: fill out all options and maybe export to data?
const weather = ['Rainy', 'Sunny'];
const attribute = ['Acousticness', 'Danceability'];
const regionOptions = ['all', 'africa'];

const weatherOptions = weather.map((item) => <MenuItem value={item}>{item}</MenuItem>)
const attributeOptions = attribute.map((item) => <MenuItem value={item}>{item}</MenuItem>)


// TODO: use allsongs query by default

export default function SongsForAttributeWeatherComponent() {
    const [weather, setWeather] = React.useState('');
    const [attribute, setAttribute] = React.useState('');
    const [aMin, setAMin] = React.useState(0);
    const [aMax, setAMax] = React.useState(100);


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

    const weatherOnChange = (event) => {
        setWeather(event.target.value);
    };

    const attributeOnChange = (event) => {
        setAttribute(event.target.value);
    };

    const handleChangeInfoPage = (e, newPage) => {
        setInfoPage(newPage);
    }

    const handleChangeRowsPerInfoPage = e => {
        setRowsPerInfoPage(+e.target.value);
        setInfoPage(0);
    }

    // useEffect runs on load + whenever the component state is updated
    useEffect(() => {
        console.log(weather, attribute, aMin, aMax);
        // TODO: only use getAllSongs if nothing selected
        if (weather == '' && attribute == '') {
            getAllSongs().then(res => {
                setSongInfoResults(res.results);
                // TODO: remove console.log
                // console.log(songInfoResults)
                // console.log(songInfoResults.length)
            });
        } else if (weather != '' && attribute != '') {
            console.log('help');
            getSongsAttrThresholdWeather(attribute, weather, aMin, aMax).then(res => {
                setSongInfoResults(res.results);
                console.log(songInfoResults);
            });
        }
    });

    return (
        <Container maxWidth="sm">
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel id="weather-select-label">Weather</InputLabel>
                    <Select
                        labelId="weather-select-label"
                        id="weather-select"
                        value={weather}
                        label="Weather"
                        onChange={weatherOnChange}
                    >
                        {weatherOptions}
                    </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel id="attribute-select-label">Attribute</InputLabel>
                    <Select
                        labelId="attribute-select-label"
                        id="attribute-select"
                        value={attribute}
                        label="Attribute"
                        onChange={attributeOnChange}
                    >
                        {attributeOptions}
                    </Select>
                </FormControl>
            </Box>
            <Paper>
                {/* <Typography align="center" variant="h5"> 🎶 All Songs 🎶</Typography> */}
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
        </Container>
    )
};