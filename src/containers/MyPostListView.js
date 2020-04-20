import React from 'react';
import axios from 'axios';
import { Typography } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import PostTable from '../components/PostTable';


class MyPostListView extends React.Component {
    state = {
        posts: []
    }

    componentDidMount() {
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem('token')}`,
        };

        axios.get('http://127.0.0.1:8000/api/myposts')
            .then((res) => {
                // console.log(res.data);
                this.setState({
                    posts: res.data
                });
            })
    }

    render() {
        return (
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={10}>
                        <Box component="span" m={1}>
                            <Typography variant="h2" component="h2">내 게시글 보기</Typography>
                        </Box>
                    </Grid>
                </Grid>
                <PostTable data={this.state.posts} />
            </div>
        );
    }
}

export default MyPostListView;