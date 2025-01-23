import { StyleSheet } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";

export const styles = StyleSheet.create({
    subContainer:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 25,
        width:"95%"
      },
      mealTypeTitle:{
        fontSize: 18,
        lineHeight: 20,
        color: '#4b5154',
        fontWeight:"600",
      },
      priceTxt:{
        fontSize: 16,
        lineHeight: 20,
        color: '#333',
        marginVertical:1.5,
        fontWeight:"500"
      },
      descriptionTxt:{
        fontSize: 12,
        lineHeight: 16,
        color: '#333',
      },
      underLineTxt:{
        color: '#1dcaff',
        fontStyle:"italic",
        fontSize:12
      },
      mealTypeImg:{
        width:100,
        height: 70,
        borderRadius: 5,
        resizeMode:"cover",
      },
      addItemToCartBtn:{
        padding:responsiveWidth(2),
        position: 'absolute',
        right:-15,
        top:15,
        borderColor: '#5773a2',
        borderWidth:1,
        backgroundColor: '#fff',
        borderRadius:5
      },
      operationBtn:{
        padding:responsiveWidth(2),
        position: 'absolute',
        right:-15,
        top:15,
        borderColor: '#5773a2',
        borderWidth:1,
        backgroundColor: '#fff',
        borderRadius:5,
        justifyContent:"space-between",
        flexDirection:"row",
        alignItems:"center",
      },
      contentContainer:{ flex: 1, paddingRight: 20 ,minWidth:"30%",maxWidth:"60%"},
      quantityTxt:{
        fontSize:18,
        fontWeight:"300",
        paddingLeft:responsiveWidth(1.2),
        paddingRight:responsiveWidth(0.8)
      },
      iconBtn:{ width: responsiveWidth(4) }
})