import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import CloseIcon from '@material-ui/icons/Close'
import AddIcon from '@material-ui/icons/Add';
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import Collapse from '@material-ui/core/Collapse'
import { ExpandMore, ExpandLess } from '@material-ui/icons'
import Input from '@material-ui/core/Input';
import _ from 'lodash'

class Folder extends React.Component {

  render() {
    <ListItem>
      <ListItemText primary={this.props.name} />
      <ListItemSecondaryAction>
        <IconButton onClick={this.props.handleClose}>
          <CloseIcon edge="end" aria-label="delete" />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  }
}

class EmailFolders extends React.Component {
  constructor() {
    super(props)

    this.state = {
      expanded: false,
      folders: [this.props.name]
    }

    this.handleClose = this.handleClose.bind(this)
  }

  handleClose = folderName => {
    const newArray = this.state.folders.filter(folder => folder != folderName)
    this.setState({folders: newArray})
  }

  renderFolders = folders => {
    folders.map((folder, index) => {
      <Folder handleClose={this.handleClose} name={folder} key={index} />
    })
  }

  render() {
    return [
      <ListItem>
        <ListItemText primary={this.props.sender}/>
        <ListItemSecondaryAction>
          <IconButton>
            <CloseIcon />
          </IconButton>
        </ListItemSecondaryAction>
        <ListItemSecondaryAction onClick={() => this.setState({expanded: !this.state.expanded})}>
          <IconButton>
            {this.state.expanded ? <ExpandLess /> : <ExpandMore/>}
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>,
      <Collapse>
        <List>
          { this.renderFolders(this.state.folders) }
        </List>
      </Collapse>
    ]
  }
}

class AddNewFolder extends React.Component {
  constructor() {

  }

  render() {
    return (
      <>
        <ListItem>
          <ListItemText primary="Add New Folder" />
        </ListItem>
        <ListItemSecondaryAction>
          <IconButton>
            <AddIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </>
    )
  }
}

class EmailsFoldersList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      targets: this.convertEmailsToTargets(this.props.emails)
    }
  }

  convertEmailsToTargets = emails => {
    emails.map(email => /<.*>/.exec(email).pop().slice(1, -1).toUpperCase())
  }

  renderEmails = targets => {
    <EmailFolders />
  }

  render() {
    return (
      <>
        {this.renderEmails(this.state.targets)}
      </>
    )
  }
}

export default EmailsFoldersList