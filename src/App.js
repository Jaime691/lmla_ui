import React, {Component} from "react";
import PropTypes from 'prop-types';
import { Switch, Route } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoginPage from "./components/pages/LoginPage"
import SignupPage from "./components/pages/SignupPage" 
import DashboardPage from "./components/pages/DashboardPage" 


class App extends React.Component{
  render () {
    const {location} = this.props;
    console.log(location);
    return (
      <Grid style={{ marginLeft: "0rem", marginRight: "0rem" }}>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={16} computer={16}>
            <Switch>
              <Route
                location={location}
                path="/signup"
                exact
                component={SignupPage}
              />
              <Route
                location={location}
                path="/"
                exact
                component={DashboardPage}
              />
              <Route 
                path="/login"
                exact
                location={location} 
                component={LoginPage} 
              />
            </Switch>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}


App.propTypes = {
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired
  }).isRequired
}

export default App;
