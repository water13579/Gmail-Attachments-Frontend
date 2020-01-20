import React from 'react'
import Typography from '@material-ui/core/Typography'
import './App.css'

class Header extends React.Component {
    render() {
      return (
        <div  className='headerWrapper'>
          <div className="fitHeaderContent">
            <Typography component="h2" variant="h1">
              {this.props.message}
            </Typography>
          </div>
        </div>
      )
    }
  } 
  
  export default Header