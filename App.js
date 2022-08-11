import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ColourPaletteScreen from './screens/ColourPaletteScreen';
import TriadicColourPaletteScreen from './screens/TradicColourPaletteScreen';
import HomeScreen from './screens/HomeScreen';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={HomeScreen}/>
        <Stack.Screen name='ColourPalette' component={ColourPaletteScreen}/>
        <Stack.Screen name='TriadicPalette' component={TriadicColourPaletteScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
