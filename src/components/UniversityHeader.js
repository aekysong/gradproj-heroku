import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Star from '@material-ui/icons/Star';
import StarBorderOutlined from '@material-ui/icons/StarBorderOutlined';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import axios from 'axios';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        width: '250px',
        height: '200px'
    },
}));

export default function UniversityHeader(props) {
    const [isSaved, setIsSaved] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem('token')}`,
        };

        axios.get('http://127.0.0.1:8000/api/favorites')
            .then((res) => {
                res.data.map((uni) => {
                    if (uni.university.name === props.data.name) {
                        setIsSaved(true);
                    }
                })
            })
    }, []);

    // satisfaction -> stars
    const stars = [];
    for (var i = 0; i < 5; i++) {
        if (i + 1 <= Math.round(props.data.satisfaction)) {
            stars.push(1);
        } else {
            stars.push(0);
        }
    }

    // keyword parsing
    const keywords = props.data.keyword.split("'");
    const parsedKeywords = []
    for (var k = 0; k < keywords.length; k++) {
        if (keywords[k] !== ', ' && keywords[k] !== '[' && keywords[k] !== ']' && keywords[k] !== '') {
            parsedKeywords.push(keywords[k]);
        }
    }

    // major parsing
    const majors = props.data.went_major.split("'");
    const parsedMajors = []
    for (var j = 0; j < majors.length; j++) {
        if (majors[j] !== ', ' && majors[j] !== '[' && majors[j] !== ']' && majors[j] !== '[]') {
            parsedMajors.push(majors[j]);
        }
    }

    const handleClick = (event) => {
        if (event.target.id === 'blank_heart') { // add to db
            setIsSaved(true);
            axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
            axios.defaults.xsrfCookieName = "csrftoken";
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem('token')}`,
            };

            axios.post('http://127.0.0.1:8000/api/favorites/create/', {univ_name: props.data.name})
                .then((res) => {
                    if (res.status === 201) {
                        alert('파견대학 즐겨찾기에 추가되었습니다.')
                    }
                })
        } else { // remove from db
            setIsSaved(false);
            axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
            axios.defaults.xsrfCookieName = "csrftoken";
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem('token')}`,
            };

            axios.delete('http://127.0.0.1:8000/api/favorites/delete/', { data: {
                univ_name: props.data.name
            }})
                .then((res) => {
                    if (res.status === 204) {
                        alert('파견대학 즐겨찾기에서 삭제되었습니다.')
                    }
                })
        }
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2} direction="row" justify="center" alignItems="center">
                    <Grid item xs={3}>
                        <img className={classes.img} alt={props.data.name} src={props.data.image_url} />
                    </Grid>
                    <Grid item xs={9}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item>
                                <div style={{ marginBottom: 10 }}>
                                    <Typography variant="h4" component="span" style={{ marginRight: 20 }}>
                                        {props.data.name}
                                    </Typography>
                                    {isSaved ?
                                        <Favorite id='full_heart' fontSize='large' color='secondary' onClick={handleClick} style={{ paddingTop: 7 }} />
                                        :
                                        <FavoriteBorder id='blank_heart' fontSize='large' color='secondary' onClick={handleClick} style={{ paddingTop: 7 }} />
                                    }
                                </div>
                                <Grid container spacing={1}>
                                    <Grid item xs={1} >
                                        <Typography variant="body1"><strong>국가</strong></Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        <Typography variant="body2" gutterBottom>
                                            {props.data.nation}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography variant="body1"><strong>키워드</strong></Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        {parsedKeywords.length > 0 ?
                                            <div>
                                                {parsedKeywords.map((keyword) => {
                                                    return <Typography variant="body2" component="span" style={{ marginRight: 5 }}>
                                                        #{keyword}
                                                    </Typography>;
                                                })}
                                            </div>
                                            :
                                            <Typography variant="body2" component="span" style={{ marginRight: 5 }}>없음</Typography>
                                        }
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography variant="body1"><strong>파견학과</strong></Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        {parsedMajors.length > 0 ?
                                            <div>
                                                {parsedMajors.map((major) => {
                                                    return <Typography variant="body2" component="span" style={{ marginRight: 5 }}>
                                                        {major}
                                                    </Typography>;
                                                })}
                                            </div>
                                            :
                                            <Typography variant="body2" component="span" style={{ marginRight: 5 }}>없음</Typography>
                                        }
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography variant="body1"><strong>웹사이트</strong></Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        <Typography variant="body2" color="textSecondary">
                                            <a href={props.data.website} target='_blank' rel="noopener noreferrer">
                                                {props.data.website}
                                            </a>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography variant="body1"><strong>만족도</strong></Typography>
                                    </Grid>
                                    <Grid item xs={11}>
                                        <Typography variant="body2" color="textSecondary">
                                            {stars.map((star) => {
                                                if (star === 1) {
                                                    return <Star color="primary" fontSize="small" />;
                                                } else {
                                                    return <StarBorderOutlined color="disabled" fontSize="small" />;
                                                }
                                            })}
                                    ({props.data.satisfaction})
                                </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}