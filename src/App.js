import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Footer from './components/Footer';

import BaseRouter from './routes';
import Navigation from './components/Navigation';

import { connect } from 'react-redux';
import * as actions from './store/actions/auth';

class App extends React.Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  
  render() {
    return (
      <div className="App">
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="lg">
            <BrowserRouter>
              <Navigation {...this.props} />
              <BaseRouter />
              <Footer />
            </BrowserRouter>
          </Container>
        </React.Fragment>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
