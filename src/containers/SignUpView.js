import React from 'react';
import SignupForm from '../components/Signup';
import Box from '@material-ui/core/Box';
import { Typography } from "@material-ui/core";


class SignUp extends React.Component {
    render() {
        return (
            <div>
                <Box component="div" m={3}>
                    <Typography variant="h2" component="h2">회원가입</Typography>
                </Box>

                <SignupForm history={this.props.history} />
            </div>
        );
    }
}

export default SignUp;