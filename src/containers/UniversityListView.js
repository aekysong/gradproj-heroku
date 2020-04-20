import React from "react";
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import UniversityCard from "../components/UniversityCard";
import Pagination from '@material-ui/lab/Pagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Search from '../components/Search';
import Paper from '@material-ui/core/Paper';


const pagingUniversities = (universities, page) => {
    const pagedUniversities = [];
    const maxPage = parseInt(universities.length / 8) + 1;
    if (page === maxPage) {
        const remainder = universities.length % 8;
        for (let index = (page-1) * 8; index < (page-1) * 8 + remainder; index++) {
            pagedUniversities.push(universities[index]);
        }
    } else {
        for (let index = (page-1) * 8; index < page * 8; index++) {
            pagedUniversities.push(universities[index]);
        }
    }
    return pagedUniversities;
}

class UniversityList extends React.Component {
    state = {
        universities: [],
        currentUniversities: [],
        page: 1,
        maxPage: 0,
        isLoading: true
    }

    nextPaging = (universities, page) => {
        const pagedUniversities = pagingUniversities(universities, page)
        this.setState({
            currentUniversities: pagedUniversities,
            page: page
        })
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/universities')
            .then((res) => {
                const pagedUniversities = pagingUniversities(res.data, 1);
                const maxPage = parseInt(res.data.length / 8) + 1;
                this.setState({
                    universities: res.data,
                    currentUniversities: pagedUniversities,
                    maxPage: maxPage,
                    isLoading: false
                });
                // console.log(this.state.universities);
            })
    }

    render() {
        if (this.state.isLoading === true) {
            return (
                <Box display="flex" justifyContent="center">
                    <CircularProgress />
                </Box>
            );
        } else {
            return (
                <div style={{ flexGrow: 1 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper style={{ padding: '1%', textAlign: 'center' }}>
                                <Search />
                            </Paper>
                        </Grid>
                        {this.state.currentUniversities.map(uni => {
                            return (
                                <Grid item xs={3}>
                                    <UniversityCard key={uni.id} data={uni} />
                                </Grid>
                            );
                        })}
                    </Grid>
                    <Box display="flex" justifyContent="center" m={10} >
                        <Pagination defaultPage={1}
                            count={this.state.maxPage}
                            page={this.state.page}
                            shape="rounded" size="large"
                            onChange={(event) => {
                                const moveTo = event.currentTarget.getAttribute('aria-label');
                                if (moveTo === 'Go to previous page') {
                                    this.nextPaging(this.state.universities, this.state.page - 1)
                                } else if (moveTo === 'Go to next page') {
                                    this.nextPaging(this.state.universities, this.state.page + 1)
                                } else if (moveTo.substring(0, 10) === 'Go to page') {
                                    this.nextPaging(this.state.universities, parseInt(moveTo.substring(11, moveTo.length)))
                                }
                            }} />
                    </Box>
                </div>
            );
        }

    }
}

export default UniversityList;