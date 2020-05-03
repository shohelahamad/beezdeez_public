import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';

class DiscoverScreen extends React.Component {
    state = {
      search: '',
    };
  
    updateSearch = search => {
      this.setState({ search });
    };
  
    render() {
      const { search } = this.state;
  
      return (
        <SearchBar
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={search}
        />
      );
    }
  }

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default DiscoverScreen;