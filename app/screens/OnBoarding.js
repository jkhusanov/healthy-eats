import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Alert, StatusBar } from 'react-native';

import Onboarding from 'react-native-onboarding-swiper'; // Version can be specified in package.json
import TACO from '../../assets/taco.jpg';
import SUSHI from '../../assets/sushi.png';
import SALAD from '../../assets/salad.png';


const OnBoard = ({navigation}) => (
    <Onboarding
      onSkip={() =>navigation.navigate('HomeTabs') }
      onDone={()  => navigation.navigate('HomeTabs') }
      pages={[
        {
          backgroundColor: '#03A9F4',
          image: <Image source={TACO}  style={styles.logo}/>,
          title: 'Discover what is in your food',
          subtitle: 'We will help you find delicious food :)',
        },
        
        {
          title: 'Create Recipies with Ease',
          backgroundColor: '#2B2E4A',
          image: <Image source={SUSHI} style={styles.logo}/>,
          subtitle: 'Our smart camera analyzes the ingredients!',
        
        },
        
        {
            title: 'Have fun!',
            backgroundColor: '#E84545',
            image: <Image source={SALAD} style={styles.logo}/>,
            subtitle: '',
          
        }
    ]}
  />
);
const styles = StyleSheet.create({
    logo: {
      resizeMode: 'contain',
      width: 250,
      height: 250,
      
    },
  });

  export default OnBoard;