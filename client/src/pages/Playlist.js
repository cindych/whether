import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { getBasicPlaylist } from '../fetcher';
import { basicColumns, region, weather } from './explore/options';

const regionOptions = region.slice(1).map((item) => <MenuItem value={item}>{item}</MenuItem>);
const weatherOptions = weather.slice(0, 3).map((item) => <MenuItem value={item}>{item}</MenuItem>);

function Playlist() {
    const [playlistResults, setPlaylistResults] = useState([]);
    const [region, setRegion] = useState('united states')
    const [weather, setWeather] = useState('sunny')

    const [isLoading, setIsLoading] = useState(false);

    const regionOnChange = e => {
        setRegion(e.target.value);
    }

    const weatherOnChange = e => {
        setWeather(e.target.value);
    }

    useEffect(() => {
        if (region !== '' && weather !== '') {
            setIsLoading(true);
            getBasicPlaylist(region, weather).then(res => {
                setPlaylistResults(res.results);
                setIsLoading(false);
            });
        }
    }, [region, weather]);

    return (
        <Container maxWidth="md">
            <Typography align="center" variant="h2">playlist</Typography>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '40px'
            }}>
                <FormControl style={{ minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-label">region</InputLabel>
                    <Select
                        value={region}
                        label="region"
                        onChange={regionOnChange}
                    >
                        {regionOptions}
                    </Select>
                </FormControl>
                {isLoading ? 'loading' : ''}
                {!isLoading && playlistResults.length === 0 ? 'no results ):' : ''}
                <FormControl style={{ minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-label">weather</InputLabel>
                    <Select
                        value={weather}
                        label="weather"
                        onChange={weatherOnChange}
                    >
                        {weatherOptions}
                    </Select>
                </FormControl>
            </Box>
            <Box>
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
                            {playlistResults
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
            </Box>
        </Container>
    );
};

export default Playlist;