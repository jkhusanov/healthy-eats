import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class FoodRecipeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Recipe',
    headerTintColor: '#2F80ED',
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    headerStyle: { backgroundColor: '#FAFAFA', borderBottomWidth: 0.5, borderBottomColor: '#aaaaaa', },
  });
  render() {
    return (
      <View style={styles.container}>
        <Text>This is FoodRecipeScreen uses Yummly </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
