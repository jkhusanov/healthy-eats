import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { ImagePicker } from 'expo';
import { Entypo, Ionicons } from '@expo/vector-icons';


export default class TakePictureScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Take Picture',
    headerTintColor: '#2F80ED',
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    headerStyle: { backgroundColor: '#FAFAFA', borderBottomWidth: 0.5, borderBottomColor: '#aaaaaa', },
  });
  state = {
    image: null,
  };
  componentDidMount () {
    process.nextTick = setImmediate;
    this.clarifaiCall()
  } 

  clarifaiCall() {
    const Clarifai = require('clarifai');

    const app = new Clarifai.App({ apiKey: 'a751e448217d4364a555a0e2d6d59006' });
    app.models.predict(Clarifai.FOOD_MODEL, "https://samples.clarifai.com/food.jpg").then(
      function (response) {
        // do something with response
        console.log(response)
      },
      function (err) {
        // there was an error
      }
    );

  }

  getCameraAsync = async (mediaType) => {
    const { Permissions } = Expo;
    const permissionMethod = (mediaType === 'camera'
      ? Permissions.CAMERA
      : Permissions.CAMERA_ROLL);

    const { status } = await Permissions.askAsync(permissionMethod);
    if (status === 'granted') {
      return this._pickImage(mediaType);
    } else {
      throw new Error('Camera permission not granted');
    }
  }
  _pickImage = async (mediaType) => {
    const mediaMethod = (mediaType === 'camera'
      ? ImagePicker.launchCameraAsync
      : ImagePicker.launchImageLibraryAsync);

    let result = await mediaMethod({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  render() {
    let { image } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.imageShareContainer}>
          <View style={styles.uploadImageContainer}>
            <TouchableOpacity onPress={() => this.getCameraAsync('library')}>
              <Ionicons
                name='md-image'
                size={45}
                color='#2F80ED'
                style={styles.photoPostIcon}
              />
              <Text style={styles.photoLabel}>Upload from library</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.uploadImageContainer}>
            <TouchableOpacity onPress={() => this.getCameraAsync('camera')}>
              <Ionicons
                name='ios-camera'
                size={45}
                color='#2F80ED'
                style={styles.photoPostIcon}
              />
              <Text style={styles.photoLabel}>Take a photo</Text>
            </TouchableOpacity>
          </View>
        </View>
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        <Button
          title={'Navigate to result'}
          containerViewStyle={{ marginTop: 20 }}
          backgroundColor={'#c84343'}
          borderRadius={5}
          textStyle={{ color: 'white' }}
          onPress={() => this.props.navigation.navigate('RecognitionResult')}
        // onPress={this.getCameraAsync}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  imageShareContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  uploadImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoPostIcon: {
    alignSelf: 'center',
  },
  photoLabel: {
    color: '#737373'
  },
});
