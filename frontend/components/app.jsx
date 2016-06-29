const React = require('react');
const Modal = require('react-modal');
const ModalStyles = require('../styles/modal_styles');
const Link = require('react-router').Link;
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');
const ErrorActions = require('../actions/error_actions');
const LoginForm = require('./login_form');
const SignupForm = require('./signup_form');

const App = React.createClass({
  getInitialState() {
    Modal.setAppElement('body');
    return { modalIsOpen: false, modal: "" };
  },

  handleOpenModal(modal) {
    this.setState({ modalIsOpen: true, modal: modal });
  },

  handleCloseModal: function() {
    this.setState({ modalIsOpen: false });
    ErrorActions.clearErrors();
  },

  greeting() {
    if (SessionStore.isUserLoggedIn()) {
      return (
        <hgroup className='header-group'>
          <h2 className='header-name'>Hi, {SessionStore.currentUser().name}!</h2>
          <button onClick={this._handleLogout} className='logout-button'>Log Out</button>
        </hgroup>
      );
    } else if ( !['/login', '/signup'].includes(this.props.location.pathname) ) {
      return (
        <nav className='login-signup'>
          <button
            onClick={this.handleOpenModal.bind(this, "Log In")}
            id='login-button'
          >Login</button>

          <button
            onClick={this.handleOpenModal.bind(this, "Sign Up")}
            id='signup-button'
          >Signup</button>
        </nav>
      );
    }
  },

  _handleLogout() {
    SessionActions.logout();
    ErrorActions.clearErrors();
    this.setState({ modalIsOpen: false });
  },

  render() {
    let component;

    if (this.state.modal === "Log In") {
      component = <LoginForm close={this.handleCloseModal}/>;

    } else {
      component = <SignupForm close={this.handleCloseModal}/>;

    }

    let modal;

    if (this.state.modalIsOpen) {
      modal = (
        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.handleCloseModal} style={ModalStyles} className='modal'>
          {component}
        </Modal>
      );
    }

    return (
      <div className='app-container'>
        <header>
          { this.greeting() }
        </header>
        {modal}
        Hello from the PuppiesBnb App!
      </div>
    );
  }
});

module.exports = App;
