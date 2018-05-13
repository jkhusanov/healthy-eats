import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';

export default class FoodListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Food List',
    headerTintColor: '#2F80ED',
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    headerStyle: { backgroundColor: '#FAFAFA', borderBottomWidth: 0.5, borderBottomColor: '#aaaaaa', },
  });
  constructor(props) {
    super(props)
    const ingredientsList = props.navigation.state.params && props.navigation.state.params.ingredientsList
    console.log("Correct ingredientsList: ", ingredientsList)
    this.state = {
      ingredientsList: ingredientsList || null,
      isLoading: false,

    };
  }
  render() {
    const {ingredientsList} = this.state
    console.log("Correct list: ", ingredientsList)

    return (
      <View style={styles.container}>
        <Text>This is FoodListScreen uses Yummly and it's snap carousel </Text>
        <Button
          title={'Get Recipe'}
          containerViewStyle={{ marginTop: 20 }}
          backgroundColor={'#c84343'}
          borderRadius={5}
          textStyle={{ color: 'white' }}
          onPress={() => this.props.navigation.navigate('FoodRecipe')}
        />
      </View>
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
