import React from 'react';
import { StyleSheet, Modal, ScrollView, Text, View, Image, TouchableOpacity,TouchableHighlight, ActivityIndicator, Alert, Dimensions } from 'react-native';
import { Button, Icon, Tile } from 'react-native-elements';
import { ImagePicker, LinearGradient } from 'expo';
import { Entypo, Ionicons } from '@expo/vector-icons';
//import Popup from "reactjs-popup";
//import ReactDom from 'react-dom';
import Clarifai from 'clarifai'

import FOODCHART1 from '../../assets/seasonal1.png';
import FOODCHART2 from '../../assets/seasonal2.png';

const { width } = Dimensions.get('window');

export default class TakePictureScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Take a Picture',
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
      modalVisible: false,
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
//   state = {
//     modalVisible: false,
//  }
  toggleModal(visible) {
    this.setState({ modalVisible: visible });
 }
  loadingView = () => {
    return (
      <LinearGradient colors={['#ddd6f3', '#D6A4A4']} style={styles.loadingView}>
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
    
    var date, hour, greeting, modalClick;
    date = new Date();
    hour = date.getHours();
    if (hour => 12) {greeting = "Good Afternoon! 😊"}
    else if (hour => 18){ greeting = "Good Evening! 😊"}
    else if (hour <= 11) {greeting = "Good Morning! 😊"}
    modalClick = "What's in Season?"
    return (
      <LinearGradient colors={['#ddd6f3', '#faaca8']} style={styles.container}>
    
      <Text style={styles.timeGreeting}> {greeting} {"\n\n"}
      <TouchableOpacity 
        onPress={() => {this.toggleModal(true)}}>
        <Text style = {styles.modalButton}>{"   "+modalClick+"  "} </Text>
        <Text>{"\n\n\n\n\n\n\n\n"}</Text>
      </TouchableOpacity> {/*button to open modal*/}
      </Text>
        
        {/*start modal handling, only if open*/}
        <Modal 
        //animationType = {"slide"} transparent = {false}
        visible = {this.state.modalVisible}
        onRequestClose = {() =>{ console.log("Modal has been closed.") } }>
          <ScrollView contentContainerStyle = {styles.modal}>
         {/*<Text style = {styles.modalOpen}>Pop Up Info Panel!</Text>*/}
            <TouchableHighlight onPress = {() => {
                this.toggleModal(!this.state.modalVisible)}}>
                <Text style = {styles.closeModal}>Back to Main Screen</Text>
              </TouchableHighlight>
              <Image style={styles.foodChart} source={FOODCHART1}/>
              <Image style={styles.foodChart} source={FOODCHART2}/>
              <Text style = {styles.creditTo}>Source: The Krazy Coupon Lady</Text>
          </ScrollView>
        </Modal>{/* end modal handling*/}

      {/* <TouchableOpacity 
        onPress={() => {this.toggleModal(true)}}>
        <Text style = {styles.modalButton}>Seasonal Produce</Text>
      </TouchableOpacity> button to open modal */}


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
    justifyContent: 'center',
    color: 'white',
    fontSize: 27,
    fontWeight: 'bold',
  },
  modalButton:{
    alignSelf: 'center',
    marginLeft: 30, //fix
    color: 'white',
    padding: 5,
    fontSize: 17,
    fontWeight: 'bold',
    borderRadius: 14,
    borderColor: 'white',
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  modal:{
    justifyContent: 'center',
    backgroundColor:'#faaca8',
  },
  foodChart:{
    alignSelf: 'center',
    padding: 20,
  },
  modalOpen:{
    marginTop: 30,
    alignSelf: 'center'
  },
  closeModal:{
    marginTop: 50,
    marginBottom: 10,
    alignSelf: 'center',
    color: 'white',
    padding: 5,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  creditTo:{
    fontSize: 10,
    marginLeft: 50,
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
    //color: '#737373'
    color: 'white'
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
  button: {
    margin: 15,
    padding: 10,
    borderRadius: 10,
    borderColor: "transparent",
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
    backgroundColor: '#ff6666'
  },
});
