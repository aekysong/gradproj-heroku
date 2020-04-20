import React from 'react';
import Box from '@material-ui/core/Box';
import { Typography } from "@material-ui/core";

class Footer extends React.Component {
    render() {
        return(
            <Box component="div" m={2} p={3}>
                <Typography variant="subtitle2" align="center">
                    Copyright 2020. Aeky Song. All rights reserved.
                </Typography>
            </Box>
        );
    }
}

export default Footer;