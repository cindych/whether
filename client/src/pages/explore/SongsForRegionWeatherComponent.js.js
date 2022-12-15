import React, { useState, useEffect } from 'react';

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
import Typography from '@mui/material/Typography';

import { basicColumns, region, weather } from './options';
import { getSongsForWeatherMultLocations, getSongsForWeather } from '../../fetcher';

const regionOptions = region.map((item) => <MenuItem value={item}>{item}</MenuItem>);
const weatherOptions = weather.map((item) => <MenuItem value={item}>{item}</MenuItem>);

export default function SongsForRegionWeatherComponent() {
    const [region, setRegion] = React.useState('all');
    const [weather, setWeather] = React.useState('');

    const [songInfoResults, setSongInfoResults] = useState([]);
    const [infoPage, setInfoPage] = React.useState(0);
    const [rowsPerInfoPage, setRowsPerInfoPage] = React.useState(5);

    const weatherOnChange = (event) => {
        setWeather(event.target.value);
    };

    const regionOnChange = (event) => {
        setRegion(event.target.value);
    };

    const handleChangeInfoPage = (e, newPage) => {
        setInfoPage(newPage);
    }

    const handleChangeRowsPerInfoPage = e => {
        setRowsPerInfoPage(+e.target.value);
        setInfoPage(0);
    }

    // useEffect runs on load + whenever weather, region are updated
    useEffect(() => {
        console.log(weather, region);
        // TODO: add loading options

        if (weather !== '' && region === 'all') {
            getSongsForWeatherMultLocations(weather).then(res => {
                setSongInfoResults(res.results);
            });
        } else if (weather !== '' && region !== 'all') {
            console.log('help');
            getSongsForWeather(weather, region).then(res => {
                setSongInfoResults(res.results);
            });
        }
    }, [region, weather]);

    return (
        <Container maxWidth="sm">
            SongsForRegionWeatherComponent
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
                    <InputLabel id="region-select-label">Region</InputLabel>
                    <Select
                        labelId="region-select-label"
                        id="region-select"
                        value={region}
                        label="Region"
                        onChange={regionOnChange}
                    >
                        {regionOptions}
                    </Select>
                </FormControl>
            </Box>
            <Paper elevation={4} sx={{ width: '90%', overflow: 'hidden', margin: '0 auto', padding: 3, marginTop: '20px' }}>
                {/* <Typography align="center" variant="h5"> Songs played in {songsForWeatherLocation ? songsForWeatherLocation : "all regions"} when the weather was {songsForWeatherWeather}</Typography> */}
                <TableContainer sx={{ height: "40%" }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {basicColumns.map((column) => (
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
        </Container>
    )
};