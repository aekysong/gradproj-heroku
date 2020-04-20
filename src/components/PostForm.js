import React from "react";
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import axios from "axios";


const useStyles = makeStyles(theme => ({
    root: {
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    select: {
        margin: theme.spacing(1),
        width: 200,
    },
    text: {
        margin: theme.spacing(1),
        width: '98%',
    },
    button: {
        margin: theme.spacing(1.6),
    },
}));

const nation_list = [
    '네덜란드', '노르웨이', '뉴질랜드', '대만', '덴마크', '독일', '러시아', '리투아니아',
    '말레이시아', '멕시코', '미국', '벨기에', '브라질', '브루나이', '스웨덴', '스위스', '스페인',
    '싱가포르', '아랍에미레이트', '아이슬란드', '아일랜드', '영국', '오스트리아', '우루과이', '이탈리아',
    '인도네시아', '일본', '중국', '체코', '칠레', '캐나다', '콜롬비아', '크로아티아', '태국', '터키', '폴란드',
    '프랑스', '핀란드', '호주'
];

const getDate = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd;
    return today;
}

const isValid = (postObj) => {
    for (var obj in postObj) {
        if (postObj[obj] === '') {
            return obj;
        }
    }
    return true;
}

export default function PostForm(props) {
    const classes = useStyles();
    const [nation, setNation] = React.useState('');
    const [isChanged, setIsChanged] = React.useState(false);

    const handleNationChange = event => {
        setNation(event.target.value);
        setIsChanged(true);
    };

    const handleSubmit = async (event, requestType, postID) => {
        event.preventDefault();

        const postObj = {
            title: event.target.elements.title.value,
            content: event.target.elements.content.value,
            tag: event.target.elements.nation.value,
        }

        if (isValid(postObj) !== true) {
            let problem = isValid(postObj);
            if (problem === 'title') {
                problem = "제목을 채워주세요!";
            } else if (problem === 'content') {
                problem = "내용을 채워주세요!";
            } else {
                problem = "국가를 선택해주세요!"
            }
            const alert = document.getElementById("alert");
            alert.style.display = "block";
            alert.childNodes[0].innerText = problem;
        } else {
            axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
            axios.defaults.xsrfCookieName = "csrftoken";
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Token ${props.token}`,
            };

            if (requestType === "post") {
                postObj['created_date'] = getDate();
                console.log(postObj);

                await axios.post("http://127.0.0.1:8000/api/posts/create/", postObj)
                    .then(res => {
                        if (res.status === 201) {
                            props.history.push('/posts');
                        }
                    })
            }

            if (requestType === "put") {
                postObj['date'] = props.data.created_date;
                // console.log(props);

                await axios.put(`http://127.0.0.1:8000/api/posts/${postID}/update/`, postObj)
                    .then(res => {
                        if (res.status === 200) {
                            props.history.push(`/posts/${postID}`);
                        }
                    })
            }
        }
    };

    if (props.requestType === "post") {
        return (
            <Paper>
                <Box component="div" m={1} p={3}>
                    <form className={classes.root} autoComplete="off"
                        onSubmit={(event) => handleSubmit(event, props.requestType, props.postID)}>

                        <Alert id="alert" severity="error" style={{ display: "none" }}>빈 칸이 없는지 다시 한 번 확인해주세요.</Alert>

                        <TextField
                            className={classes.text}
                            name="title"
                            label="제목"
                            variant="outlined" />

                        <TextField
                            className={classes.text}
                            name="content"
                            label="내용"
                            multiline
                            rows="20"
                            variant="outlined"
                        />

                        <FormControl variant="outlined" className={classes.select}>
                            <InputLabel id="demo-simple-select-outlined-label">국가 선택</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                name="nation"
                                value={nation}
                                onChange={handleNationChange}
                                label="국가 선택"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {nation_list.map(nation => {
                                    return (
                                        <MenuItem value={nation}>{nation}</MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            className={classes.button}
                            type="submit"
                        >
                            발행
                    </Button>
                    </form>
                </Box>
            </Paper>
        );
    }

    if (props.requestType === "put") {
        return (
            <Paper>
                <Box component="div" m={1} p={3}>
                    <form className={classes.root} noValidate autoComplete="off"
                        onSubmit={(event) => handleSubmit(event, props.requestType, props.postID)}>

                        <Alert id="alert" severity="error" style={{ display: "none" }}>빈 칸이 없는지 다시 한 번 확인해주세요.</Alert>

                        <TextField
                            defaultValue={props.data.title}
                            className={classes.text}
                            name="title"
                            label="제목"
                            variant="outlined"
                            multiline
                        />

                        <TextField
                            defaultValue={props.data.content}
                            className={classes.text}
                            name="content"
                            label="내용"
                            multiline
                            rows="20"
                            variant="outlined"
                        />

                        <FormControl variant="outlined" className={classes.select}>
                            <InputLabel id="demo-simple-select-outlined-label">국가 선택</InputLabel>
                            <Select
                                value={isChanged ? nation : props.data.nation}
                                name="nation"
                                onChange={handleNationChange}
                                label="국가 선택"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {nation_list.map(nation => {
                                    return(<MenuItem value={nation}>{nation}</MenuItem>);
                                })}
                            </Select>
                        </FormControl>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            className={classes.button}
                            type="submit"
                        >
                            발행
                    </Button>
                    </form>
                </Box>
            </Paper>
        );
    }
}