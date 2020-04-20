import React from "react";
import axios from "axios";
import UnivDetailTab from '../components/UniversityTab';
import UniversityHeader from '../components/UniversityHeader';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';


class UniversityDetail extends React.Component {
    state = {
        university: [],
        reports: [],
        univIsLoading: true,
        reportIsLoading: true
    }

    async componentDidMount() {
        const universityID = this.props.match.params.universityID;

        await axios.get(`http://127.0.0.1:8000/api/universities/${universityID}`)
            .then((res) => {
                this.setState({
                    university: res.data,
                    univIsLoading: false
                });
            })

        await axios.get(`http://127.0.0.1:8000/api/universities/${universityID}/reports`)
            .then((res) => {
                this.setState({
                    reports: res.data,
                    reportIsLoading: false
                });
            })
    }

    render() {
        if (this.state.univIsLoading === true || this.state.reportIsLoading === true) {
            return (
                <Box display="flex" justifyContent="center">
                    <CircularProgress />
                </Box>
            );
        } else {
            return (
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <UniversityHeader data={this.state.university} />
                    </Grid>
                    <Grid item xs={12}>
                        <UnivDetailTab reports={this.state.reports} univ={this.state.university} />
                    </Grid>
                </Grid>
            );
        }
    }
}

export default UniversityDetail;