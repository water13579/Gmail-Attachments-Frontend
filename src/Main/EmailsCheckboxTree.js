import React from "react";
import CheckboxTree from 'react-checkbox-tree'

class EmailsCheckboxTree extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      emails: props.emails, 
      checkboxNodes: [],
      checked: [],
      expanded: []
    }
    // this.populateCheckbox = this.populateCheckbox.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    // const newEmails = populateCheckbox(nextProps.emails)
    this.setState({
      checkboxNodes: nextProps.emails,
      emails: nextProps.emails
    })
  }

  render() {
    return (
      <div id='checkboxTreeWrapper' >
        <CheckboxTree 
          checkModel='leaf'
          nodes={this.state.checkboxNodes}
          checked={this.state.checked}
          expanded={this.state.expanded}
          onCheck={checked => {
            this.setState({checked})
            this.props.handleChecked(checked)
          }}
          onExpand={expanded => this.setState({expanded})}
        />
      </div>
    )
  }
}

export default EmailsCheckboxTree
