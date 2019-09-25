import React, { Component, Fragment } from "react";
import { render } from 'react-dom';

import { Divider, Header, Button, Checkbox, Form, Message } from 'semantic-ui-react'

export default class EnterUser extends React.Component {
  render() {
    const {
      formData,
      addUser,
      getUser,
      resetUser,
      showReset,
      hasError,
      handleUser,
      isLoading
    } = this.props;

    const test = isLoading ? "loading stuff :(" : "I am sorted :)";

    return (
      <Form error={hasError.isActive}>


        {!hasError.isActive ? (
          <React.Fragment>
            <Form.Field required>
              <Message
                error
                header='Form Error'
                content='You must specify a username' />

              <Form.Input
                placeholder='@username'
                value={formData}
                name="username"
                onChange={handleUser}
                autoComplete="off" />
            </Form.Field>

            <Button
              content="Query user"
              onClick={getUser}
              disabled={!getUser || isLoading || formData.length === 0}
              color="blue"
              icon={isLoading ? "search" : "find"}
              labelPosition="left"
              type="submit" />
          </React.Fragment>
        ) : null}

        {hasError.isActive || showReset || formData.length > 0 ? (
          <Button
            onClick={resetUser}
            content={hasError.isActive ? "Retry" : "Reset"}
            color="red"
            labelPosition="left"
            icon='trash'>
          </Button>
        ) : null}
      </Form>
    );
  }
}

// {!hasError.isActive ? (
//           <Divider />
//         ) : null}