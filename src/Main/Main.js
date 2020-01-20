import React from 'react'
import { find } from 'lodash'
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import EmailsCheckboxTree from './EmailsCheckboxTree'
import '../App.css'


class Main extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      emails: props.emails,
      checked: [],
      expanded: []
    }
    this.handleChecked = this.handleChecked.bind(this)
    this.handleExpanded = this.handleExpanded.bind(this)
  }

  handleChecked = checked => this.setState({checked: checked})

  handleExpanded = expanded => this.setState({expanded: expanded})

  componentWillReceiveProps(nextProps) {
    this.setState({emails: nextProps.emails})
  }

  render() {
    return (
      <EmailsCheckboxTree 
        emails={this.state.emails}
        handleChecked={this.handleChecked}
        handleExpanded={this.handleExpanded}
      />
    )
  }
}

export default Main