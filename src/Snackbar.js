import React from 'react'
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

class Alert extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
    }
    render() {
        return (
            <Snackbar open={true}>
                <MuiAlert elevation={0} variant="filled" severity={this.props.severity} />
            </Snackbar>
        )
    }
}

export default Alert
