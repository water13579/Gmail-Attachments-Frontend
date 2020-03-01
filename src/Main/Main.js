import React from 'react'
import { find } from 'lodash'
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import EmailsCheckboxTree from './EmailsCheckboxTree'
import '../App.css'
import { Button, CircularProgress } from '@material-ui/core';


const findUrls = text => {
  const pattern = /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/
  return pattern.exec(text)
}


class Main extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      emails: props.emails,
      checked: [],
      expanded: [],
      loading: false
    }
    this.handleChecked = this.handleChecked.bind(this)
    this.handleExpanded = this.handleExpanded.bind(this)
    this.getCheckedEmails = this.getCheckedEmails.bind(this)
    this.handleDownload = this.handleDownload.bind(this)
  }

  // getCheckedEmails = () => {
  //   return this.state.checked.reduce((obj, leaf) => {
  //     leaf = leaf.split('__***__')
  //     if (obj[leaf[0]] === undefined) {
  //       obj[leaf[0]] = {[leaf[1]]: [leaf[2]]}
  //     } else {
  //       if (obj[leaf[0]][leaf[1]] === undefined) {
  //         obj[leaf[0]][leaf[1]] = [leaf[2]]
  //       } else {
  //         obj[leaf[0]][leaf[1]].push(leaf[2])
  //       }
  //     }
  //     return obj
  //   }, {})
  // }

  getCheckedEmails = () => this.state.checked.reduce((list, leaf) => {
    var parsed = JSON.parse(leaf)
    return [...list, parsed]
  }, [])

  handleChecked = checked => this.setState({ checked: checked })

  handleExpanded = expanded => this.setState({ expanded: expanded })

  handleDownload = () => {
    const data = this.getCheckedEmails()
    return fetch('http://localhost:4321/download', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ emails: nextProps.emails })
  }

  render() {
    return (
      <div className='centerDiv'>
        <EmailsCheckboxTree
          emails={this.state.emails}
          handleChecked={this.handleChecked}
          handleExpanded={this.handleExpanded}
        />
        <div style={{ textAlign: "center" }}>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            size="large"
            className='progressbarWrapper'
            disabled={this.state.loading}
            onClick={this.handleDownload}
          >
            Download
            {this.state.loading && <CircularProgress size={25} className='progressbar' />}
          </Button>
        </div>
      </div>
    )
  }
}

export default Main

