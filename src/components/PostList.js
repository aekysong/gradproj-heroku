import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import axios from "axios";


const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 100,
    },
    head: {
        margin: theme.spacing(2),
    }
}));

export default function HomePost() {
    const [rows, setRows] = useState([]);
    const classes = useStyles();


    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/posts')
            .then(({ data }) => {
                setRows(data);
                // console.log(data);
            });
    }, []);

    return (
        <div>
            <Typography variant="h5" className={classes.head}>커뮤니티</Typography>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" width="150">국가</TableCell>
                            <TableCell align="center" width="300">게시글 제목</TableCell>
                            <TableCell align="right" width="150">게시 날짜</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(0, 5).map(row => (
                            <TableRow key={row.id}>
                                <TableCell align="left">{row.tag}</TableCell>
                                <TableCell align="left">
                                    <a href={`posts/${row['id']}`}>
                                        {row.title}
                                    </a></TableCell>
                                <TableCell align="right">{row.created_date.slice(0, 10)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
