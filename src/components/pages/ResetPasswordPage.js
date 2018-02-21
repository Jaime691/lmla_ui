import React from "react";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
import { Message, Grid, Card, Header } from "semantic-ui-react";
import ResetPasswordForm from "../forms/ResetPasswordForm";
import LinkMessage from "../messages/LinkMessage";
import { validateToken, resetPassword } from "../../actions/auth";

class ResetPasswordPage extends React.Component {
  state = {
    loading: true,
    success: false,
    message_sent: false
  };

  componentDidMount() {
      validateToken(this.props.match.params.token)
      .then(data => {
        this.setState({ loading: false, success: true })
      })
      .catch( err => {
        this.setState({ loading: false, success: false })
      });
  }

  submit = data =>
      resetPassword(data)
      .then(() => {
        this.setState({
          message_sent: true
        });
        // this.props.history.push("/login")
      });

  render() {
    const { loading, success, message_sent } = this.state;
    const token = this.props.match.params.token;

    return (
      <Grid container={true} centered={true}>
        <Grid.Column width={9}>
          {loading && !message_sent && <Message>Loading</Message>}
					{!loading && !success && !message_sent &&
					(<Message>
						<Header size="medium">Lo sentimos</Header>
						<p>El enlace ya expiró por favor intentalo nuevamente, presiona clic <Link to='/forgot_password'>aquí</Link></p>
						
					</Message>)}
          {!loading &&
            success && !message_sent &&
              (<Card fluid={true}>
                <Message attached>
                  <Header size="medium">Ingresa tu nueva contraseña</Header>
                </Message>
                <Card.Content>
                  <ResetPasswordForm submit={this.submit} token={token} />
                </Card.Content>
              </Card>
            )}
            {message_sent && (<LinkMessage 
            header='Contraseña Modificada'
            text='La contraseña fue modificada exitosamente.'
            link='/login'
            page='Inicio'
          />)}
        </Grid.Column>
      </Grid>
    );
  }
}

ResetPasswordPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default ResetPasswordPage;

