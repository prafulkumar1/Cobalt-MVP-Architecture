import * as UI from "@/components/cobalt/importUI";
import {
  useFormContext,
} from "@/components/cobalt/event";
import {  Image } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { navigateToScreen } from '@/source/constants/Navigations'

const pageId = "MenuOrder";
export default function MenuOrderScreen(props) {
  let pageConfigJson = global.appConfigJsonArray.find(
    (item) => item.PageId === pageId
  );

  global.controlsConfigJson =
    pageConfigJson && pageConfigJson.Controlls ? pageConfigJson.Controlls : [];

  const {menuOrderData,isSearchActive,handleChangeState}= useFormContext();
  return (
    <UI.Box style={styles.mainContainer}> 
                <UI.Box style={{display:"flex",flexDirection: "row", marginVertical:4,}}>
                <UI.cbSearchbox onSearchActivate={() => handleChangeState()}/>
                {!isSearchActive && (
                <UI.Box style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginLeft:4, borderBottom: 1, backgroundColor: "white", width: 362, height: 31,  alignItems: "center", }}>
                  <UI.TouchableOpacity style={{ left:5 }} onPress={() => this.props.navigation.goBack()}>
                     <UI.CbImage imageJsx={<Image alt='image' source={require('@/assets/images/icons/ROCart.png')} />}/>
                  </UI.TouchableOpacity>
                  <UI.Text style={{fontSize: 16, fontWeight: "bold", right:100, lineHeight: 20, }}>
                       Recent Orders
                  </UI.Text>
                  <UI.TouchableOpacity style={{ right:8 }} onPress={() => navigateToScreen(props, "Recentorders",false)}>
                    <UI.CbImage imageJsx={<Image alt='image' source={require('@/assets/images/icons/RONav.png')} />}/>
                  </UI.TouchableOpacity>
                </UI.Box>
                )}    
                </UI.Box>         
      <UI.ScrollView contentContainerStyle={styles.scrollContent}>
        <UI.cbCategoryList />
      </UI.ScrollView>
      <UI.CbFloatingButton />
    </UI.Box>
  );
}

const styles = UI.StyleSheet.create({
  mainContainer:{},
  scrollContent: {
    backgroundColor:"#fff",
    paddingHorizontal:responsiveWidth(2)
  },
});