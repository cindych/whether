import * as React from 'react';
import './styles/NavBar.css';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import Link from '@mui/material/Link';

function NavBar() {
  return (
    <AppBar className="navigiation-bar" position="static" sx={{ boxShadow: 'none', backgroundColor: 'white' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className="left-side">
                <IconButton
                    size="large"
                    edge="start"
                    color="black"
                    sx={{ marginRight: 1 }}
                >
                    <AudiotrackIcon fontSize="large" />
                </IconButton>
                <Typography variant="overline" color="black">app name</Typography>
            </div>
            <div className="right-side" style={{ display: 'flex', justifyContent: 'space-between', width: '30%', minWidth: '250px', marginRight: '2%' }}>
                <Typography variant="caption" color="black"><Link variant="inherit" color="inherit" href="/" underline="none">playlist</Link></Typography>
                <Typography variant="caption" color="black"><Link variant="inherit" color="inherit" href="/song" underline="none">song info</Link></Typography>
                <Typography variant="caption" color="black"><Link variant="inherit" color="inherit" href="/explore" underline="none">explore</Link></Typography>
                <Typography variant="caption" color="black"><Link variant="inherit" color="inherit" href="/city" underline="none">cities</Link></Typography>
            </div>
        </Toolbar>
    </AppBar>
  );
}

export default NavBar;