import React, { useState } from 'react';

import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
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
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Link from '@mui/material/Link';
import InsightsIcon from '@mui/icons-material/Insights';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fade from '@mui/material/Fade';

import { getSongAvgWeatherStats, getSongInfo } from '../fetcher';

function IndivSong() {
    const [artist, setArtist] = useState('');
    const [title, setTitle] = useState('');

    const [songInfoResults, setSongInfoResults] = useState([]);
    const [showSongInfo, setShowSongInfo] = useState(false);
    const [infoPage, setInfoPage] = React.useState(0);
    const [rowsPerInfoPage, setRowsPerInfoPage] = React.useState(5);
    const infoColumns = [
        { id: 'artist', label: 'Artist' },
        { id: 'title', label: 'Title' },
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
        { id: 'key', label: 'Key' },
        { id: 'duration', label: 'Duration' },
        { id: 'id', label: 'Id' },
    ];

    const [songStatResults, setSongStatResults] = useState([]);
    const [statPage, setStatPage] = React.useState(0);
    const [rowsPerStatPage, setRowsPerStatPage] = React.useState(5);
    const [showSongStat, setShowSongStat] = useState(false); 
    const statColumns = [
        { id: 'artist', label: 'Artist' },
        { id: 'title', label: 'Title' },
        { id: 'avgTemp', label: 'Avg. Temperature (°F)' },
        { id: 'avgPrecipitation', label: 'Avg. Precipitation (in)' },
        { id: 'avgSnowfall', label: 'Avg. Snowfall (in)' }
    ];

    const handleChangeInfoPage = (e, newPage) => {
        setInfoPage(newPage);
    }

    const handleChangeRowsPerInfoPage = e => {
        setRowsPerInfoPage(+e.target.value);
        setInfoPage(0);
    }

    const handleChangeStatPage = (e, newPage) => {
        setStatPage(newPage);
    }

    const handleChangeRowsPerStatPage = e => {
        setRowsPerStatPage(+e.target.value);
        setStatPage(0);
    }

    return (
        <Container className="indiv-song-page" style={{ minWidth: '800px' }}>
            <Typography align="center" variant="h2">song info</Typography>
            <div style={{ width: '75%', margin: '0 auto', marginTop: '3%', display: 'flex' }}>
                <div style={{ margin: '0 auto' }}>
                    <TextField fullWidth margin="dense" sx={{ marginRight: '5px' }} variant="outlined" value={artist} label={"Artist"} onChange={e => setArtist(e.target.value)} />
                    <TextField fullWidth margin="dense" value={title} label={"Title"} onChange={e => setTitle(e.target.value)} /> 
                </div>
                <div style={{ display: 'flex', alignItems: 'center', margin: '5%' }}>
                    <Button sx={{
                            marginRight: '5px',
                            background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 35%, rgba(124,124,124,1) 100%)',
                            border: 0,
                            borderRadius: 2,
                            boxShadow: '0 3px 5px 2px rgba(2, 0, 36, .15)',
                            color: 'white',
                            height: 48,
                            padding: '0 25px',
                        }}
                        onClick={() => {
                            getSongInfo(artist, title).then(res => setSongInfoResults(res.results));
                            setShowSongStat(false);
                            setShowSongInfo(true);
                        }}
                        endIcon={<InsightsIcon />}
                    >
                        Get Song Info
                    </Button>
                    <Button sx={{
                            background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 19%, rgba(124,124,124,1) 100%)',
                            border: 0,
                            borderRadius: 2,
                            boxShadow: '0 3px 5px 2px rgba(2, 0, 36, .15)',
                            color: 'white',
                            height: 48,
                            padding: '0 25px',
                        }}
                        onClick={() => {
                                getSongAvgWeatherStats(artist, title).then(res => setSongStatResults(res.results));
                                setShowSongInfo(false);
                                setShowSongStat(true);
                            }
                        }
                        endIcon={<ThunderstormIcon />}
                    >
                        Get avg. Weather Stats
                    </Button>
                </div>
            </div>
            <div className="data-results">
                { showSongInfo && songInfoResults.length > 0 &&
                    <Fade in={showSongInfo}>
                        <div className="song-info-container" style={{ display: 'flex', alignItems: 'flex-start' }}>
                            <Paper elevation={4} sx={{ maxWidth: '65%', margin: '0 auto', padding: 3, marginTop: '2%' }}>
                                <Typography align="center" variant="h5">Track Information</Typography>
                                <TableContainer>
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
                                                    <TableCell>
                                                        <Link href={`https://open.spotify.com/track/${row.id}`} color="inherit" target="_blank">{row.title}</Link>
                                                    </TableCell>
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
                                                    <TableCell>{row.id}</TableCell>
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

                            <div className="track-info" style={{ maxWidth: '25%', margin: '0 auto', marginTop: '1.5%' }}>
                                <Typography variant="button">Track audio features</Typography>
                                <div className="track-info-accordian">
                                    <Accordion>
                                        <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="acousticness-content"
                                        id="acousticness-header"
                                        >
                                        <Typography variant="overline">acousticness</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                        <Typography variant="caption">
                                            A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.
                                        </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion>
                                        <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="danceability-content"
                                        id="danceability-header"
                                        >
                                        <Typography variant="overline">danceability</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                        <Typography variant="caption">
                                            Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable
                                        </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion>
                                        <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="energy-content"
                                        id="energy-header"
                                        >
                                        <Typography variant="overline">energy</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                        <Typography variant="caption">
                                            Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.
                                        </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion>
                                        <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="speechiness-content"
                                        id="speechiness-header"
                                        >
                                        <Typography variant="overline">speechiness</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                        <Typography variant="caption">
                                            Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.                       
                                        </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion>
                                        <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="liveness-content"
                                        id="liveness-header"
                                        >
                                        <Typography variant="overline">liveness</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                        <Typography variant="caption">
                                            Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.
                                        </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion>
                                        <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="loudness-content"
                                        id="loudness-header"
                                        >
                                        <Typography variant="overline">loudness</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                        <Typography variant="caption">
                                            The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typically range between -60 and 0 db.
                                        </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion>
                                        <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="loudness-content"
                                        id="loudness-header"
                                        >
                                        <Typography variant="overline">mode</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                        <Typography variant="caption">
                                            Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived. Major is represented by 1 and minor is 0.
                                        </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion>
                                        <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="tempo-content"
                                        id="tempo-header"
                                        >
                                        <Typography variant="overline">tempo</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                        <Typography variant="caption">
                                            The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.
                                        </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion>
                                        <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="valence-content"
                                        id="valence-header"
                                        >
                                        <Typography variant="overline">valence</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                        <Typography variant="caption">
                                            A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).
                                        </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion>
                                        <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="key-content"
                                        id="key-header"
                                        >
                                        <Typography variant="overline">key</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                        <Typography variant="caption">
                                            The key the track is in. Integers map to pitches using standard Pitch Class notation. E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on. If no key was detected, the value is -1.
                                        </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion>
                                        <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="duration-content"
                                        id="duration-header"
                                        >
                                        <Typography variant="overline">duration</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                        <Typography variant="caption">
                                            The duration of the track in milliseconds.
                                        </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion>
                                        <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="id-content"
                                        id="id-header"
                                        >
                                        <Typography variant="overline">id</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                        <Typography variant="caption">
                                            The Spotify ID for the track.
                                        </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            </div>
                        </div>
                    </Fade>
                }
           
                { songStatResults.length > 0 &&
                    <Fade in={showSongStat}>
                        <Paper className="song-stat-container" elevation={4} sx={{ width: '90%', overflow: 'hidden', margin: '0 auto', padding: 3, marginTop: '2%' }}>
                            <Typography align="center" variant="h5">Weather Statistics</Typography>
                            <TableContainer sx={{ height: "40%" }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                        {statColumns.map((column) => (
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
                                        {songStatResults
                                        .slice(statPage * rowsPerStatPage, statPage * rowsPerStatPage + rowsPerStatPage)
                                        .map((row) => {
                                            return (
                                            <TableRow key={row.id}>
                                                <TableCell>{row.artist}</TableCell>
                                                <TableCell>{row.title}</TableCell>
                                                <TableCell>{row.avgTemp}</TableCell>
                                                <TableCell>{row.avgPrecipitation}</TableCell>
                                                <TableCell>{row.avgSnowfall}</TableCell>
                                            </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={songStatResults.length}
                                rowsPerPage={rowsPerStatPage}
                                page={statPage}
                                onPageChange={handleChangeStatPage}
                                onRowsPerPageChange={handleChangeRowsPerStatPage}
                            />
                        </Paper>
                    </Fade>
                }
            </div>
        </Container>
    );
};

export default IndivSong;