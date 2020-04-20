import React from "react";
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import UniversityCard from "../components/UniversityCard";
import Pagination from '@material-ui/lab/Pagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Search from '../components/Search';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';


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

class UniversitySearchList extends React.Component {
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
        // console.log(this.state.currentUniversities);
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/universities/search', {
            params: {
                nation: this.props.location.state.nation,
                major: this.props.location.state.major,
                query: this.props.location.state.query
            }
        })
            .then((res) => {
                const pagedUniversities = pagingUniversities(res.data, 1);
                const maxPage = parseInt(res.data.length / 8) + 1;
                this.setState({
                    universities: res.data,
                    currentUniversities: pagedUniversities,
                    maxPage: maxPage,
                    isLoading: false
                });
            })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.location.state !== this.props.location.state) {
            axios.get('http://127.0.0.1:8000/api/universities/search', {
                params: {
                    nation: this.props.location.state.nation,
                    major: this.props.location.state.major,
                    query: this.props.location.state.query
                }
            })
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
    }

    sortArray(arr, rule) {
        let result = [];
        if (rule === 'satisfaction') {
            result = arr.sort(function (b, a) { 
                return a.satisfaction < b.satisfaction ? -1 : a.satisfaction > b.satisfaction ? 1 : 0;  
            });
        }
        if (rule === 'went_number') {
            result = arr.sort(function (b, a) { 
                return a.went_number < b.went_number ? -1 : a.went_number > b.went_number ? 1 : 0;  
            });
        }
        return result;
    }

    handleChange(event) {
        let result = [];
        if (event.target.innerText === '만족도순') {
            result = this.sortArray(this.state.universities, 'satisfaction');
        }
        if (event.target.innerText === '다녀온 인원순') {
            result = this.sortArray(this.state.universities, 'went_number');
        }
        const pagedUniversities = pagingUniversities(result, 1);
        const maxPage = parseInt(result.length / 8) + 1;
        this.setState({
            universities: result,
            page: 1,
            currentUniversities: pagedUniversities,
            maxPage: maxPage,
            isLoading: false
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
                                <Typography variant="h4" style={{ padding: '1%' }}>
                                    <span style={{ color: '#673ab7' }}>{this.props.location.state.nation} </span>
                                    <span style={{ color: '#3f51b5' }}>{this.props.location.state.major} </span>
                                    <span style={{ color: '#1565c0' }}>{this.props.location.state.query} </span>
                                    검색 결과</Typography>
                                <Divider />
                                <Search />
                            </Paper>
                        </Grid>
                        <Grid container spacing={3} style={{ margin: 5, paddingLeft: 20 }}>
                            <Typography variant="body2" style={{ marginRight: 10 }} onClick={this.handleChange.bind(this)}>만족도순</Typography>
                            <Typography variant="body2" onClick={this.handleChange.bind(this)}>다녀온 인원순</Typography>
                        </Grid>
                        {this.state.currentUniversities.map(uni => {
                            // console.log(this.state.universities);
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

export default UniversitySearchList;