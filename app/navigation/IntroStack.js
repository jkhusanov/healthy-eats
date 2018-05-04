import { StackNavigator } from 'react-navigation';

import IntroScreen from '../screens/IntroScreen';

const IntroStack = StackNavigator({
  Intro: {
    screen: IntroScreen,
  },
},



);
export default IntroStack;
