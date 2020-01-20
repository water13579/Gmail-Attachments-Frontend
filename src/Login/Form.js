import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'


class Form extends React.Component {
    constructor(props) {
      super(props)

      this.setEmails = this.props.setEmails
      this.setPageState = this.props.setPageState
      this.setCredentials = this.props.setCredentials

      this.state = {
        password: '', 
        username: '',
        loading: false
      }

      this.handleSubmit = this.handleSubmit.bind(this)
    }
  
    handleInput = event => {
      this.setState({[event.target.id]: event.target.value})
    }
  
    handleSubmit = event => {
      event.preventDefault()
      this.setState({loading: true})
      fetch('http://localhost:4321/search', {
        body: JSON.stringify(this.state),
        method: 'POST'
      }).then(res => {
        return res.json()
      }).then(res => {
        this.setState({loading: false})
        const msg = res.type === 'no' ? 'error' : 'success'
        this.props.handleConnectionAlertState(true, msg)
        if (msg === 'success') {
          this.setPageState('main')
          this.setCredentials({password: this.state.password, username: this.state.username})
          this.setEmails(res)
        }
      }).catch(error => {
        this.setState({loading: false})
        this.props.handleConnectionAlertState(true, 'error')
      })
    }
  
    render() {
      return (
        <form id="loginForm" onSubmit={this.handleSubmit} method="POST">
          <div className="formFieldWrapper">
            <TextField label="Email" id="username" 
             type="email" fullWidth={true} 
             className="formField" onChange={this.handleInput} 
            />
          </div>
          <div className="formFieldWrapper">
            <TextField label="Password" id="password" 
             type="password" fullWidth={true} 
             className="formField" onChange={this.handleInput} 
            />
          </div>
          <div>
            <Button 
              type="submit" 
              color="primary" 
              variant="contained" 
              size="large" 
              className='progressbarWrapper'
              disabled={this.state.loading}
            >
              Send
              { this.state.loading && <CircularProgress size={25} className='progressbar' /> }  
            </Button>
            
          </div>
        </form>
      )
    }
  }

  export default Form