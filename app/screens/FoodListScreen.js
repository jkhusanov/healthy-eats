import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Platform,
  Dimensions,
  DeviceEventEmitter,
  Alert,
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import { LinearGradient } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import FavSlide from '../components/FavSlide';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

const sliderWidth = viewportWidth;
const itemWidth = slideWidth + itemHorizontalMargin * 2;

export default class FoodListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Food List',
    headerTintColor: '#2F80ED',
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    headerStyle: { backgroundColor: '#FAFAFA', borderBottomWidth: 0.5, borderBottomColor: '#aaaaaa', },
  });
  constructor(props) {
    super(props)
    const ingredientsList = props.navigation.state.params && props.navigation.state.params.ingredientsList
    console.log("Correct ingredientsList: ", ingredientsList)
    this.state = {
      imagesLoaded: false,
      foodImages: null,
      API_URL: 'http://api.yummly.com',
      RES_SEARCH_URL: '/v1/api/recipes?',
      APP_ID: 'eb4e23c7',
      RES_SEARCH_URL1: '&_app_key=',
      API_KEY: '851038fb4920d6b523e47c79320c858e',
      search: ingredientsList[0] || null,
      allowedIngredient: ingredientsList || null,
      picture: '&requirePictures=true',
      isLoading: false,

    };
  }
  componentDidMount() {
    //When the component is loaded
    this._getYummlyImages()

  }
  
  async _getYummlyImages() {
    const {API_URL, RES_SEARCH_URL, APP_ID, API_KEY, search, allowedIngredient, picture } = this.state;
    this.setState({ imagesLoaded: true });
    console.log(search)
    try {
      let searchItems = `&allowedIngredient[]=${allowedIngredient[0]}`
      for(let i = 0; i < allowedIngredient.length && i<5; i++) {
        if(allowedIngredient[i] != 'chicken' && allowedIngredient[i]!='pork' && allowedIngredient[i]!='beef') {
          searchItems += `&allowedIngredient[]=${allowedIngredient[i]}`
        }
      }
      console.log(searchItems)
      let response = await fetch(`${API_URL}${RES_SEARCH_URL}_app_id=${APP_ID}&_app_key=${API_KEY}${searchItems}${picture}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
        });

      let responseJSON = await response.json();

      if (response.status === 200) {
        console.log("Preloaded", responseJSON)
        // console.log("MATCHES-LENGTH", responseJSON.matches.length)

        if (typeof responseJSON.matches != 'undefined' && responseJSON.matches.length > 0) {
          foodImages = responseJSON
          console.log(foodImages)
        }
        // console.log("not loaded food",foodImages)
      } else {
        const error = responseJSON.message

        console.log(responseJSON)
        console.log(imagesLoaded)
        this.setState({ errors: responseJSON.errors })
        // Alert.alert('Unable to get your feed', `Reason.. ${error}!`)
      }
    } catch (error) {
      this.setState({ imagesLoaded: false, response: error })

      console.log(error)

      // Alert.alert('Unable to get the feed. Please try again later')
    }
  }

  render() {
    const {ingredientsList} = this.state
    // console.log("Correct list: ", ingredientsList)

    return (
      <View style={styles.container}>
        <Text>This is FoodListScreen uses Yummly and it's snap carousel </Text>
        <Button
          title={'Get Recipe'}
          containerViewStyle={{ marginTop: 20 }}
          backgroundColor={'#c84343'}
          borderRadius={5}
          textStyle={{ color: 'white' }}
          onPress={() => this.props.navigation.navigate('FoodRecipe')}
        />
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
