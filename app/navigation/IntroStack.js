import { StackNavigator } from 'react-navigation';

import IntroScreen from '../screens/IntroScreen';
import Onboarding from 'react-native-onboarding-swiper';
import OnBoardScreen from '../screens/OnBoarding';

const IntroStack = StackNavigator({
  Intro: {
    //screen: OnBoardScreen,
    screen: IntroScreen,
  },
},



);
export default IntroStack;
