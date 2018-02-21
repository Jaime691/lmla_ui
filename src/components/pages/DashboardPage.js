import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter} from 'react-router-dom';
// Semantic UI Components
import { Grid, Button } from "semantic-ui-react";
// Components
import { logout } from "../../actions/auth";
import { fetchAllOrders } from "../../actions/orderActions";



class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
    }; // 18000000 === 1970-01-01
  }
  componentWillMount() {
    fetchAllOrders().then(orders => {
      this.setState({ orders, filteredOrders: orders });
    });
  }


  logout = () => {
    this.props.logout();
    this.props.history.push("/login");
  };

  render() {
    return <Grid style={{ paddingLeft: "0em", paddingRight: "0em" }}>
        <Grid.Row columns={4}>
          <Grid.Column mobile={16} tablet={4} widescreen={2} computer={3}>
            <Button size="small" color="red" content="Salir" icon="sign out" labelPosition="right" onClick={this.logout} fluid />
          </Grid.Column>
        </Grid.Row>
      </Grid>;
  }
}

DashboardPage.propTypes = {
  logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default withRouter(connect(mapStateToProps, { logout })(DashboardPage));
