import React from "react";
import axios from 'axios';
import PostTable from '../components/PostTable';
import { Typography } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';


class CommunityList extends React.Component {
    state = {
        posts: []
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/posts')
            .then((res) => {
                // console.log(res.data);
                this.setState({
                    posts: res.data
                });
            })
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={10}>
                        <Box component="span" m={1}>
                            <Typography variant="h2" component="h2">커뮤니티</Typography>
                        </Box>
                    </Grid>
                    <Grid container xs={2} justify={'flex-end'} alignContent={'flex-end'}>
                        {localStorage.getItem("token") === null ?
                            <div></div>
                            :
                            <Button variant="contained" color="primary" href='/create' style={{ margin: '12%' }}>
                                새 글 쓰기
                            </Button>
                        }

                    </Grid>
                </Grid>

                <PostTable data={this.state.posts} />
            </div>
        );
    }
}

export default connect()(CommunityList);