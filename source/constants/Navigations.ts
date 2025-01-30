export const navigateToScreen = (props: any, screenName: string, isHomeEnabled: boolean, params: any) => {

  if (!screenName) {
    console.warn("Screen name is missing.");
    return;
  }
  if (props.navigation) {
    const updatedParams = params || {};
    props.navigation.navigate(screenName, { showHomeButton: isHomeEnabled, title: screenName, ...updatedParams });
  } else {
    console.warn("Navigation object is missing.");
  }
};
