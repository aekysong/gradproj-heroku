import React from "react";
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import UniversityCard from "./UniversityCard";
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';


class RecommendUniv extends React.Component {
    state = {
        universities: [],
        isLoading: true,
    }

    checkArray(arr) {
        let result = []
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].satisfaction !== 0) {
                result.push(arr[i]);
            }
        }
        return result;
    }

    getRandom(arr, n) {
        var result = new Array(n),
            len = arr.length,
            taken = new Array(len);
        if (n > len)
            throw new RangeError("getRandom: more elements taken than available");
        while (n--) {
            var x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/universities')
            .then((res) => {
                this.setState({
                    universities: this.getRandom(this.checkArray(res.data), 4),
                    isLoading: false
                });
            })
    }

    componentWillReceiveProps(newProps) {
        axios.get('http://127.0.0.1:8000/api/universities/search', {
            params: {
                nation: newProps.data.interest_nation,
            }
        })
            .then((res) => {
                this.setState({
                    universities: this.getRandom(this.checkArray(res.data), 4),
                    isLoading: false
                });
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
                    <Typography variant="h5" style={{ margin: '1%' }}>추천 파견 가능 대학</Typography>
                    <Grid container spacing={3}>
                        {this.state.universities.map(uni => {
                            return (
                                <Grid item xs={3}>
                                    <UniversityCard key={uni.id} data={uni} />
                                </Grid>
                            );
                        })}
                    </Grid>
                </div>
            );
        }

    }
}

export default RecommendUniv;