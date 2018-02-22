import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';

import asyncComponent from './components/AsyncComponent';

// Doing some async import...
const LoginPage = asyncComponent(() =>
  import('./components/pages/LoginPage')
);
const SignupPage = asyncComponent(() =>
  import('./components/pages/SignupPage')
);
const ForgotPasswordPage = asyncComponent(() =>
  import('./components/pages/ForgotPasswordPage')
);
const ResetPasswordPage = asyncComponent(() =>
  import('./components/pages/ResetPasswordPage')
);
const DashboardPage = asyncComponent(() =>
  import('./components/pages/DashboardPage')
);

class App extends Component {
  render() {
    const { location } = this.props;
    console.log(location);
    return (
      <Grid style={{ marginLeft: '0rem', marginRight: '0rem' }}>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={16} computer={16}>
            <Switch>
              <GuestRoute
                location={location}
                path="/login"
                component={LoginPage}
              />
              <GuestRoute
                location={location}
                path="/signup"
                exact
                component={SignupPage}
              />
              <GuestRoute
                location={location}
                path="/forgot_password"
                exact
                component={ForgotPasswordPage}
              />
              <GuestRoute
                location={location}
                path="/reset_password/:token"
                exact
                component={ResetPasswordPage}
              />
              <UserRoute
                location={location}
                path="/"
                exact
                component={DashboardPage}
              />
            </Switch>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default App;
