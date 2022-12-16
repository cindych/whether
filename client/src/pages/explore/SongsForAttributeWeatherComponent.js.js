import React, { useEffect, useState } from 'react';

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
import Slider from '@mui/material/Slider';
import { styled } from "@mui/material/styles";

import {
    getAllSongs, getSongsAttrThresholdWeather
} from '../../fetcher';
import { attribute, attributeColumns, weather } from './options';

const attributeOptions = attribute.map((item) => <MenuItem value={item}>{item}</MenuItem>);
const weatherOptions = weather.map((item) => <MenuItem value={item}>{item}</MenuItem>);

export default function SongsForAttributeWeatherComponent(props) {
    const [attribute, setAttribute] = useState('');
    const [weather, setWeather] = useState('');
    const [range, setRange] = useState([0, 5]);

    const { setIsLoading } = props;

    const [songInfoResults, setSongInfoResults] = useState([]);
    const [infoPage, setInfoPage] = useState(0);
    const [rowsPerInfoPage, setRowsPerInfoPage] = useState(5);

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
        if (attribute === '' && weather === '') {
            setIsLoading(true);
            getAllSongs().then(res => {
                setSongInfoResults(res.results);
                setIsLoading(false);
            });
        } else if (attribute !== '' && weather !== '') {
            setIsLoading(true);
            getSongsAttrThresholdWeather(attribute, weather, range[0], range[1]).then(res => {
                setSongInfoResults(res.results);
                setIsLoading(false);
            });
        }
    }, [attribute, range, weather, setIsLoading]);

    const CustomSlider = styled(Slider)(({ theme }) => ({
        color: 'black', 
        height: '2px',
        width: '80%',
        marginLeft: '20px!important',
        "& .MuiSlider-thumb": {
            backgroundColor: 'black',
            height: '18px',
            width: '18px'
        },
        "& .MuiSlider-rail": {
            color: 'grey',
            height: '2px'
        }
    }));

    return (
        <Container maxWidth="sm">
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
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
                    <InputLabel id="attribute-select-label">attribute</InputLabel>
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
                    <CustomSlider
                        getAriaLabel={() => 'Attribute Range'}
                        value={range}
                        onChange={handleSliderChange}
                        step={.1}
                        valueLabelDisplay="auto"
                        min={0}
                        max={5}
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