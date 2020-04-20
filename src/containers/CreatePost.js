import React from "react";
import PostForm from '../components/PostForm';
import { Typography } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';


class CreatePost extends React.Component {
    render() {
        return (
            <div>
                <Box component="div" m={3}>
                    <Typography variant="h2" component="h2">새 글 쓰기</Typography>
                </Box>

                <PostForm requestType="post" history={this.props.history} token={this.props.token} />
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