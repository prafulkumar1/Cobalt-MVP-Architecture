import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  ButtonStyle:{backgroundColor: '#FFFFFF', shadowColor: "##00000029", minWidth: 118, maxWidth: "100%", borderRadius: 11,height: 22,  justifyContent: "center", alignItems: "center",shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 4, 
    elevation: 5,},
    ButtonTextStyle:{color: "black" , fontFamily: "Source Sans Pro", fontSize: 16, fontWeight: "bold", textAlign: "center", flexShrink: 1},
    ActiveButtonStyle:{backgroundColor: '#26BAE2', shadowColor: "##00000029", minWidth: 118, maxWidth: "100%", borderRadius: 11,height: 22, justifyContent: "center", alignItems: "center",shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 4, 
    elevation: 5,},
    ActiveButtonTextStyle:{ color: "white" ,fontFamily: "Source Sans Pro", fontSize: 16, fontWeight: "bold", textAlign: "center", flexShrink: 1},
    Item_Image:{height:65,width:"100%",borderRadius:6},
        Favorite_Image:{height:22,width:20},
    AddButton:{   width:30, height: 30,left:40,top:12},
})
