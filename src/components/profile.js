import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';

import {
  Header,
  Image,
  Item,
  Table,
  Divider
} from 'semantic-ui-react';

export default class Profile extends React.Component {
  render() {
    const { info } = this.props;

    if (info) {
      const { name, avatar_url } = info;
    }

    return (
      <Item>
        {info ? (
          <React.Fragment>

            <Divider hidden />

            <Header
              as='h3'
              content={name ? `Hi, ${name}` : "Your Info:"} />

            <Image
              circular
              verticalAlign
              floated="left"
              size='tiny'
              src={avatar_url} />

            <Table celled striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell colSpan='3'>Git Repository</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {Object.keys(info).map(item =>
                  <Table.Row key={item}>
                    <Table.Cell collapsing>{item}</Table.Cell>
                    <Table.Cell>{info[item]}</Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </React.Fragment>
        ) : null}
      </Item>
    )
  }
}