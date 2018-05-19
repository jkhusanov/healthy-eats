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
  constructor(props) {
    super(props)
    const foodID = props.navigation.state.params && props.navigation.state.params.foodID
    console.log("Correct foodID: ", foodID)
    this.state = {
      // imagesLoaded: false,
      // foodImages: null,
      // API_URL: 'http://api.yummly.com',
      // RES_SEARCH_URL: '/v1/api/recipes?',
      // APP_ID: 'eb4e23c7',
      // RES_SEARCH_URL1: '&_app_key=',
      // API_KEY: '851038fb4920d6b523e47c79320c858e',
      // search: ingredientsList[0] || null,
      // allowedIngredient: ingredientsList || null,
      // picture: '&requirePictures=true',
      // isLoading: false,

    };
  }
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
