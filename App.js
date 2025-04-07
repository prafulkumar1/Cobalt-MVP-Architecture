import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import "@/global.css";
import 'react-native-gesture-handler';
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { StyleSheet, Text, View, NativeModules,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@/source/views/login/loginUI';
import * as UI from '@/components/cobalt/importUI';
import { UseFormContextProvider, useFormContext } from '@/components/cobalt/event';
import MenuOrderScreen from './source/views/menuOrder/menuOrderUI';
import ProfitCenters from './source/views/ProfitCenters/ProfitCertersUI';
import ItemModifier from './source/views/ItemModifier/ItemModifierUI';
import MyCartScreen from './source/views/myCart/myCartUI';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Font from 'expo-font';
import CbLoader from './components/cobalt/cobaltLoader';
import MenuItems from './source/views/MenuItems';
import RecentordersScreen from './source/views/Recentorders/recentOrderUi';
import ItemModifierUIFavs from './source/views/ItemModifier/ItemModifierUIFavs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadAppConfigurations,loadPageConfig } from '@/source/constants/ConfigLoad';
import { getConfig } from '@/source/constants/LocalDatabase';
import * as SQLite from 'expo-sqlite';


let controlsConfigJson=[];

const Stack = createNativeStackNavigator();

export default function App(props) {

  const [configLoaded, setConfigLoaded] = useState(false);

const fetchConfig = async () => {
  await loadAppConfigurations();
  setConfigLoaded(true);
};

const [headerStyle, setHeaderStyle] = useState({});


  const fetchHeaderStyle = async () => {
  
    const style = await UI.CbHeaderBackground("HeaderBackground", "Header");
    setHeaderStyle(style);
  };
 
  

  useEffect(() => {
    const init = async () => {
      await fetchConfig();    
    const fetchStylePromise = fetchHeaderStyle();
      await Promise.all([fetchStylePromise]);
    
    };
    init();
  }, [])

  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { NativeNavigationModule } = NativeModules; // iOS Native Module
  const navigationRef = React.useRef(null); // ✅ UseRef for NavigationContainer


const {username,userID, apiURL,memberID, fetchTrigger,location_id} = props
global.username = username;
global.userID = userID;
global.memberID = memberID;
global.apiURL = props.apiURL;
global.fetchTrigger = fetchTrigger;
global.location_id = location_id;

  useEffect(() => {
    console.log("App started with username:", username);
    console.log("App started with password:", apiURL);
    console.log("App fetch Trigger", fetchTrigger)    
    console.log("App fetch Trigger", fetchTrigger)
  
  }, [username, userID]);

  /*useEffect(() => {
    console.log("🔄 Received locationId:", location_id);
    console.log("🔄 fetchTrigger:", fetchTrigger);

    if (fetchTrigger && location_id) {
      setTimeout(() => {
        if (navigationRef.current) {
          console.log(`🚀 Navigating to Recentorders with Location ID: ${location_id}`);
          navigationRef.current.navigate("Recentorders", { location_id });
        } else {
          console.warn("⚠️ navigationRef is still null. Cannot navigate.");
        }
      }, 100);
    }
  }, [fetchTrigger, location_id]);*/


  const backAction = () => {
    console.log('tapped');
    if (NativeNavigationModule && NativeNavigationModule.navigateToNative) {
        NativeNavigationModule.navigateToNative(); // Call native iOS navigation
    }
    return true; // Prevent default back behavior
};

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
    removeCartItems()
  }, []);

  const removeCartItems = async() => {
    const {setCartData,setModifierCartItemData}  = useFormContext()
    await AsyncStorage.removeItem("cart_data");
    setCartData([])
    setModifierCartItemData([])
  }

  if (!fontsLoaded) {
    return (
      <CbLoader />
    );
  }
 

  return (
    <GluestackUIProvider mode="light">
      <UseFormContextProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
              initialRouteName="ProfitCenters"
              screenOptions={({ route, navigation }) => ({
                ...headerStyle,
                headerLeft: () => (
                  <UI.CbBackButton id='BackButton' pageID="Header"  controlsConfigJson={controlsConfigJson} navigation={navigation} />
                ),
                //headerTitleAlign: 'left',
                headerTitle: () => {
                  return(
                    <UI.View id="HeaderTitleContainer" pageId="Header" style={styles.headerTitle}>
                      <UI.CbText id="HeadermenuTitle" pageId="Header" style={styles.menuTitle}>
                        {route.name === "MenuOrder" 
                          ? route?.params?.profileCenterTile
                          : route.name === "Recentorders"?"Order Again":route.name}
                      </UI.CbText>
                    </UI.View>
                  )
                },
                headerRight: () => {
                  const showHomeButton = route.params?.showHomeButton;
                  if (route.name === "ProfitCenters" || showHomeButton) {
                    return <UI.CbHomeButton id="HomeButton" pageID="Header"  navigation={navigation} />;
                  }
                  return null;
                },
                detachPreviousScreen: true
              })
            }
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
                  headerTitle: () => {
                    return(
                      <UI.View id="HeaderTitleContainer" pageId="Header" style={styles.headerTitle}>
                        <UI.CbText id="HeadermenuTitle" pageId="Header" style={styles.menuTitle}>
                        Food Ordering
                        </UI.CbText>
                      </UI.View>
                    )
                  },
                }}
              />
              <Stack.Screen
                name="MenuOrder"
                component={MenuOrderScreen}
              />
              <Stack.Screen
                name="Recentorders"
                component={RecentordersScreen}
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
              name="ItemModifierUIFavs"
              component={ItemModifierUIFavs}
              options={{
                headerShown: true,
                title: "Back to Menu"
              }}
              />
              <Stack.Screen
                name="MyCart"
                component={MyCartScreen}
                options={{ headerShown: true, 
                  headerTitle: () => {
                    return(
                      <UI.View id="HeaderTitleContainer" pageId="Header" style={styles.headerTitle}>
                        <UI.CbText id="HeadermenuTitle" pageId="Header" style={styles.menuTitle}>
                        My Cart
                        </UI.CbText>
                      </UI.View>
                    )
                  },
                 }}
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
    fontFamily: 'SourceSansPro_SemiBold',
    paddingTop: 4,
    lineHeight: 28,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle:{ width: '100%',
    alignItems: 'flex-start',
    paddingLeft: 0,
    bottom : 1 }
});
