import React from "react";
import Paper from '@material-ui/core/Paper';
import { Typography } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

export default function Post(props) {
    return (
        <Paper>
            <Box component="div" m={1} p={3}>
                <Box component="div" m={1} pb={2}>
                    <Typography variant="h6" color="textSecondary">{props.data[4][1]}</Typography>
                    <Typography variant="h4" color="textPrimary">{props.data[1][1]}</Typography>
                    <Typography variant="subtitle1" display="inline" color="textSecondary">{props.data[5][1]['nickname']}  |  </Typography>
                    <Typography variant="subtitle1" display="inline" color="textSecondary">{props.data[3][1].slice(0,10)}</Typography>
                </Box>
                <Divider />
                <Box component="div" m={1} pt={2}>
                    <Typography>{props.data[2][1]}</Typography>
                </Box>
            </Box>
        </Paper>
    );
}