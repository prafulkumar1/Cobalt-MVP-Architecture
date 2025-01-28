export const navigateToScreen = (props:any, screenName:string, isHomeEnabled:boolean) => {
  if (props.navigation && screenName) {
    props.navigation.navigate(screenName, { showHomeButton: isHomeEnabled, title: screenName}); 
  } else {
    console.warn("Navigation object or screen name is missing.");
  }
};
