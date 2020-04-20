import React from 'react';
import LoginForm from '../components/Login';
import Box from '@material-ui/core/Box';
import { Typography } from "@material-ui/core";

class Login extends React.Component {
    render() {
        return(
            <div>
                <Box component="div" m={3}>
                    <Typography variant="h2" component="h2">로그인</Typography>
                </Box>

                <LoginForm history={this.props.history} />
            </div>
        );
    }
}

export default Login;