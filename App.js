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
import ItemDetails from './source/views/ItemModifier/ItemDetails';
// Global Configurations
const appConfigJson = '[{"PageId":"Login","Controlls":[{"type":"backgroundImage","id":"loginBackground","styles":{"container":{"flex":1,"resizeMode":"cover","justifyContent":"center","alignItems":"center"}}},{"type":"VStack","id":"VStack1","space":"lg"},{"type":"text","id":"username","placeholder":"User Name/Member ID","labelText":"User Name","variant":"outline","errorMessage":"User Name is Requried.","isDisabled":0,"isInvalid":0,"isReadOnly":0,"isRequired":1},{"type":"password","id":"password","placeholder":"Password","labelText":"Password","variant":"underlined","errorMessage":"Password is Requried.","isDisabled":0,"isInvalid":0,"isReadOnly":0,"isRequired":1},{"type":"checkbox","id":"rememberme","labeltext":"Remember Me"},{"type":"select","id":"department","placeholder":"Department","labelText":"Select Department","options":[{"label":"Dining","value":"dining"},{"label":"Golf","value":"golf"},{"label":"Tennis","value":"tennis"},{"label":"Pool","value":"pool"}]},{"type":"radioButton","id":"gender","alignment":"Horizontal","labelText":"Gender","options":[{"label":"Male","value":"male"},{"label":"Female","value":"female"},{"label":"Others","value":"others"}]},{"type":"button","id":"login","text":"Login","variant":"","backgroundColor":"white","borderRadius":"40"},{"id":"cancel","text":"Cancel","variant":"","backgroundColor":"white","borderRadius":"40"}]}]';
global.appConfigJsonArray = typeof appConfigJson === 'string' ? JSON.parse(appConfigJson) : appConfigJson;
global.controlsConfigJson = [];

const Stack = createNativeStackNavigator();

export default function App(props) {
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
    await AsyncStorage.removeItem("cart_data");
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
          <NavigationContainer >
            <Stack.Navigator
              initialRouteName="ProfitCenters"
              screenOptions={({ route, navigation }) => ({
                headerLeft: () => {
              if(route.name === "ProfitCenters"){
                return (
                  <UI.TouchableOpacity onPress={()=>backAction()} style={[styles.homeHeader,{marginRight:20}]}>
                           {
          this.source ? <Image source={{ uri: this.source}}/>:<Image alt='image' source={require("@/assets/images/icons/Back.png")} />
        }
        </UI.TouchableOpacity>
                )
              }else{
                return(
                <UI.CbBackButton navigation={navigation}  />
              )
              }              
            },
                headerTitleAlign: 'left',
                headerTitle: () => {
                  return(
                    <View style={styles.headerTitle}>
                      <Text style={[styles.menuTitle, { fontFamily: 'SourceSansPro_SemiBold' }]}>
                        {route.name === "MenuOrder" 
                          ? route?.params?.profileCenterTile
                          : route.name === "Recentorders"?"Order Again":route.name}
                      </Text>
                    </View>
                  )
                },
                headerRight: () => {
                  const value = route.params?.showHomeButton
                  if(route.name === "ProfitCenters") {
                    return (
                      <UI.TouchableOpacity onPress={()=>backAction()} style={styles.homeHeader}>
                           {
          this.source ? <Image source={{ uri: this.source}}/>:<Image alt='image' source={require("@/assets/images/icons/Home.png")} />
        }
        </UI.TouchableOpacity>
                    );
                  }else{
                    if (value) {
                      return (
                        <UI.TouchableOpacity onPress={()=>backAction()} style={styles.homeHeader}>
                           {
          this.source ? <Image source={{ uri: this.source}}/>:<Image alt='image' source={require("@/assets/images/icons/Home.png")} />
        }
        </UI.TouchableOpacity>
                      );
                    }
                  }
                },
                headerTitleStyle: {
                  color: "#4B5154",
                  fontSize: 22,
                  fontFamily: 'SourceSansPro_SemiBold',
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
              name="ItemDetails"
              component={ItemDetails}
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
