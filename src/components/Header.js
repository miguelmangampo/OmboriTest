import React, { Component } from 'react';
import { Header, Left, Title, Body, Right } from 'native-base';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
class DefaultHeader extends Component {
  render() {
    const { leftComponent, rightComponent, title } = this.props;
    return (
      <Header>
        {leftComponent ? (
          <Left>
            {leftComponent}
          </Left>) : null}
        <Body>
          <Title>{title}</Title>
        </Body>
        {rightComponent ? (
          <Right>
            {rightComponent}
          </Right>) : null}
      </Header>
    );
  }
}

DefaultHeader.propTypes = {
  leftComponent: PropTypes.element,
  rightComponent: PropTypes.element,
  title: PropTypes.string.isRequired
};

DefaultHeader.defaultProps = {
  leftComponent: null,
  rightComponent: null
};

export default DefaultHeader;
