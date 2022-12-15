import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import {
    getAllSongs, getSongsAttrThresholdWeather
} from '../../fetcher';
import { attribute, attributeColumns, weather } from './options';

const attributeOptions = attribute.map((item) => <MenuItem value={item}>{item}</MenuItem>);
const weatherOptions = weather.map((item) => <MenuItem value={item}>{item}</MenuItem>);

export default function SongsForAttributeWeatherComponent() {
    const [attribute, setAttribute] = React.useState('');
    const [weather, setWeather] = React.useState('');
    const [range, setRange] = React.useState([0, 1]);

    const [songInfoResults, setSongInfoResults] = useState([]);
    const [infoPage, setInfoPage] = React.useState(0);
    const [rowsPerInfoPage, setRowsPerInfoPage] = React.useState(5);

    const attributeOnChange = (event) => {
        setAttribute(event.target.value);
    };

    const weatherOnChange = (event) => {
        setWeather(event.target.value);
    };

    const handleSliderChange = (event, newValue) => {
        setRange(newValue);
    };

    const handleChangeInfoPage = (e, newPage) => {
        setInfoPage(newPage);
    }

    const handleChangeRowsPerInfoPage = e => {
        setRowsPerInfoPage(+e.target.value);
        setInfoPage(0);
    }

    // useEffect runs on load + whenever weather, attribute, range are updated
    useEffect(() => {
        console.log(weather, attribute, range);
        // TODO: add loading options

        if (attribute === '' && weather === '') {
            getAllSongs().then(res => {
                setSongInfoResults(res.results);
            });
        } else if (attribute !== '' && weather !== '') {
            console.log('help');
            getSongsAttrThresholdWeather(attribute, weather, range[0], range[1]).then(res => {
                setSongInfoResults(res.results);
            });
        }
    }, [attribute, range, weather]);

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
                {/* TODO adjust slider functionality */}
                <Box sx={{ minWidth: 200 }}>
                    <Slider
                        getAriaLabel={() => 'Attribute Range'}
                        value={range}
                        onChange={handleSliderChange}
                        step={.1}
                        valueLabelDisplay="auto"
                        min={0}
                        max={1}
                    />
                </Box>
            </Box>
            <Box>
                <TableContainer sx={{ height: '500px' }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {attributeColumns.map((column) => (
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
            </Box>
        </Container>
    )
};