import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, Alert, ImageEditor, ImageStore } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { ImagePicker, LinearGradient } from 'expo';
import { Entypo, Ionicons } from '@expo/vector-icons';
import Clarifai from 'clarifai'


export default class RecognitionResultScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Clarified',
    headerTintColor: '#2F80ED',
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    headerStyle: { backgroundColor: '#FAFAFA', borderBottomWidth: 0.5, borderBottomColor: '#aaaaaa', },
  });
  constructor(props) {
    super(props)
    const foodImage = props.navigation.state.params && props.navigation.state.params.foodImage
    this.state = {
      isLoading: false,
      foodImage: foodImage || null,
    };
  }
  componentWillMount() {
    process.nextTick = setImmediate;
    this.clarifaiCall()
  }

  async clarifaiCall() {
    this.setState({ isLoading: true })
    const { foodImage } = this.state
    // console.log(foodImage)



    const Clarifai = require('clarifai');
    let responseJSON = null;

    const app = new Clarifai.App({ apiKey: 'a751e448217d4364a555a0e2d6d59006' });
    app.models.predict(Clarifai.FOOD_MODEL, { base64: foodImage.base64 }).then(
      async response => {
        // do something with response
        console.log(response)
        responseJSON = response
        // console.log("should be object ", responseJSON)
        this.setState({
          isLoading: false,
          prediction: responseJSON.outputs[0]
        })
      },
      function (err) {
        // there was an error
        console.log(err)
        Alert.alert('Unable to get you food ingredients', `Reason.. ${err.status.description}!`)

      }
    );

  }

  loadingView = () => {
    return (
      <LinearGradient colors={['#DAE2F8', '#D6A4A4']} style={styles.loadingView}>
        <View style={styles.activityIndicatorAndButtonContainer}>
          <ActivityIndicator size="large" />
        </View>
      </LinearGradient>
    )
  }

  displayValue(ingredient, index) {
    return (
      <View
        key={index}>
        <Text>{ingredient.name} {ingredient.value}%</Text>
        {console.log(ingredient.name)}
      </View>
    )
  }
  predictionEdit = (prediction) => {
    return (
    <View styles={{flex: 1}}>
      {
        prediction.data.concepts.map((ingredient, index) => {
          this.displayValue(ingredient, index)
        })
      }
    </View>
    )

  }
  predictionResult = () => {
    const { prediction, isLoading } = this.state

    let { foodImage } = this.state;
    console.log("parsed " + prediction.data.concepts[1].name)
    return (
      <View style={styles.container}>
        <Text style={{ paddingBottom: 50 }}>This is RecognitionResultScreen uses Clarifai</Text>
        {foodImage &&
          <Image source={{ uri: foodImage.uri }} style={{ width: 200, height: 200 }} />}
        <View>
          <Text>{prediction.data.concepts[0].name}: {prediction.data.concepts[0].value.toPrecision(3)}%</Text>
            <Text>{prediction.data.concepts[1].name}: {prediction.data.concepts[1].value.toPrecision(3)}%</Text>
            <Text>{prediction.data.concepts[2].name}: {prediction.data.concepts[2].value.toPrecision(3)}%</Text>
            <Text>{prediction.data.concepts[3].name}: {prediction.data.concepts[3].value.toPrecision(3)}%</Text>
            <Text>{prediction.data.concepts[4].name}: {prediction.data.concepts[4].value.toPrecision(3)}%</Text>
            <Text>{prediction.data.concepts[5].name}: {prediction.data.concepts[5].value.toPrecision(3)}%</Text>
          {/* {this.predictionEdit(prediction)} */}
          <Text>Much more coming soon...</Text>
        </View>
        <Button
          title={'Get Food based on ingredients'}
          containerViewStyle={{ marginTop: 20 }}
          backgroundColor={'#c84343'}
          borderRadius={5}
          textStyle={{ color: 'white' }}
          onPress={() => this.props.navigation.navigate('FoodList')}
        />

      </View>

    );
  }
  render() {
    const { prediction, isLoading } = this.state
    console.log(isLoading)
    return (
      (isLoading ? this.loadingView() : this.predictionResult())
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
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
