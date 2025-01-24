export const navigateToScreen = (props:any, screenName:string) => {
  if (props.navigation && screenName) {
    props.navigation.navigate(screenName); 
  } else {
    console.warn("Navigation object or screen name is missing.");
  }
};
