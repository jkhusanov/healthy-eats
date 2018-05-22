import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, Alert, Dimensions } from 'react-native';
import { Button, Icon, Tile } from 'react-native-elements';
import { ImagePicker, LinearGradient } from 'expo';
import { Entypo, Ionicons } from '@expo/vector-icons';
import Clarifai from 'clarifai'

const { width } = Dimensions.get('window');

export default class TakePictureScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Take Picture',
    headerTintColor: '#2F80ED',
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    headerStyle: { backgroundColor: '#DAE2F8', borderBottomWidth: 0.5, borderBottomColor: '#aaaaaa', },
  });
  
  constructor(props) {
    super(props)
    this.state = {
      image: null,
      isLoading: false,
    };
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
      throw new Error('Camera and Photo permission not granted');
    }
  }
  _pickImage = async (mediaType) => {
    const { navigate } = this.props.navigation

    const mediaMethod = (mediaType === 'camera'
      ? ImagePicker.launchCameraAsync
      : ImagePicker.launchImageLibraryAsync);

    let result = await mediaMethod({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    console.log(result);


    if (!result.cancelled) {
      this.setState({ image: result});
      navigate('RecognitionResult', { foodImage: result })
    }
  };

  loadingView = () => {
    return (
      <LinearGradient colors={['#DAE2F8', '#D6A4A4']} style={styles.loadingView}>
        <View style={styles.activityIndicatorAndButtonContainer}>
          <ActivityIndicator size="large" />
        </View>
      </LinearGradient>
    )
  }
  photoSend() {
    const { isLoading } = this.state
    const { navigate } = this.props.navigation
    let { image } = this.state;
    
    var date, hour, greeting;
    date = new Date();
    
    hour = date.getHours();
    
    
    return (
      <LinearGradient colors={['#fff', '#fff']} style={styles.container}>
     
      <Text style={styles.timeGreeting}> Test {hour}{"\n\n\n\n\n\n\n\n\n"}</Text>
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
        <Tile
          imageSrc={{ uri: image.uri }}
          imageContainerStyle={styles.imageStyle}
          title={'Recent food'}
          titleStyle={styles.nameLabel}
          featured
          activeOpacity={0.6}
          caption={'Analyze it again'}
          captionStyle={styles.foodCaptionStyle}
          containerStyle={styles.imageContainer}
          onPress={() => navigate('RecognitionResult', { foodImage: image })}
        >
        </Tile>}
      </LinearGradient>
    )
  }

  render() {

    const { prediction, isLoading } = this.state
    console.log(isLoading)
    return (
       (isLoading ? this.loadingView() : this.photoSend())
     
     
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
  timeGreeting:{
    alignSelf: 'center',
    fontSize: 22,
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
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    paddingVertical: 35,

  },
  imageStyle: {
    height: width / 1.5,
    width: width / 1.2,
    borderRadius: 25,
  },
  nameLabel: {
    fontSize: 30,
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    fontWeight: 'bold'
  }, 
  foodCaptionStyle: {
    fontSize: 18,
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: { width: -2, height: 1 },
    textShadowRadius: 5,
  },
});
