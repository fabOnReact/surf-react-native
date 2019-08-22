import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Left, Right } from 'native-base';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

export default class ListExample extends Component {

  _renderItem(height, i) {
    const { days } = this.props.data
    return (
      <ListItem>
        <Text>{ days[i] }</Text>
        <Text>{ height } mt</Text>
      </ListItem>
    )
  }

  render() {
    const { waveHeight } = this.props.data
    return (
      <Container>
        <Content>
          <List>
            { waveHeight.map((row, index) => this._renderItem(row, index)) }
          </List>
        </Content>
      </Container>
    );
  }
}
