import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Alert, StatusBar } from 'react-native';

import Onboarding from 'react-native-onboarding-swiper'; // Version can be specified in package.json
import TACO from '../../assets/firstPhoto.png';
import SUSHI from '../../assets/secondPhoto.png';
import SALAD from '../../assets/thirdPhoto.png';


const OnBoard = ({navigation}) => (
    <Onboarding
      onSkip={() =>navigation.navigate('HomeTabs') }
      onDone={()  => navigation.navigate('HomeTabs') }
      pages={[
        {
          backgroundColor: '#fff',
          image: <Image source={TACO}  style={styles.logo}/>,
          title: 'Discover what is in your food',
          subtitle: 'Our smart camera analyzes the ingredients! :)',
        },
        
        {
          textColor: 'red',
          title: 'Choose a Recipe',
          backgroundColor: '#fff',
          image: <Image source={SUSHI} style={styles.logo}/>,
          subtitle: 'Choose your favorite food, and see full details on the preparation.',
          
        
        },
        
        {
            title: 'Cook it with Ease and Enjoy!',
            backgroundColor: '#fff',
            image: <Image source={SALAD} style={styles.logo}/>,
            subtitle: 'Your food is ready.',
          
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