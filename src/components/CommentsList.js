import React, { useState, useEffect } from 'react';
import { Paper } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { Typography } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import NewComment from './NewComment';
import axios from 'axios';


export default function Comments(props) {
    const [user, setUser] = useState('');

    useEffect(() => {
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem('token')}`,
        };

        axios.get('http://127.0.0.1:8000/api/user')
            .then(({ data }) => {
                setUser(data.user);
            });
    }, []);

    const handleDelete = (event, commentID) => {
        event.preventDefault();
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem('token')}`
        };
        axios.delete(`http://127.0.0.1:8000/api/comments/${commentID}/delete/`)
            .then(res => {
                if (res.status === 204) {
                    window.location.reload();
                }
            })
    };

    return (
        <Paper>
            <Box component="div" m={1} p={3}>
                <Typography variant="h5" component="h2" style={{ margin: 10 }}>댓글</Typography>
                {props.data.map(data => (
                    <Paper variant="outlined" style={{ padding: 20, margin: 10 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={1} style={{ marginRight: 17 }}>
                                <Grid container alignItems={"center"} direction={'column'}>
                                    <Avatar />
                                    <Typography variant="body1">{data[1]['author']['nickname']}</Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={10}>
                                <Typography>{data[1]['content']}</Typography>
                            </Grid>
                            <Grid container justify={'flex-end'} alignItems={'flex-start'} direction={'row'}>
                                {data[1]['author']['user'] === user ?
                                    <Typography variant="caption" style={{ marginRight: 5 }} onClick={(event) => handleDelete(event, data[1]['id'])}>삭제하기</Typography>
                                    :
                                    <div></div>
                                }
                                <Typography variant="caption">{data[1]['created_date'].slice(0, 10)}</Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                ))}
            </Box>
            <Box component="div" m={1} p={3}>
                <NewComment postID={props.postID} />
            </Box>
        </Paper>
    );
}