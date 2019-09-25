import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';

import axios from "axios";

import './style.css';

import Profile from "./src/components/profile.js";
import EnterUser from './src/components/enter-user.js';

import {
  Container,
  Button,
  Icon,
  Message,
  Segment,
  Dimmer,
  Loader,
  Header
} from 'semantic-ui-react';

class App extends Component {
  state = {
    collection: undefined,
    loading: false,
    showReset: false,
    hasError: {
      isActive: false,
      message: undefined
    },
    url: 'https://api.github.com/users/',
    user: ''
  };

  // Bind values to this
  getUser = this.getUser.bind(this);
  resetUser = this.resetUser.bind(this);

  queryUrl() {
    const { url, user, hasError, collection } = this.state;

    // Reset current user object
    this.setState({
      collection: undefined
    });

    // Query url
    axios.get(url + user).then(response => {
      const { data, status } = response;

      if (status === 200) {
        // Update state based on catch status
        this.setState({
          showReset: true,
          collection: data
        });
      }

    }).catch((error) => {
      const { status } = error.response;
      let errorMessage;

      // TODO - This will need to be revised...
      if (status === 404) {
        errorMessage = `It appears "${user}" does not exist :(`;
      } else if (status === 403) {
        errorMessage = "API rate limit exceeded, try again later"
      }

      this.setState({
        showReset: true,
        hasError: {
          isActive: true,
          message: errorMessage
        }
      });
    });


    this.setState({
      loading: false
    });
  }

  getUser() {
    const { loading } = this.state;

    this.setState({
      loading: true
    });

    // TODO - Improve -> Create a fake delay (UI flicker)
    setTimeout(() => {
      this.queryUrl();
    }, 1200)
  }

  resetUser() {
    this.setState({
      user: '',
      showReset: false,
      hasError: {
        isActive: false,
        message: undefined
      },
      collection: undefined
    })
  }

  checkUsername = (e, { value }) => {
    const { user } = this.props;

    this.setState({
      user: value
    });
  }

  render() {
    const { showReset, collection, hasError, user, loading } = this.state;

    return (
      <Container padded="very">
        <Dimmer
          page
          active={loading}>
          <Loader content='Loading' />
        </Dimmer>

        <Segment padded="very">
          <Header as="h2">Query github search</Header>

          {hasError.isActive ? (
            <Message
              error
              header="Whoops"
              content={hasError.message} />
          ) : null}

          <EnterUser
            formData={user}
            getUser={this.getUser}
            resetUser={this.resetUser}
            showReset={showReset}
            hasError={hasError}
            handleUser={this.checkUsername}
            isLoading={loading} />

          {!hasError.isActive && !loading ? (
            <Profile info={collection} />
          ) : null}
        </Segment>
      </Container>
    );
  }
}

render(<App />, document.getElementById('root'));