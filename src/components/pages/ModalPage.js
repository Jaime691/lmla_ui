import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'

class ModalPage extends Component {
    state = {
        showModal: this.props.showModal,
        text: this.props.text
    }

    componentWillReceiveProps({ showModal, text }){
        this.setState({
            showModal: showModal,
            text: text
        })
    }

    createMarkup = () =>  { 
        return {__html: this.state.text};
    };

    render(){
        const { showModal } = this.state;
        return (
            <Modal open={showModal} >
                <Modal.Header>AVISO DE PRIVACIDAD TRATAMIENTO DATOS PERSONALES</Modal.Header>
                <Modal.Content scrolling>
                    <Modal.Description>
                        <div dangerouslySetInnerHTML={this.createMarkup()} />
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button primary onClick={this.props.closeModal}>
                        Acepto
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
    
}

export default ModalPage