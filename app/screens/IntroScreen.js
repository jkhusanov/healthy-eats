import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Onboarding from 'react-native-onboarding-swiper';
import OnBoard from '../screens/OnBoarding';



export default class IntroScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <OnBoard navigation={this.props.navigation}/> 

      // <View style={styles.container}>
      //   <Text>This is IntroScreen with Slider</Text>
      //   <Button
      //     title={'Get Started'}
      //     containerViewStyle={{ marginTop: 20 }}
      //     backgroundColor={'#c84343'}
      //     borderRadius={5}
      //     textStyle={{ color: 'white' }}
      //     onPress={() => this.props.navigation.navigate('HomeTabs')}
      //   />
      // </View>
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
