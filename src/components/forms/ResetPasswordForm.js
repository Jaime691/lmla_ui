import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Message } from "semantic-ui-react";
import InlineError from "../messages/InlineError";
import Validator from "validator";
import isEmpty from 'lodash/isEmpty';




function validateInput(data) {
	let errors = {};



	

	if (Validator.isEmpty(data.password)) {
		errors.password = 'Este campo es requerido.';
	}

	if (Validator.isEmpty(data.passwordConfirmation)) {
		errors.passwordConfirmation = 'Este campo es requerido.';
	}

	if (!Validator.equals(data.password, data.passwordConfirmation)) {
		errors.passwordConfirmation = "Las contraseñas no son iguales";
	}


	return {
		errors,
		isValid: isEmpty(errors)
	};
}

class ResetPasswordForm extends React.Component {
	state = {
		data: {
            token: "",
			password: "",
			passwordConfirmation:''
			
		},
		isLoading: false,
		errors: {}
	};

	componentDidMount() {
		this.setState({
			data: { ...this.state.data, token: this.props.token}
		});
	}

	isValid(){
		const {errors, isValid} = validateInput(this.state.data);

		if (!isValid) {
			this.setState({ errors: errors });
		}

		return isValid;
	}

	onSubmit = () => {


		if (this.isValid()) {
			this.setState({ isLoading: true });
			this.props.submit(this.state.data).catch((err) => {
				if (err.response.status >= 500) {
					this.setState({
						errors: {
							global: "No se pudo contactar con el servidor"
						},
						isLoading: false
					});
				} else if (err.response.status === 404) {
					this.setState({
						errors: {
							global: "Ups!, Algo esta mal"
						},
						isLoading: false
					});
				} else {
					this.setState({
						errors: err.response.data.errors,
						isLoading: false
					});
				}
			});
		}
	};

	validate = data => {
		const errors = {};
		// TODO: validate uniqueness.
		if (!data.username) errors.username = "No puede estar en blanco.";
		if (!data.password) errors.password = "No puede estar en blanco.";
		if (!Validator.isEmail(data.email)) errors.email = "Debe ser un correo válido";
		return errors;
	};

	onChange = e =>
		this.setState({
			data: { ...this.state.data, [e.target.name]: e.target.value }
		});

	render() {
		const { data, errors, isLoading } = this.state;
		return (
			<Form onSubmit={this.onSubmit} loading={isLoading}>
				{errors.global && (
					<Message negative>
						<Message.Header>Something went wrong</Message.Header>
						<p>{errors.global}</p>
					</Message>
				)}
				
				
				<Form.Field error={!!errors.password}>
					<label htmlFor="password">Contraseña</label>
					<input
						type="password"
						id="password"
						name="password"
						value={data.password}
						onChange={this.onChange}
					/>
					{errors.password && <InlineError text={errors.password} />}
				</Form.Field>
				<Form.Field error={!!errors.passwordConfirmation}>
					<label htmlFor="passwordConfirmation">Confirmar contraseña</label>
					<input
						type="password"
						id="passwordConfirmation"
						name="passwordConfirmation"
						value={data.passwordConfirmation}
						onChange={this.onChange}
					/>
					{errors.passwordConfirmation && <InlineError text={errors.passwordConfirmation} />}
				</Form.Field>
				<Button primary>Modificar contraseña</Button>
			</Form>
		);
	}
}

ResetPasswordForm.propTypes = {
	submit: PropTypes.func.isRequired,
	token: PropTypes.string.isRequired
};

export default ResetPasswordForm;
