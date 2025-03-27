import { registerRootComponent } from 'expo';
import { AppRegistry } from 'react-native';
import App from './App';
import { LogBox } from 'react-native';
import RecentordersScreen from './source/views/Recentorders/recentOrderUi';
 
if (__DEV__) {
  LogBox.ignoreAllLogs(); // Hides all logs (warnings and errors)
}
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
AppRegistry.registerComponent('button', () => App);
AppRegistry.registerComponent('Recentorders', () => RecentordersScreen);

registerRootComponent(App);
