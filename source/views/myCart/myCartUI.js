
import * as UI from '@/components/cobalt/importUI';
import {useFormContext } from '@/components/cobalt/event';
import { Text } from 'react-native';
import { useMyCartLogic } from '@/source/controller/myCart/myCart';
import { MessageCircleIcon,ChevronsLeftIcon,ChevronsRightIcon, ChevronDownIcon, CircleIcon,ChevronUpIcon,AddIcon,TrashIcon,RemoveIcon,SearchIcon,CloseIcon,ArrowLeftIcon } from '@/components/ui/icon';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Icon } from '@/components/ui/icon';
import { Swipeable } from 'react-native-gesture-handler';


const pageId='MyCart';
export default function MyCartScreen(props) {

 let pageConfigJson = global.appConfigJsonArray.find(item => item.PageId === pageId);

 global.controlsConfigJson = pageConfigJson && pageConfigJson.Controlls ? pageConfigJson.Controlls : [];

   const {   } = useMyCartLogic();
  const {updateCartItemQuantity}= useFormContext();
  

  const renderCartItems = ({ item }) => {
    const renderRightActions = (progress, dragX) => {
      return (
          <UI.TouchableOpacity
            style={styles.swipeActionContainer}
            onPress={() => handleDelete(item)}
          >
            <UI.Text style={styles.removeBtb}>Remove</UI.Text>
          </UI.TouchableOpacity>
      );
    };
  
    const handleDelete = (item) => {
      console.log('Item deleted:', item);
    };
  
    return (
      <Swipeable renderRightActions={renderRightActions}>
        <UI.Box style={styles.cardContainer}>
          <UI.Box style={styles.mainContainer}>
            <UI.Box style={{ width: responsiveWidth(55) }}>
              <UI.Text style={styles.itemTitle}>Fish and Chips</UI.Text>
              <UI.Text style={styles.itemCategory}>
                Ranch Dressingasdsadsadvsab d sajdbvjkasjdas  sajdbajksbd sajbdjkasbdjka kjbsdjksabjkd sadbasbdlakdbs  sakdbklsadklsan
              </UI.Text>
            </UI.Box>
  
            <UI.Box style={styles.rightContainer}>
              <UI.Text style={styles.itemPrice}>$36.00</UI.Text>
              <UI.Box style={styles.operationBtn}>
                <UI.TouchableOpacity style={styles.iconBtn}>
                  <Icon as={true ? TrashIcon : RemoveIcon} color="#5773a2" size={'lg'} />
                </UI.TouchableOpacity>
                <Text style={styles.quantityTxt}>{1}</Text>
                <UI.TouchableOpacity style={styles.iconBtn}>
                  <Icon as={AddIcon} color="#5773a2" size={"lg"} />
                </UI.TouchableOpacity>
              </UI.Box>
            </UI.Box>
          </UI.Box>
  
          <UI.Box style={styles.notesContainer}>
            <Icon as={MessageCircleIcon} color="#5773a2" size={"lg"} />
            <UI.Text style={styles.itemNotes}>
              Allergfhjsbd sajdklasbdas asjkdbksabdkjjsdasj .
            </UI.Text>
          </UI.Box>
        </UI.Box>
      </Swipeable>
    );
  };
  return (
    <UI.Box style={styles.topContainer}>
      <UI.ScrollView>

        <UI.CbFlatList flatlistData={[{},{},{}]} children={renderCartItems}/>
      </UI.ScrollView>
    </UI.Box>  
  );
}

const styles = UI.StyleSheet.create({
  topContainer:{ flex: 1, padding: 10 },
  scrollContent: {
    padding: 20,
  },
    operationBtn: {
      padding: responsiveWidth(2),
      height:40,
      backgroundColor:"green",
      borderColor: '#5773a2',
      borderWidth: 1,
      backgroundColor: '#fff',
      borderRadius: 5,
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "center",
    },
      iconBtn: { width:responsiveWidth(5) },
    quantityTxt: {
      fontSize: 18,
      fontWeight: "300",
      paddingLeft: responsiveWidth(1.2),
      paddingRight: responsiveWidth(1.6),
      top:-2
    },
    mainContainer:{
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center",
      paddingBottom:responsiveHeight(1.5),
      borderBottomWidth:0.2,
      borderColor:"#9F9F9F"
    },
    itemTitle:{
      fontSize:16,
      color:"#4B5154",
      lineHeight:20,
      fontWeight:"600"
    },
    itemCategory:{
      color:"#3B87C1",
      fontSize:10,
      fontStyle:"italic",
      lineHeight:16,
    },
    itemNotes:{
      color:"#6D6D6D",
      fontSize:12,
      fontStyle:"italic",
      paddingLeft:5
    },
    itemPrice:{
      fontSize:16,
      color:"#4B5154",
      lineHeight:20,
      fontWeight:"600",
      paddingRight:10
    },
    rightContainer:{ flexDirection: "row", alignItems: "center" },
    cardContainer:{ borderWidth: 0.3, padding: responsiveWidth(3), borderRadius: 10, borderColor: "#0000003B",marginTop:responsiveHeight(1) },
    notesContainer:{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", paddingTop: 10 },
    swipeActionContainer:{
      backgroundColor:"#FF0000",
      width:90,
      height:50,
      marginLeft:responsiveWidth(2),
      justifyContent:"center",
      alignItems:"center",
      borderTopLeftRadius:10,
      borderBottomLeftRadius:10
    },
    removeBtb:{
      color:"#FFFFFF",
      fontSize:16
    }
});