import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { getSongsLocationDate } from '../../fetcher';
import { basicColumns, region } from './options';

const regionOptions = region.map((item) => <MenuItem value={item}>{item}</MenuItem>);

export default function SongsForDateRegionComponent() {
    const [region, setRegion] = useState('');
    const [date, setDate] = useState(null); // TODO: better default value lol

    const [songInfoResults, setSongInfoResults] = useState([]);
    const [infoPage, setInfoPage] = React.useState(0);
    const [rowsPerInfoPage, setRowsPerInfoPage] = React.useState(5);

    const regionOnChange = (event) => {
        setRegion(event.target.value);
    };

    const dateOnChange = (value) => {
        console.log(moment(value).format('YYYYMMDD'));
        setDate(value);
    }

    const handleChangeInfoPage = (e, newPage) => {
        setInfoPage(newPage);
    }

    const handleChangeRowsPerInfoPage = e => {
        setRowsPerInfoPage(+e.target.value);
        setInfoPage(0);
    }

    useEffect(() => {
        console.log(region);
        // TODO: add loading options

        if (date !== '' && region !== '') {
            getSongsLocationDate(region, date).then(res => {
                console.log(res.results);
                setSongInfoResults(res.results);
            });
        }
    }, [date, region]);

    return (
        <Container maxWidth="sm">
            SongsForDateRegionComponent
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
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
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Date"
                        value={date}
                        onChange={dateOnChange}
                        formatDate={(value) => moment(value).format('YYY-MM-DD')}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </Box>
            <Paper elevation={4} sx={{ width: '90%', overflow: 'hidden', margin: '0 auto', padding: 3, marginTop: '20px' }}>
                {/* <Typography align="center" variant="h5"> Songs played in {region ? region : "all regions"} when the date was {date}</Typography> */}
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