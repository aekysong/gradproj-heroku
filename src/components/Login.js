import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { Typography } from "@material-ui/core";
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(1),
    },
    label: {
        textAlign: 'right',
    },
    text: {
        width: 400,
        textAlign: 'left',
    },
    button: {
        margin: theme.spacing(1.6),
    },
}));

function LoginForm(props) {
    const classes = useStyles();

    const handleSubmit = event => {
        event.preventDefault();
        props.onAuth(document.getElementById('ID').value, document.getElementById('password').value);
        // props.history.push('/');
    };

    return (
        <Paper>
            {props.loading ?
                <Box display="flex" justifyContent="center" m={1} p={3}>
                    <CircularProgress />
                </Box>
                :
                <Box component="div" m={1} p={3}>
                    <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
                        <Grid container spacing={3} direction="row" justify="center" alignItems="center">
                            <Grid item xs={4}>
                                <Typography className={classes.label}>아이디</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    className={classes.text}
                                    id="ID"
                                    label="아이디"
                                    variant="outlined"
                                    required />
                            </Grid>

                            <Grid item xs={4}>
                                <Typography className={classes.label}>비밀번호</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    className={classes.text}
                                    id="password"
                                    label="비밀번호"
                                    type="password"
                                    autoComplete="current-password"
                                    variant="outlined"
                                    required
                                />
                            </Grid>

                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    className={classes.button}
                                    type="submit"
                                >
                                    로그인
                            </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            }

        </Paper>
    );
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);