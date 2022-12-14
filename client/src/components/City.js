import * as React from 'react';

import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

function City({ name }) {
    return (
        <Card sx={{ width: '30%', minWidth: 300, margin: '1%' }}>
            <CardMedia
                component="img"
                height="150"
                image="https://images.unsplash.com/photo-1520531158340-44015069e78e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1272&q=80"
                alt="black and white city background"
            />
            <CardContent>
                <Typography variant="overline">{name}</Typography>
            </CardContent>
        </Card>
    )
}

export default City;