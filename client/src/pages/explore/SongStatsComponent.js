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
import TableRow from '@mui/material/TableRow';

import { getSongStatsForWeather } from '../../fetcher';
import { attribute, statsColumns, region, weather } from './options';

const attributeOptions = attribute.map((item) => <MenuItem value={item}>{item}</MenuItem>);
const weatherOptions = weather.map((item) => <MenuItem value={item}>{item}</MenuItem>);
const regionOptions = region.map((item) => <MenuItem value={item}>{item}</MenuItem>);

export default function SongStatsComponent(props) {
    const [attribute, setAttribute] = useState('');
    const [region, setRegion] = useState('united states');
    const [weather, setWeather] = useState('');

    const { isLoading, setIsLoading } = props;

    const [songInfoResults, setSongInfoResults] = useState([]);

    const attributeOnChange = (event) => {
        setAttribute(event.target.value);
    };

    // TODO: remove all option for regions for this
    const regionOnChange = (event) => {
        setRegion(event.target.value);
    };

    const weatherOnChange = (event) => {
        setWeather(event.target.value);
    };

    // useEffect runs on load + whenever attribute, region, weather are updated
    useEffect(() => {
        if (attribute !== '' && region !== '' && weather !== '') {
            setIsLoading(true);
            getSongStatsForWeather(attribute, region, weather).then(res => {
                console.log(res.results[0].min);
                setSongInfoResults(res.results);
                setIsLoading(false);
            });
        }

    }, [attribute, region, weather, setIsLoading]);

    return (
        <Container maxWidth="sm">
            {!isLoading && songInfoResults.length === 1 && songInfoResults[0].min === null ? 'no results ):' : ''}
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
            <Box>
                <TableContainer sx={{ height: "150px" }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {statsColumns.map((column) => (
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
            </Box>
        </Container>
    )
};