import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        padding: theme.spacing(0, 3),
    },
    paper: {
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
    },
}));

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function UnivDetailTab(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // console.log(props.reports);

    return (
        <Paper className={classes.root}>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label="대학 정보" {...a11yProps(0)} />
                <Tab label="수업" {...a11yProps(1)} />
                <Tab label="문화생활" {...a11yProps(2)} />
                <Tab label="비자" {...a11yProps(3)} />
                <Tab label="기숙사" {...a11yProps(4)} />
                <Tab label="소감/총평" {...a11yProps(5)} />
            </Tabs>

            <TabPanel value={value} index={0}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Typography variant="body1"><strong>선발인원</strong></Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography>
                            {props.univ.available_number}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="body1"><strong>어학 자격 기준</strong></Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography>
                            {props.univ.language_condition}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="body1"><strong>1년 파견 가능 여부</strong></Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography>
                            {props.univ.one_year_available}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="body1"><strong>수강 제한 영역 여부</strong></Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography>
                            {props.univ.course_restriction}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="body1"><strong>전공 이외 수업 수강 가능 여부</strong></Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography>
                            {props.univ.not_major_course}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="body1"><strong>현재까지 파견된 인원</strong></Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography>
                            {props.univ.went_number}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="body1"><strong>기타 사항</strong></Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography>
                            {props.univ.remarks}
                        </Typography>
                    </Grid>
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
                {props.reports.map(rep => (
                    <Paper variant="outlined" className={classes.paper}>
                        <Grid container wrap="nowrap" spacing={2} direction="row" justify="center" alignItems="center">
                            <Grid item xs={2}>
                                <Grid container direction="column" justify="center" alignItems="center">
                                    <Avatar style={{ marginBottom: 15 }} />
                                    <Typography variant="body2">{rep.major}</Typography>
                                    <Typography variant="body2">({rep.ex_period.substring(0, 4)} 파견)</Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={10}>
                                <Grid container spacing={1}>
                                    <Grid item xs={2}>
                                        <Typography variant="body1"><strong>수업 진행 방식</strong></Typography>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Typography>{rep.lecture_comment}</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography variant="body1"><strong>평가 방식</strong></Typography>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Typography>{rep.lecture_grading}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                ))}
            </TabPanel>
            <TabPanel value={value} index={2}>
                {props.reports.map(rep => (
                    <Paper variant="outlined" className={classes.paper}>
                        <Grid container wrap="nowrap" spacing={2} direction="row" justify="center" alignItems="center">
                            <Grid item xs={2}>
                                <Grid container direction="column" justify="center" alignItems="center">
                                    <Avatar style={{ marginBottom: 15 }} />
                                    <Typography variant="body2">{rep.major}</Typography>
                                    <Typography variant="body2">({rep.ex_period.substring(0, 4)} 파견)</Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={10}>
                                <Typography>{rep.culture_activity}</Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                ))}
            </TabPanel>
            <TabPanel value={value} index={3}>
                {props.reports.map(rep => (
                    <Paper variant="outlined" className={classes.paper}>
                        <Grid container wrap="nowrap" spacing={2} direction="row" justify="center" alignItems="center">
                            <Grid item xs={2}>
                                <Grid container direction="column" justify="center" alignItems="center">
                                    <Avatar style={{ marginBottom: 15 }} />
                                    <Typography variant="body2">{rep.major}</Typography>
                                    <Typography variant="body2">({rep.ex_period.substring(0, 4)} 파견)</Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={10}>
                                <Grid container spacing={1}>
                                    <Grid item xs={2}>
                                        <Typography variant="body1"><strong>비자 종류</strong></Typography>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Typography>{rep.visa_type}</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography variant="body1"><strong>발급 소요 기간</strong></Typography>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Typography>{rep.visa_period}</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography variant="body1"><strong>비자 신청 절차</strong></Typography>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Typography>{rep.visa_process}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                ))}
            </TabPanel>
            <TabPanel value={value} index={4}>
                {props.reports.map(rep => (
                    <Paper variant="outlined" className={classes.paper}>
                        <Grid container wrap="nowrap" spacing={2} direction="row" justify="center" alignItems="center">
                            <Grid item xs={2}>
                                <Grid container direction="column" justify="center" alignItems="center">
                                    <Avatar style={{ marginBottom: 15 }} />
                                    <Typography variant="body2">{rep.major}</Typography>
                                    <Typography variant="body2">({rep.ex_period.substring(0, 4)} 파견)</Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={10}>
                                <Grid container spacing={1}>
                                    <Grid item xs={2}>
                                        <Typography variant="body1"><strong>기숙사/숙소 이름</strong></Typography>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Typography>{rep.dorm_name}</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography variant="body1"><strong>기숙사/숙소 위치</strong></Typography>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Typography>{rep.dorm_location}</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography variant="body1"><strong>비용</strong></Typography>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Typography>{rep.dorm_cost}</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography variant="body1"><strong>유의사항</strong></Typography>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Typography>{rep.dorm_comment}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                ))}
            </TabPanel>
            <TabPanel value={value} index={5}>
                {props.reports.map(rep => {
                    if (rep.final_comment !== '') {
                        return (
                            <Paper variant="outlined" className={classes.paper}>
                                <Grid container wrap="nowrap" spacing={2} direction="row" justify="center" alignItems="center">
                                    <Grid item xs={2}>
                                        <Grid container direction="column" justify="center" alignItems="center">
                                            <Avatar style={{ marginBottom: 15 }} />
                                            <Typography variant="body2">{rep.major}</Typography>
                                            <Typography variant="body2">({rep.ex_period.substring(0, 4)} 파견)</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Typography>{rep.final_comment}</Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        );
                    }
                    return <div></div>;
                })}
            </TabPanel>
        </Paper>
    );
}