import { StackNavigator } from 'react-navigation';

import TakePictureScreen from '../screens/TakePictureScreen';
import RecognitionResultScreen from '../screens/RecognitionResultScreen';
import FoodListScreen from '../screens/FoodListScreen';
import FoodRecipeScreen from '../screens/FoodRecipeScreen';

const CameraStack = StackNavigator({
  Camera: {
    screen: TakePictureScreen,
  },
  RecognitionResult: {
    screen: RecognitionResultScreen,
  },
  FoodList: {
    screen: FoodListScreen,
  },
  FoodRecipe: {
    screen: FoodRecipeScreen,
  },

},
  {
    initialRouteName: 'Camera',
  }
);
export default CameraStack;
