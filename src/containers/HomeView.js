import React from 'react';
import HomeLayout from './HomeLayout';
import axios from 'axios';


class HomeView extends React.Component {
  state = {
    userData: [],
  }

  async componentWillReceiveProps(newProps) {
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem('token')}`,
    };

    await axios.get('https://skku-exchange.herokuapp.com/api/user')
      .then((res) => {
        // console.log(res.data);
        this.setState({
          userData: res.data.student,
        });
      })
  }

  render() {
    return (
      <HomeLayout user={this.state.userData} />
    );
  }
}

export default HomeView;