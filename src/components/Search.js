import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import { Redirect } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(1),
    },
    select: {
        margin: theme.spacing(1),
        width: 200,
    },
    text: {
        margin: theme.spacing(1),
        width: 400,
    },
    button: {
        margin: theme.spacing(1.6),
    },
    head: {
        margin: theme.spacing(1),
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

export default function Search(props) {
    const classes = useStyles();
    const [nation, setNation] = React.useState('');
    const [major, setMajor] = React.useState('');
    const [query, setQuery] = React.useState('');
    const [isRedirect, setIsRedirect] = React.useState(false);

    const handleNationChange = event => {
        setNation(event.target.value);
    };

    const handleMajorChange = event => {
        setMajor(event.target.value);
    };

    const handleQueryChange = event => {
        setQuery(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        setIsRedirect(true);
    };

    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <FormControl variant="outlined" className={classes.select}>
                    <InputLabel id="demo-simple-select-outlined-label">국가 선택</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="nation"
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

                <FormControl variant="outlined" className={classes.select}>
                    <InputLabel id="demo-simple-select-outlined-label">학과 선택</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="major"
                        value={major}
                        onChange={handleMajorChange}
                        label="학과 선택"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {major_list.map(major => {
                            return (
                                <MenuItem value={major}>{major}</MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>

                <TextField id="outlined-basic" label="대학 이름으로 검색" variant="outlined"
                    className={classes.text} value={query} onChange={handleQueryChange} />

                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                    startIcon={<SearchIcon />}
                    type="submit"
                >
                    검색
                </Button>
            </form>
            {(isRedirect) ? <Redirect to={{
                pathname: '/search',
                state: {
                    nation: nation,
                    major: major,
                    query: query,
                }
            }} /> : <div></div>}
        </div>
    );
}
