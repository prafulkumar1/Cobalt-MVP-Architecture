export const navigateToScreen = (props:any, screenName:string, isHomeEnabled:boolean,params:any) => {
  if (props.navigation && screenName) {
    props.navigation.navigate(screenName, { showHomeButton: isHomeEnabled, title: screenName,...params}); 
  } else {
    console.warn("Navigation object or screen name is missing.");
  }
};
