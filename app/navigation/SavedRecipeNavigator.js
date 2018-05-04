import { StackNavigator } from 'react-navigation';
import SavedRecipeStack from './SavedRecipeStack';



const SavedRecipeNavigator = StackNavigator({
  SavedRecipeStack: {
    screen: SavedRecipeStack
  },
  
}, {
  initialRouteName: 'SavedRecipeStack',
  mode: 'modal',
  headerMode: 'none',
  navigationOptions: {
    gesturesEnabled: false,
  },
});

export default SavedRecipeNavigator;