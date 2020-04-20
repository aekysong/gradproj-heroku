import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";


const useStyles = makeStyles(theme => ({
    root: {
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    text: {
        margin: theme.spacing(1),
        width: '98%',
    },
    button: {
        margin: theme.spacing(1.6),
    },
}));

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

export default function NewComment(props) {
    // console.log(props);
    const classes = useStyles();
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        const postObj = {
            post: props.postID,
            content: event.target.elements.comment.value,
        }

        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem('token')}`,
        };

        postObj['created_date'] = getDate();

        await axios.post(`http://127.0.0.1:8000/api/comments/create/`, postObj)
            .then(res => {
                if (res.status === 201) {
                    window.location.reload();
                }
            })
    }

    return (
        <div>
            {localStorage.getItem("token") === null ?
                <div></div>
                :
                <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <TextField
                        className={classes.text}
                        name="comment"
                        label="댓글"
                        multiline
                        rows="4"
                        variant="outlined"
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className={classes.button}
                        type="submit"
                    >
                        댓글 쓰기
                    </Button>
                </form>
            }
        </div>
    );
}