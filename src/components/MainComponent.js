import React, { Component } from 'react';
import { Container } from 'native-base';
import { Animated } from 'react-native';
import Header from './Header';
import PropTypes from 'prop-types';
import PulseLoader from './PulseLoader';
import UserList from './UserList';
import * as UsersAction from '../actions/UsersAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const AnimatedPulse = Animated.createAnimatedComponent(PulseLoader);

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pulseOpacity: new Animated.Value(1),
      isLoaded: false
    };
  }
  async componentDidMount() {
    await this.props.loadUsersAction();

    Animated.timing(this.state.pulseOpacity, {
      toValue: 0,
      duration: 3000
    }).start(() => this.setState({ isLoaded: true }));
  }
  render() {
    const {
      users,
      loading,
      currentPage,
      totalPages,
      loadUsersAction
    } = this.props;
    const { pulseOpacity, isLoaded } = this.state;
    const nextPage = currentPage + 1;
    return (
      <Container>
        <Header title="Users" />
        {!isLoaded && (
          <AnimatedPulse
            borderColor="#A9DFBF"
            backgroundColor="#A9DFBF"
            dotBackgroundColor="#229954"
            size={20}
            opacity={pulseOpacity}
          />
        )}
        {isLoaded && (
          <UserList
            users={users || []}
            loading={loading}
            canLoadMore={currentPage < totalPages}
            loadMoreAction={() => loadUsersAction(nextPage, users)}
          />
        )}
      </Container>
    );
  }
}

MainContainer.propTypes = {
  loadUsersAction: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
  const {
    users,
    loading,
    currentPage,
    totalPages,
    error
  } = state.UsersReducer;
  return {
    users,
    loading,
    currentPage,
    totalPages,
    error
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      loadUsersAction: UsersAction.loadUsers
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer);
