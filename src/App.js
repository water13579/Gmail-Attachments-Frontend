import React from 'react'
import './App.css'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import 'typeface-roboto'
import Login from './Login/Login'
import Main from './Main/Main'
import Header from './Header'



class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      page: 'login',
      emails: [],
      showSnackbar: false,
      snackbarMessage: '',
      severityState: 'success'
    }

    this.handleEmails = this.handleEmails.bind(this)
    this.handlePageState = this.handlePageState.bind(this)
    this.handleCredentialsValue = this.handleCredentialsValue.bind(this)
    this.handleSnackbar = this.handleSnackbar.bind(this)
    this.renderPage = this.renderPage.bind(this)
  }

  handleSnackbar = options => this.setState(options)

  handleEmails = emails => this.setState({emails: emails})

  handlePageState = name => this.setState({page: name})

  handleCredentialsValue = (user, pass) => this.setState({username: user, password: pass})

  renderPage = pageState => {
    switch(pageState) {
      default:
      case 'login':
        return (
          <Login 
            setCredentials={this.handleCredentialsValue} 
            setPageState={this.handlePageState} 
            setEmails={this.handleEmails}
            handleSnackbar={this.handleSnackbar}
          />
        )
      case 'main':
        return <Main emails={this.state.emails}/>
    }
  }

  render() {
    return (
      <div>

        <Header message="Email Downloader" />
        {this.renderPage(this.state.page)}
        <Snackbar 
          open={this.state.showSnackbar} 
          autoHideDuration={2000} 
          onClose={() => this.handleSnackbar({showSnackbar: false})}
        >
          <MuiAlert 
            elevation={2} 
            variant="filled" 
            severity={this.state.severityState}
            onClose={() => this.handleSnackbar({showSnackbar: false})}
          >
            {this.state.snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </div>
    )
  }
}

export default App