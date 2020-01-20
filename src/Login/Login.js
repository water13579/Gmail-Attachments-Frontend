import React from 'react'
import Form from './Form'

class Login extends React.Component {

  constructor(props) {
    super(props)

    this.setPageState = this.props.setPageState
    this.setCredentials = this.props.setCredentials
    this.setEmails = this.props.setEmails
    this.handleSnackbar = this.props.handleSnackbar

    this.state = {
      showSnackbar: false,
      snackbarMessage: '',
      severityState: 'success',
      page: 'login'
    }

    this.handleConnectionAlertState = this.handleConnectionAlertState.bind(this)
    
  }

  handleConnectionAlertState = (bool, state) => {
    const msg = state === 'error' ? "Connection Failed!" : "Connected Successfully"
    this.setPageState({page: state === 'error' ? 'login' : 'main'})
    this.handleSnackbar({
      showSnackbar: bool,
      severityState: state,
      snackbarMessage: msg,
    })
  }

  render() {
    return (
      <div id="app">
        <div id="formWrapper">
          <Form 
            handleConnectionAlertState={this.handleConnectionAlertState} 
            setCredentials={this.setCredentials}
            setPageState={this.setPageState}
            setEmails={this.setEmails}
          />
        </div>
      </div>
    )
  }
}

export default Login