import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { basicColumns, region, weather } from './options';
import { getSongsForWeatherMultLocations, getSongsForWeather } from '../../fetcher';

const regionOptions = region.map((item) => <MenuItem value={item}>{item}</MenuItem>);
const weatherOptions = weather.map((item) => <MenuItem value={item}>{item}</MenuItem>);

export default function SongsForRegionWeatherComponent(props) {
    const [region, setRegion] = useState('all');
    const [weather, setWeather] = useState('');

    const { setIsLoading } = props;

    const [songInfoResults, setSongInfoResults] = useState([]);
    const [infoPage, setInfoPage] = useState(0);
    const [rowsPerInfoPage, setRowsPerInfoPage] = useState(5);

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
        setRowsPerInfoPage( + e.target.value);
        setInfoPage(0);
    }

    // useEffect runs on load + whenever weather, region are updated
    useEffect(() => {
        if (weather !== '' && region === 'all') {
            setIsLoading(true);
            getSongsForWeatherMultLocations(weather).then(res => {
                setSongInfoResults(res.results);
                setIsLoading(false);
            });
        } else if (weather !== '' && region !== 'all') {
            setIsLoading(true);
            getSongsForWeather(weather, region).then(res => {
                setSongInfoResults(res.results);
                setIsLoading(false);
            });
        }
    }, [region, weather, setIsLoading]);

    return (
        <Container maxWidth="sm">
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel id="weather-select-label">weather</InputLabel>
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
                    <InputLabel id="region-select-label">region</InputLabel>
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
            <Box>
                <TableContainer sx={{ height: "350px" }}>
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
            </Box>
        </Container>
    )
};