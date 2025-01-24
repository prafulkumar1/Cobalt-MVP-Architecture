import * as UI from "@/components/cobalt/importUI";
import {
  useFormContext,
} from "@/components/cobalt/event";
import {  TouchableOpacity } from "react-native";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

const pageId = "MenuOrder";
export default function MenuOrderScreen() {
  let pageConfigJson = global.appConfigJsonArray.find(
    (item) => item.PageId === pageId
  );

  global.controlsConfigJson =
    pageConfigJson && pageConfigJson.Controlls ? pageConfigJson.Controlls : [];

  const {menuOrderData} = useFormContext();
  return (
    <UI.Box style={styles.mainContainer}>
      <UI.ScrollView contentContainerStyle={styles.scrollContent}>
        <UI.cbCategoryList menuOrderData={menuOrderData}/>
      </UI.ScrollView>
    </UI.Box>
  );
}

const styles = UI.StyleSheet.create({
  mainContainer:{paddingTop:responsiveHeight(5),backgroundColor:"#fff"},
  scrollContent: {
    backgroundColor:"#fff",
    paddingHorizontal:responsiveWidth(2)
  },
});