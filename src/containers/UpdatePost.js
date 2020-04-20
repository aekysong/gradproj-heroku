import React from "react";
import PostForm from '../components/PostForm';
import { Typography } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import axios from 'axios';
import { connect } from 'react-redux';


class CreatePost extends React.Component {
    state = {
        no: 0,
        title: '',
        author: '',
        created_date: '',
        nation: '',
        content: '',
    }

    componentDidMount() {
        axios.get(`http://localhost:8000/api/posts/${this.props.match.params.postID}`)
            .then((res) => {
                this.setState({
                    no: res.data.id,
                    title: res.data.title,
                    author: res.data.author.nickname,
                    created_date: res.data.created_date.slice(0, 10),
                    nation: res.data.tag,
                    content: res.data.content,
                });
            })
    }

    render() {
        return (
            <div>
                <Box component="div" m={3}>
                    <Typography variant="h2" component="h2">게시글 수정하기</Typography>
                </Box>

                <PostForm requestType="put" history={this.props.history} postID={this.props.match.params.postID} data={this.state} token={this.props.token} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      token: state.token
    }
}

export default connect(mapStateToProps)(CreatePost);


