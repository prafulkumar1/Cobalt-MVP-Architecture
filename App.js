import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import "@/global.css";
import 'react-native-gesture-handler';
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@/source/views/login/loginUI';
import * as UI from '@/components/cobalt/importUI';
import { UseFormContextProvider } from '@/components/cobalt/event';
import MenuOrderScreen from './source/views/menuOrder/menuOrderUI';
import ProfitCenters from './source/views/ProfitCenters/ProfitCertersUI';
import ItemModifier from './source/views/ItemModifier/ItemModifierUI';
import MyCartScreen from './source/views/myCart/myCartUI';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Font from 'expo-font';
import CbLoader from './components/cobalt/cobaltLoader';
import MenuItems from './source/views/MenuItems';
import RecentordersScreen from './source/views/Recentorders/recentOrderUI';
import { loadAppConfigurations,loadPageConfig } from '@/source/constants/ConfigLoad';
import { getConfig } from '@/source/constants/LocalDatabase';
import * as SQLite from 'expo-sqlite';

// Global Configurations
// const appConfigJson = '[{"PageId":"Login","Controlls":[{"type":"backgroundImage","id":"loginBackground","styles":{"container":{"flex":1,"resizeMode":"cover","justifyContent":"center","alignItems":"center"}}},{"type":"VStack","id":"VStack1","space":"lg"},{"type":"text","id":"username","placeholder":"User Name/Member ID","labelText":"User Name","variant":"outline","errorMessage":"User Name is Requried.","isDisabled":0,"isInvalid":0,"isReadOnly":0,"isRequired":1},{"type":"password","id":"password","placeholder":"Password","labelText":"Password","variant":"underlined","errorMessage":"Password is Requried.","isDisabled":0,"isInvalid":0,"isReadOnly":0,"isRequired":1},{"type":"checkbox","id":"rememberme","labeltext":"Remember Me"},{"type":"select","id":"department","placeholder":"Department","labelText":"Select Department","options":[{"label":"Dining","value":"dining"},{"label":"Golf","value":"golf"},{"label":"Tennis","value":"tennis"},{"label":"Pool","value":"pool"}]},{"type":"radioButton","id":"gender","alignment":"Horizontal","labelText":"Gender","options":[{"label":"Male","value":"male"},{"label":"Female","value":"female"},{"label":"Others","value":"others"}]},{"type":"button","id":"login","text":"Login","variant":"","backgroundColor":"white","borderRadius":"40"},{"id":"cancel","text":"Cancel","variant":"","backgroundColor":"white","borderRadius":"40"}]}]';
// global.appConfigJsonArray = typeof appConfigJson === 'string' ? JSON.parse(appConfigJson) : appConfigJson;
// global.controlsConfigJson = [];

const Stack = createNativeStackNavigator();

export default function App() {

  const [configLoaded, setConfigLoaded] = useState(false);

const fetchConfig = async () => {
  await loadAppConfigurations();
  global.controlsConfigJson = await loadPageConfig("Header");
  setConfigLoaded(true);
};

useEffect(() => {
  fetchConfig();
}, []);

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'SourceSansPro_Black': require('./assets/fonts/SourceSansPro-Black.otf'),
        'SourceSansPro_BlackItalic': require('./assets/fonts/SourceSansPro-BlackIt.otf'),
        'SourceSansPro_Bold': require('./assets/fonts/SourceSansPro-Bold.otf'),
        'SourceSansPro_BoldItalic': require('./assets/fonts/SourceSansPro-BoldIt.otf'),
        'SourceSansPro_ExtraLight': require('./assets/fonts/SourceSansPro-ExtraLight.otf'),
        'SourceSansPro_ExtraLightItalic': require('./assets/fonts/SourceSansPro-ExtraLightIt.otf'),
        'SourceSansPro_Italic': require('./assets/fonts/SourceSansPro-It.otf'),
        'SourceSansPro_Light': require('./assets/fonts/SourceSansPro-Light.otf'),
        'SourceSansPro_LightItalic': require('./assets/fonts/SourceSansPro-LightIt.otf'),
        'SourceSansPro_Regular': require('./assets/fonts/SourceSansPro-Regular.otf'),
        'SourceSansPro_SemiBold': require('./assets/fonts/SourceSansPro-Semibold.otf'),
        'SourceSansPro_SemiBoldItalic': require('./assets/fonts/SourceSansPro-SemiboldIt.otf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

   // Load Profit Center Name Before Rendering Navigation
  if (!fontsLoaded || !configLoaded) {
    return (
      <CbLoader />
    );
  }
 
  
  return (
    <GluestackUIProvider mode="light">
      <UseFormContextProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="ProfitCenters"
              screenOptions={({ route, navigation }) => ({
                ...UI.CbHeaderBackground("HeaderBackground"),
                headerLeft: () => (
                  <UI.CbBackButton id='BackButton' navigation={navigation} />
                ),
                headerTitleAlign: 'left',
                ...UI.CbHeaderTitle("HeaderTitle",route.name === "MenuOrder" ? route?.params?.profileCenterTile : route.name),
                headerRight: () => {
                  const showHomeButton = route.params?.showHomeButton;
                  if (route.name === "ProfitCenters" || showHomeButton) {
                    return <UI.CbHomeButton id="HomeButton" navigation={navigation} />;
                  }
                  return null;
                },
               
              })}
            >
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
                <Stack.Screen
                name="MenuItems"
                component={MenuItems}
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
              name="ItemModifier"
              component={ItemModifier}
              options={{
                headerShown: true,
                title: "Back to Menu"
              }}
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
  menuTitle: {
    fontSize: 22,
    color: "#4B5154",
    fontWeight: "500",

  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle:{ flex: 1, alignItems: 'flex-start' }
});
