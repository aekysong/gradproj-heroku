import React from "react";
import axios from 'axios';
import NoticeTable from '../components/NoticeTable';
import { Typography } from "@material-ui/core";
import Box from '@material-ui/core/Box';

class NoticeList extends React.Component {
    state = {
        notices: []
    }

    componentDidMount() {
        axios.get('https://skku-exchange.herokuapp.com/api/notices')
            .then((res) => {
                this.setState({
                    notices: res.data
                });
            })
    }

    render() {
        return (
            <div>
                <Box component="span" m={1}>
                    <Typography variant="h2" component="h2">국제처 공지사항</Typography>
                </Box>
                <NoticeTable data={this.state.notices} />
            </div>
        );
    }
}

export default NoticeList;