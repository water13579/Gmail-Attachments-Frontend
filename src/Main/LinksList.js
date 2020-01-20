import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

class LinksList extends React.Component {
  constructor(props) {
    this.state = {
      links: props.links
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      links: nextProps.links
    })
  }

  createListItem = text => {
    return (
      <ListItem>
        <ListItemText
          primary={text}
        />
        <ListItemSecondaryAction>
          <IconButton edge="end">
            <CloseIcon color="error"/>
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )
  }

  render() {
    <div>
      <List>
        {this.state.links.map(link => {
          this.createListItem(link)
        })}
      </List>
    </div>
  }
}