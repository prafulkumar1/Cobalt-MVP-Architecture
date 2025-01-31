import { StatusBar } from 'expo-status-bar';
import "@/global.css";
import 'react-native-gesture-handler';
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@/source/views/login/loginUI';
import RecentordersScreen from '@/source/views/Recentorders/recentorders';
import * as UI from '@/components/cobalt/importUI';
import { UseFormContextProvider } from '@/components/cobalt/event';
import MenuOrderScreen from './source/views/menuOrder/menuOrderUI';
import ProfitCenters from './source/views/ProfitCenters/ProfitCertersUI';
import ItemData from './source/views/ItemData/ItemData';import MyCartScreen from './source/views/myCart/myCartUI';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Global Configurations
const appConfigJson = '[{"PageId":"Login","Controlls":[{"type":"backgroundImage","id":"loginBackground","styles":{"container":{"flex":1,"resizeMode":"cover","justifyContent":"center","alignItems":"center"}}},{"type":"VStack","id":"VStack1","space":"lg"},{"type":"text","id":"username","placeholder":"User Name/Member ID","labelText":"User Name","variant":"outline","errorMessage":"User Name is Requried.","isDisabled":0,"isInvalid":0,"isReadOnly":0,"isRequired":1},{"type":"password","id":"password","placeholder":"Password","labelText":"Password","variant":"underlined","errorMessage":"Password is Requried.","isDisabled":0,"isInvalid":0,"isReadOnly":0,"isRequired":1},{"type":"checkbox","id":"rememberme","labeltext":"Remember Me"},{"type":"select","id":"department","placeholder":"Department","labelText":"Select Department","options":[{"label":"Dining","value":"dining"},{"label":"Golf","value":"golf"},{"label":"Tennis","value":"tennis"},{"label":"Pool","value":"pool"}]},{"type":"radioButton","id":"gender","alignment":"Horizontal","labelText":"Gender","options":[{"label":"Male","value":"male"},{"label":"Female","value":"female"},{"label":"Others","value":"others"}]},{"type":"button","id":"login","text":"Login","variant":"","backgroundColor":"white","borderRadius":"40"},{"id":"cancel","text":"Cancel","variant":"","backgroundColor":"white","borderRadius":"40"}]}]';
global.appConfigJsonArray = typeof appConfigJson === 'string' ? JSON.parse(appConfigJson) : appConfigJson;
global.controlsConfigJson = [];


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GluestackUIProvider mode="light">
      <UseFormContextProvider>
        <GestureHandlerRootView>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="ProfitCenters"
              screenOptions={({ route, navigation }) => ({
                headerLeft: () => (
                  <UI.CbBackButton navigation={navigation} />
                ),
                headerTitle: () => {
                  if (route.name == "MenuOrder") {
                    return (
                      <Text style={styles.menuTitle}>{route?.params?.profileCenterTile}</Text>
                    )
                  } else {
                    return (
                      <Text style={styles.menuTitle}>{route.name}</Text>
                    )
                  }
                },
                headerRight: () => {
                  const value = route.params?.showHomeButton
                  if (value) {
                    return (
                      <UI.CbHomeButton navigation={navigation} />
                    )
                  }
                },
                headerTitleStyle: {
                  color: "#4B5154",
                  fontSize: 22,
                },
              })}  >
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ProfitCenters"
                component={ProfitCenters}
                options={{
                  headerShown: true,
                  headerTitle: "Food Ordering",
                }}
              />
              <Stack.Screen
                name="MenuOrder"
                component={MenuOrderScreen}
              />
              <Stack.Screen
                name="Recentorders"
                component={RecentordersScreen}
              options={{ headerShown: true,
                headerTitle: "Order Again",
               }} 
            />
             <Stack.Screen 
              name="ItemData" 
              component={ItemData} 
              options={{ headerShown: true}} 
              />
              <Stack.Screen
                name="MyCart"
                component={MyCartScreen}
                options={{ headerShown: true, headerTitle: "My Cart" }}
              />
            </Stack.Navigator>
            <StatusBar style="auto" />
          </NavigationContainer>
        </GestureHandlerRootView>
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
  menuTitle:{fontSize:22,color:"#4B5154",fontWeight:"500"}
});
