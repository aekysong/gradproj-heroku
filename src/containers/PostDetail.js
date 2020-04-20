import React from "react";
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { Typography } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Post from '../components/Post';
import Comments from '../components/CommentsList';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from "react-redux";


class PostDetail extends React.Component {
    state = {
        contents: [],
        comments: [],
        contentsIsLoading: true,
        commentsIsLoading: true,
        userId: '',
    }

    componentDidMount() {
        axios.get(`http://localhost:8000/api/posts/${this.props.match.params.postID}`)
            .then((res) => {
                this.setState({
                    contents: Object.entries(res.data),
                    contentsIsLoading: false,
                });
            })

        axios.get(`http://localhost:8000/api/posts/${this.props.match.params.postID}/comments`)
            .then((res) => {
                this.setState({
                    comments: Object.entries(res.data),
                    commentsIsLoading: false,
                });
            })

        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem('token')}`,
        };

        axios.get('http://127.0.0.1:8000/api/user')
            .then((res) => {
                this.setState({
                    userId: res.data.user,
                });
            })
    }

    handleDelete = event => {
        event.preventDefault();
        const postID = this.props.match.params.postID;
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${this.props.token}`
        };
        axios.delete(`http://127.0.0.1:8000/api/posts/${postID}/delete/`)
            .then(res => {
                if (res.status === 204) {
                    this.props.history.push('/posts');
                }
            })
    };

    render() {
        if (this.state.contentsIsLoading === true || this.state.commentsIsLoading === true) {
            return (
                <Box display="flex" justifyContent="center">
                    <CircularProgress />
                </Box>
            );
        } else {
            return (
                <div>
                    <Grid container spacing={3}>
                        <Grid item xs={9}>
                            <Box component="span" m={1}>
                                <Typography variant="h2" component="h2">커뮤니티</Typography>
                            </Box>
                        </Grid>
                        {this.state.userId === this.state.contents[5][1]['user'] ?
                            <Grid container xs={3} justify={'flex-end'} alignItems={'flex-end'} direction={'row'}>
                                <Button variant="contained" color="primary" href={`/posts/${this.props.match.params.postID}/update`} style={{ marginRight: '5%', marginBottom: '8%' }}>
                                    수정하기
                    </Button>
                                <Button variant="contained" color="secondary" onClick={this.handleDelete} style={{ marginBottom: '8%', marginRight: '8%' }}>
                                    삭제하기
                    </Button>
                            </Grid>
                            :
                            <div></div>
                        }

                    </Grid>

                    <Post data={this.state.contents} />

                    <Comments postID={this.props.match.params.postID} data={this.state.comments} />

                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        token: state.token
    };
};

export default connect(mapStateToProps)(PostDetail);