import React from "react";
import PropTypes from "prop-types";
import ForgotPasswordForm from "../forms/ForgotPasswordForm";
import LinkMessage from "../messages/LinkMessage";
import { resetPasswordRequest } from "../../actions/auth";
import {Grid, Message, Card, Header} from 'semantic-ui-react';

class ForgotPasswordPage extends React.Component {

	state = {
		message_sent: false
	}
	
	submit = data =>
		resetPasswordRequest(data).then(() => {
			this.setState({
				message_sent: true
			});
		});

	render() {
		const {message_sent} = this.state;
		return (
			<Grid container={true} centered={true}>
			<Grid.Column width={9}>
			  
			  	{!message_sent && (<Card fluid={true}>
			  						<Message attached>
			  				  				  	<Header size='medium'>¿ Olvidaste tu contraseña ? </Header>
			  				  					</Message>
			  				  					<Card.Content>
			  				  						<ForgotPasswordForm submit={this.submit}/>
			  				  					</Card.Content>
			  				  				</Card>
			  				  				  )}
				{message_sent && (<LinkMessage 
						header='Correo enviado exitosamente'
						text='Un correo electrónico fue enviado con un enlace para modificar tu contraseña'
						link=''
						page=''
					/>)}
			  
			</Grid.Column>
		  </Grid>
		);
	}
}

ForgotPasswordPage.propTypes = {
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired
};

export default ForgotPasswordPage;
