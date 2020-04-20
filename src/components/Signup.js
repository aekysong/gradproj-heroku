import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { Typography } from "@material-ui/core";
import * as actions from '../store/actions/auth';
import { connect } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';


const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(1),
    },
    label: {
        textAlign: 'right',
    },
    select: {
        width: 200,
        textAlign: 'left',
    },
    text: {
        width: 300,
        textAlign: 'left',
    },
    button: {
        margin: theme.spacing(1.6),
    },
}));

const major_list = [
    '유학동양학과',
    '국어국문학과', '영어영문학과', '프랑스어문학과', '중어중문학과', '독어독문학과', '러시아어문학과', '한문학과', '사학과', '철학과', '문헌정보학과',
    '행정학과', '정치외교학과', '미디어커뮤니케이션학과', '신문방송학과', '사회학과', '사회복지학과', '심리학과', '소비자학과', '아동청소년학과', '글로벌리더학부',
    '경제학과', '통계학과', '글로벌경제학과',
    '경영학과', '글로벌경영학과',
    '교육학과', '한문교육과', '수학교육과', '컴퓨터교육과',
    '미술학과', '디자인학과', '무용학과', '영상학과', '연기예술학과', '의상학과',
    '생명과학과', '수학과', '화학과', '물리학과',
    '전자전기공학부', '반도체시스템공학과',
    '소프트웨어학과', '컴퓨터공학과',
    '화학공학/고분자공학부', '신소재공학부', '기계공학부', '건설환경공학부', '시스템경영공학과', '건축학과', '나노공학과',
    '약학과',
    '식품생명공학과', '바이오메카트로닉스학과', '융합생명공학과',
    '스포츠과학과',
    '의학과',
    '글로벌바이오메디컬공학과', '글로벌융합학부', '데이터사이언스융합전공', '인공지능융합전공', '컬처앤테크놀로지융합전공', '자기설계융합전공'
];

const nation_list = [
    '네덜란드', '노르웨이', '뉴질랜드', '대만', '덴마크', '독일', '러시아', '리투아니아',
    '말레이시아', '멕시코', '미국', '벨기에', '브라질', '브루나이', '스웨덴', '스위스', '스페인',
    '싱가포르', '아랍에미레이트', '아이슬란드', '아일랜드', '영국', '오스트리아', '우루과이', '이탈리아',
    '인도네시아', '일본', '중국', '체코', '칠레', '캐나다', '콜롬비아', '크로아티아', '태국', '터키', '폴란드',
    '프랑스', '핀란드', '호주'
];

const department_list = [
    '유학대학', '문과대학', '사회과학대학', '경제대학', '경영대학', '사범대학', '예술대학', '자연과학대학', '정보통신대학',
    '소프트웨어대학', '공과대학', '약학대학', '생명공학대학', '스포츠과학대학', '의과대학', '성균융합원'
];

const passwordValid = (password1, password2) => {
    if (password1 !== password2) {
        return false;
    }
    return true;
}

const emptySpace = (department, major, nation) => {
    if (department === '') {
        return "단과대학을 입력해주세요!";
    }
    else if (major === '') {
        return "소속학과를 입력해주세요!";
    }
    else if (nation === '') {
        return "관심 국가를 입력해주세요!";
    } else {
        return true;
    }
}

function idValid(ID) {
    return axios.get('http://127.0.0.1:8000/api/validation/', {
        params: { username: ID }
    }).then(res => {
        return res.status;
    }).catch(err => {
        return err.response.status;
    })
}

function SignupForm(props) {
    const classes = useStyles();
    const [nation, setNation] = React.useState('');
    const [major, setMajor] = React.useState('');
    const [department, setDepartment] = React.useState('');

    const handleDeptChange = event => {
        setDepartment(event.target.value);
    };

    const handleNationChange = event => {
        setNation(event.target.value);
    };

    const handleMajorChange = event => {
        setMajor(event.target.value);
    };

    const handleSubmit = (event, department, major, nation) => {
        event.preventDefault();

        const username = document.getElementById('ID').value;
        const password1 = document.getElementById('password1').value;
        const password2 = document.getElementById('password2').value;
        const nickname = document.getElementById('nickname').value;
        const student_id = document.getElementById('student_id').value;
        let id_validation;

        idValid(username).then(data => {
            if (data === 409) {
                id_validation = false;
            }
            if (data === 202) {
                id_validation = true;
            }

            if (passwordValid(password1, password2) && id_validation && emptySpace(department, major, nation) === true) {
                props.onAuth(username, password1, nickname, student_id, department, major, nation);
                props.history.push('/');
            } else {
                let empty_msg = emptySpace(department, major, nation);
                const alert = document.getElementById("alert");

                if (passwordValid(password1, password2) === false) {
                    alert.childNodes[0].innerText = "비밀번호가 서로 다릅니다.";
                }
                if (id_validation === false) {
                    alert.childNodes[0].innerText = "중복된 아이디가 있습니다. 다른 아이디를 사용해주세요.";
                }
                if (emptySpace(department, major, nation) !== true) {
                    alert.childNodes[0].innerText = empty_msg;
                }
                alert.style.display = "block";
            }
        })
    };

    return (
        <Paper>
            <Box component="div" m={1} p={3}>
                <form className={classes.root} autoComplete="off" onSubmit={(event) => {
                    handleSubmit(event, department, major, nation)
                }}>

                    <Alert id="alert" severity="error" style={{ display: "none", marginBottom: 30 }}>다시 한 번 확인해주세요.</Alert>

                    <Grid container spacing={3} direction="row" justify="center" alignItems="center">
                        <Grid item xs={5}>
                            <Typography className={classes.label}>아이디</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <TextField
                                required
                                className={classes.text}
                                id="ID"
                                label="아이디"
                                variant="outlined" />
                        </Grid>

                        <Grid item xs={5}>
                            <Typography className={classes.label}>비밀번호</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <TextField
                                required
                                className={classes.text}
                                id="password1"
                                label="비밀번호"
                                type="password"
                                autoComplete="current-password"
                                variant="outlined"
                            />
                        </Grid>

                        <Grid item xs={5}>
                            <Typography className={classes.label}>비밀번호 재확인</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <TextField
                                required
                                className={classes.text}
                                id="password2"
                                label="비밀번호 재확인"
                                type="password"
                                autoComplete="current-password"
                                variant="outlined"
                            />
                        </Grid>

                        <Grid item xs={5}>
                            <Typography className={classes.label}>닉네임</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <TextField
                                required
                                className={classes.text}
                                id="nickname"
                                label="닉네임"
                                variant="outlined" />
                        </Grid>

                        <Grid item xs={5}>
                            <Typography className={classes.label}>학번</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <TextField
                                required
                                className={classes.text}
                                id="student_id"
                                label="학번"
                                variant="outlined" />
                        </Grid>

                        <Grid item xs={5}>
                            <Typography className={classes.label}>단과대학</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <FormControl required variant="outlined" className={classes.select}>
                                <InputLabel id="demo-simple-select-required-label">대학 선택</InputLabel>
                                <Select
                                    labelId="demo-simple-select-required-label"
                                    id="department"
                                    value={department}
                                    onChange={handleDeptChange}
                                    label="대학 선택"
                                >
                                    {department_list.map(department => {
                                        return (
                                            <MenuItem value={department}>{department}</MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={5}>
                            <Typography className={classes.label}>소속학과</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <FormControl required variant="outlined" className={classes.select}>
                                <InputLabel id="demo-simple-select-required-label">학과 선택</InputLabel>
                                <Select
                                    labelId="demo-simple-select-required-label"
                                    id="major"
                                    value={major}
                                    onChange={handleMajorChange}
                                    label="학과 선택"
                                >
                                    {major_list.map(major => {
                                        return (
                                            <MenuItem value={major}>{major}</MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={5}>
                            <Typography className={classes.label}>관심 국가</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <FormControl required variant="outlined" className={classes.select}>
                                <InputLabel id="demo-simple-select-required-label">국가 선택</InputLabel>
                                <Select
                                    labelId="demo-simple-select-required-label"
                                    id="interest_nation"
                                    value={nation}
                                    onChange={handleNationChange}
                                    label="국가 선택"
                                >
                                    {nation_list.map(nation => {
                                        return (
                                            <MenuItem value={nation}>{nation}</MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                className={classes.button}
                                type="submit"
                            >
                                회원가입
                            </Button>
                        </Grid>

                    </Grid>

                </form>
            </Box>
        </Paper>
    );
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password1, nickname, student_id, department, major, nation) => dispatch(actions.authSignup(username, password1, nickname, student_id, department, major, nation)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
