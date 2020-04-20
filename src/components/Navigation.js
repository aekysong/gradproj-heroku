import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';


const useStyles = makeStyles({
  navBar: {
    padding: 5,
    marginLeft: 10,
    height: 50,
  },
});

function Navigation(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();

  const logoStyle = {
    fontWeight: 'bold'
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = nav => {
    window.location.href = nav;
    setAnchorEl(null);
  };

  return (
    <div className={classes.navBar}>
      <span style={logoStyle}><Link to="/">SKKU 교환학생 지원 웹사이트</Link></span>
      <Button href='/universities' color="primary" >
        전체 대학 리스트
      </Button>
      <Button href='/notices' color="primary">
        국제처 공지사항
      </Button>
      <Button href='/posts' color="primary">
        커뮤니티
        </Button>
      {props.isAuthenticated ?
        <Box component="span">
          <Button color="primary" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            마이페이지
        </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => { handleClose("") }}
          >
            <MenuItem onClick={() => { handleClose("/favorites") }}>파견대학 즐겨찾기</MenuItem>
            <MenuItem onClick={() => { handleClose("/myposts") }}>내 게시글 보기</MenuItem>
            <MenuItem onClick={ props.logout }>로그아웃</MenuItem>
          </Menu>
        </Box>
        :
        <Box component="span">
          <Button href='/signup' color="primary">
            회원가입
      </Button>
          <Button href='/login' color="primary">
            로그인
      </Button>
        </Box>
      }
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
      logout: () => {
        dispatch(actions.logout());
        window.location.href = "/";
      }
  }
}

export default connect(null, mapDispatchToProps)(Navigation);