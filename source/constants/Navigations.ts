// import { useNavigation } from '@react-navigation/native';

// export const useGoBack = () => {
//   const navigation = useNavigation();

//   return () => {
//     if (navigation.canGoBack()) {
//       navigation.goBack();
//     } else {
//       console.warn('No screens to go back to.');
//     }
//   };
// };

export const navigateToScreen = (props:any, screenName:string) => {
  if (props.navigation && screenName) {
    props.navigation.navigate(screenName); // Navigate to the specified screen with optional parameters
  } else {
    console.warn("Navigation object or screen name is missing.");
  }
};
