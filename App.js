import { StatusBar } from 'expo-status-bar';
import "@/global.css";
import 'react-native-gesture-handler';
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@/source/views/login/loginUI';
import { UseFormContextProvider } from '@/components/cobalt/event';
import MenuOrderScreen from './source/views/menuOrder/menuOrderUI';

// Global Configurations
const appConfigJson = '[{"PageId":"Login","Controlls":[{"type":"backgroundImage","id":"loginBackground","styles":{"container":{"flex":1,"resizeMode":"cover","justifyContent":"center","alignItems":"center"}}},{"type":"VStack","id":"VStack1","space":"lg"},{"type":"text","id":"username","placeholder":"User Name/Member ID","labelText":"User Name","variant":"outline","errorMessage":"User Name is Requried.","isDisabled":0,"isInvalid":0,"isReadOnly":0,"isRequired":1},{"type":"password","id":"password","placeholder":"Password","labelText":"Password","variant":"underlined","errorMessage":"Password is Requried.","isDisabled":0,"isInvalid":0,"isReadOnly":0,"isRequired":1},{"type":"checkbox","id":"rememberme","labeltext":"Remember Me"},{"type":"select","id":"department","placeholder":"Department","labelText":"Select Department","options":[{"label":"Dining","value":"dining"},{"label":"Golf","value":"golf"},{"label":"Tennis","value":"tennis"},{"label":"Pool","value":"pool"}]},{"type":"radioButton","id":"gender","alignment":"Horizontal","labelText":"Gender","options":[{"label":"Male","value":"male"},{"label":"Female","value":"female"},{"label":"Others","value":"others"}]},{"type":"button","id":"login","text":"Login","variant":"","backgroundColor":"white","borderRadius":"40"},{"id":"cancel","text":"Cancel","variant":"","backgroundColor":"white","borderRadius":"40"}]}]';
global.appConfigJsonArray = typeof appConfigJson === 'string' ? JSON.parse(appConfigJson) : appConfigJson;
global.controlsConfigJson = [];


const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <GluestackUIProvider mode="light">
        <UseFormContextProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="MenuOrder">
            <Stack.Screen 
              name="Login" 
              component={LoginScreen} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="MenuOrder" 
              component={MenuOrderScreen} 
              options={{ headerShown: false }} 
            />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
        </UseFormContextProvider>
      </GluestackUIProvider>
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
