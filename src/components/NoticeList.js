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

export default function HomeNotice() {
    const [rows, setRows] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/notices')
            .then(({ data }) => {
                setRows(data);
                // console.log(data);
            });
    }, []);

    return (
        <div>
            <Typography variant="h5" className={classes.head}>국제처 공지사항</Typography>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" width="75">No.</TableCell>
                            <TableCell align="center" width="300">게시글 제목</TableCell>
                            <TableCell align="right" width="125">게시 날짜</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(0, 5).map(row => (
                            <TableRow key={row.id}>
                                <TableCell align="left">{row.no}</TableCell>
                                <TableCell align="left">
                                    <a href={row.url} target='_blank' rel="noopener noreferrer">
                                        {row.title}
                                    </a></TableCell>
                                <TableCell align="right">{row.date.slice(0, 10)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
