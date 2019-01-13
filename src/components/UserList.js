import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements';
import { ScrollView, View, StyleSheet, ActivityIndicator } from 'react-native';
import { Button, Text } from 'native-base';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  loadMoreButton: {
    margin: 7
  },
  labelNoData: {
    fontSize: 12,
    color: 'grey',
    margin: 8
  }
});

// eslint-disable-next-line react/prefer-stateless-function
class LazyLoadComponent extends Component {
  render() {
    const { hasNextData, loadMore, isFetching } = this.props;
    if (isFetching) {
      return <ActivityIndicator style={styles.loadMoreButton} size="large" color="#0000ff" />;
    }
    return (
      <View>
        {hasNextData ? (
          <Button full style={styles.loadMoreButton} onPress={loadMore}>
            <Text>Load More</Text>
          </Button>
          ) : (
            <Text style={styles.labelNoData}>No more data to load.</Text>
        )}
      </View>
    );
  }
}

LazyLoadComponent.propTypes = {
  hasNextData: PropTypes.bool.isRequired,
  loadMore: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
};

class UserList extends Component {
  render() {
    const { users, canLoadMore, loading, loadMoreAction } = this.props;
    return (
      <ScrollView>
        <List>
          {
            users.map((item) => (
              <ListItem
                roundAvatar
                avatar={{ uri: item.avatar }}
                key={item.id}
                title={`${item.first_name} ${item.last_name}`}
              />
              ))
          }
        </List>
        <LazyLoadComponent 
          isFetching={loading}
          hasNextData={canLoadMore}
          loadMore={loadMoreAction} />
      </ScrollView>
      );
  }
}

UserList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  users: PropTypes.array,
  canLoadMore: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  loadMoreAction: PropTypes.func.isRequired
};

UserList.defaultProps = {
  users: []
};

export default UserList;
