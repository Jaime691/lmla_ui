import React from "react";
import PropTypes from "prop-types";
import queryString from 'query-string';
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Message, Grid, Header, Card } from "semantic-ui-react";

import SignupForm from "../forms/SignupForm";
import { signup, validateUser } from "../../actions/auth";




class SignupPage extends React.Component {
	state = {
		isLoading: true,
		isRegistered: false,
		errors: {},
		data: {
			fullname: "",
			email_address: "",
			patient_id: "",
			signup_code_used: "",
			gender: ""
		}
	};

	componentDidMount() {
		const parsed = queryString.parse(this.props.location.search);
		console.log(parsed)
		const user = {
			token: parsed.token,
			patient_id: parsed.patient_id
		};
		validateUser(user)
			.then(data => {
				this.setState({
					data: data.data,
					isRegistered: data.isRegistered,
					isLoading: false
				});
			})
			.catch(err => {
				// Here is when the activation code is not related to any user.
				console.log("Should redirect to an information page");
				this.setState({ isLoading: true });
				this.props.history.push("/");
			});
	}

	submit = data =>
		this.props.signup(data).then(() => this.props.history.push("/"));

	render() {
		const { data, isLoading, isRegistered } = this.state;
		return (
			<Grid container={true} centered={true}>
				<Grid.Column width={12}>
					{!isLoading &&
						isRegistered && (
								<Card fluid={true}>
									<Message attached>
										<Header size='medium'>Oops!</Header>
									</Message>
									<Card.Content>
											Usted ya se encuentra registrado, para acceder por favor haga click <Link to="/login">aquí</Link>
									</Card.Content>
								</Card>
						)}
					{!isLoading &&
						!isRegistered && (
							<Card fluid={true}>
								<Message attached>
									<Header size="medium">Registrate!</Header>
								</Message>
								<Card.Content>
									<SignupForm
										submit={this.submit}
										data={data}
									/>
								</Card.Content>
							</Card>
						)}
				</Grid.Column>
			</Grid>
		);
	}
}

SignupPage.propTypes = {
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired,
	signup: PropTypes.func.isRequired
};

export default withRouter(connect(null, { signup })(SignupPage));
