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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { getSongsLocationDate } from '../../fetcher';
import { basicColumns, region } from './options';

const regionOptions = region.map((item) => <MenuItem value={item}>{item}</MenuItem>);

export default function SongsForDateRegionComponent(props) {
    const [region, setRegion] = useState('');
    const [date, setDate] = useState(null); 

    const { setIsLoading } = props;

    const [songInfoResults, setSongInfoResults] = useState([]);
    const [infoPage, setInfoPage] = useState(0);
    const [rowsPerInfoPage, setRowsPerInfoPage] = useState(5);

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
        if (date !== null && region !== '') {
            setIsLoading(true);
            getSongsLocationDate(region, date).then(res => {
                setIsLoading(false);
                setSongInfoResults(res.results);
            });
        }
    }, [date, region, setIsLoading]);

    return (
        <Container maxWidth="sm">
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
                        sx={{ minWidth: 120 }}
                        label="Date"
                        value={date}
                        onChange={dateOnChange}
                        formatDate={(value) => moment(value).format('YYY-MM-DD')}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
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