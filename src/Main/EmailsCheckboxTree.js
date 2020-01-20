import React from "react";
import CheckboxTree from 'react-checkbox-tree'
import { find } from 'lodash'


class EmailsCheckboxTree extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      emails: props.emails, 
      checkboxNodes: [],
      checked: [],
      expanded: []
    }
  }

  componentWillReceiveProps(nextProps) {
    const newEmails = this.populateCheckbox(nextProps.emails)
    this.setState({
      checkboxNodes: newEmails,
      emails: nextProps.emails
    })
  }

  // orderEmails = emails => {
  //   return emails.reduce((emailsStruct, email) => {
  //     const body = find(email.parts, {which: 'HEADER'}).body
  //     const sender = body.from[0]
  //     const subject = body.subject[0]
  //     if (emailsStruct[sender] === undefined) {
  //       emailsStruct[sender] = [{subject: subject, body: body}]
  //     } else {
  //       emailsStruct[sender].push({subject: subject, body: body})
  //     }
  //     return emailsStruct
  //   }, {})
  // }

  populateCheckbox = emailsMapping => {
    return Object.entries(emailsMapping).map(([sender, emails]) => ({
        value: sender,
        label: /<.*>/.exec(sender).pop().slice(1, -1).toUpperCase(),
        children: emails.map(email => ({value: email.subject, label: email.subject}))
    }))
  }

  render() {
    return (
      <div className="managingRow">
        <div id='checkboxTreeWrapper' >
          <CheckboxTree 
            nodes={this.state.checkboxNodes}
            checked={this.state.checked}
            expanded={this.state.expanded}
            onCheck={checked => this.setState({checked})}
            onExpand={expanded => this.setState({expanded})}
          />
        </div>
      </div>
    )
  }
}
  
export default EmailsCheckboxTree
