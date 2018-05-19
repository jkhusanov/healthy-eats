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
      imagesLoaded: false,
      foodRecipe: null,
      API_URL: 'http://api.yummly.com',
      RES_SEARCH_URL: '/v1/api/recipe/',
      RECIPE_ID: foodID || null,
      APP_ID: 'eb4e23c7',
      RES_SEARCH_URL1: '&_app_key=',
      API_KEY: '851038fb4920d6b523e47c79320c858e',
      isLoading: false,

    };
  }
  componentDidMount(){
    this._getYummlyRecipe()
  }
  async _getYummlyRecipe() {
    const {API_URL, RES_SEARCH_URL, APP_ID, API_KEY, RECIPE_ID,} = this.state;
    this.setState({ imagesLoaded: true });

    try {
      let response = await fetch(`${API_URL}${RES_SEARCH_URL}${RECIPE_ID}?_app_id=${APP_ID}&_app_key=${API_KEY}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
        });
      
      let responseJSON = null

      if (response.status === 200) {
        responseJSON = await response.json();
        console.log("Preloaded", responseJSON)

        this.setState({
          imagesLoaded: false,
          foodRecipe: responseJSON.matches,
        })
        console.log(foodRecipe)
      } else {
        const error = responseJSON.message

        console.log(responseJSON)
        console.log(foodRecipe)
        this.setState({ errors: responseJSON.errors })
        // Alert.alert('Unable to get your feed', `Reason.. ${error}!`)
      }
    } catch (error) {
      this.setState({ foodRecipe: false, response: error })

      // console.log(error)

      // Alert.alert('Unable to get the feed. Please try again later')
    }
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
