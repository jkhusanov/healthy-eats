import { StackNavigator } from 'react-navigation';
import SavedRecipesScreen from '../screens/SavedRecipesScreen';
import FoodRecipeScreen from '../screens/FoodRecipeScreen';
import RecipeWebView from '../screens/RecipeWebView';


const SavedRecipeStack = StackNavigator({
  SavedRecipes: {
    screen: SavedRecipesScreen
  },
  FoodRecipe: {
    screen: FoodRecipeScreen
  },

  Recipe:{
    screen: RecipeWebView,
    headerMode: 'none',
  },
},
  {
    initialRouteName: 'SavedRecipes',
    
  }
);

export default SavedRecipeStack;
