import * as UI from '@/components/cobalt/importUI';
import { RecentordersData,FavoritesList } from '@/source/constants/commonData';
import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { styles } from '@/source/styles/Recentorders/ROStyle';
import { Box } from 'lucide-react-native';
import { useFormContext } from '@/components/cobalt/event';
import { height, horizontalScale, moderateScale, verticalScale } from '@/source/constants/Matrices';
import {  CheckIcon, ChevronDownIcon,ChevronRightIcon, CircleIcon,ChevronUpIcon,AddIcon,TrashIcon,RemoveIcon } from '@/components/ui/icon';
import { Accordion,  AccordionItem,  AccordionHeader, AccordionTrigger, AccordionTitleText, AccordionContentText, AccordionIcon, AccordionContent, } from '@/components/ui/accordion';
import { useRecentOrderLogic } from '@/source/controller/recentOrder/RecentOrder';
import { useRoute } from "@react-navigation/native";
import { navigateToScreen } from '@/source/constants/Navigations';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { useNavigation } from "@react-navigation/native";
import CbLoader from '@/components/cobalt/cobaltLoader';


function RenderingPendingOrders(props) {
  const { loading, orders, fetchRecentOrders,pendingOrders } = useRecentOrderLogic(props); // Fetch orders from API

  console.log('Pending Orders: ', pendingOrders);

  const OrdersList = pendingOrders
  
  
  return (
<Accordion
  style={{
    paddingHorizontal: horizontalScale(10),
    width: "100%", 
    maxHeight: "100%",
    borderRadius: moderateScale(8),
    backgroundColor: "#ffffff",
    shadowColor: "#00000029",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    padding: moderateScale(10),
    alignSelf: "center"
  }}
>
  {pendingOrders?.map((Order, index) => (
    <AccordionItem key={index} value={`item-${index}`}>
      <AccordionHeader >
        <UI.Box style={{ flexDirection: "row", alignItems: "center", paddingVertical:20,justifyContent:"space-between" }}>
            <UI.CbImage  imageJsx={<Image source={require("@/assets/images/icons/Pendingorder.png")}    style={{ width: 28, height: 28, left:6}}  /> }/>
            <UI.Text   style={{ fontSize: 18, fontStyle: "italic", fontFamily: "SourceSansPro_Bold",fontWeight: "700",  marginLeft: 10,   left:10  }}>
               Ordered Status
            </UI.Text>
            <UI.Text   style={{ marginLeft: "auto",  color: "#FF6F00", fontSize: 16,fontFamily: "SourceSansPro_Bold", fontWeight: "700",  right:20 }}>   
              {Order.orderstatus}
            </UI.Text>
        </UI.Box>
        <AccordionTrigger className="focus:web:rounded-lg">
        <UI.Box  style={{ flexDirection: "row", justifyContent: "space-between",  alignItems: "center",  }}>
            <UI.Box>
              <UI.Text   style={{ fontSize:11, color: "#4F4F4F", fontFamily: "SourceSansPro_Bold",  }} >
                  Pickup Time
                </UI.Text>
                <UI.Text  style={{  fontSize: 16, fontFamily: "SourceSansPro_Bold", color:"#2A4E7D"  }} >
                  {Order.pickuptime}
                </UI.Text>
            </UI.Box>
            <UI.Box style={{ paddingHorizontal:8,   }}>
                <UI.Text style={{ fontSize: 11,  color: "#4F4F4F", fontFamily: "SourceSansPro_Bold" }}>
                    Pickup Place
                  </UI.Text>
                <UI.Text style={{ fontSize: 16, fontFamily: "SourceSansPro_Bold",color:"#2A4E7D" }}>
                {Order.pickuplocation}
                </UI.Text>
              </UI.Box>
            <UI.Box style={{ paddingHorizontal:60 }}>
                <UI.Text   style={{fontSize: 14, color: "#4F4F4F", fontFamily: "SourceSansPro_BoldItalic" }} >
                  Order Id #: {Order.OrderID}
                </UI.Text>
                <UI.Text style={{ fontSize: 14,  color: "#4F4F4F", fontFamily: "SourceSansPro_BoldItalic" }} >
                  Date: {Order.Ordereddate}
                </UI.Text>
            </UI.Box> 
            <>
            {({ isExpanded }) => {
            return (
              <>
                {isExpanded ? (
                  <AccordionIcon as={ChevronRightIcon} className="mr-3" style={{width:20,height:20,}} />
                ) : (
                  <AccordionIcon as={ChevronDownIcon} className="mr-3" style={{width:20,height:20,}}/>
                )}
              </>
            )
          }}
            </>
         </UI.Box>           
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionContent >
        <UI.Box style={{ padding: 12, backgroundColor: "#fff" }}>
         <UI.Box>
                <UI.Text style={{ fontSize: 14, fontFamily: "SourceSansPro_Bold",right:18,bottom:10}}>
                  Order Summary
                </UI.Text>
                <UI.Box style={{ flexDirection: "row",justifyContent: "space-between",alignItems: "center",marginBottom: 8,}}>
                    <UI.Text style={{ fontSize: 12, color: "#5773A2",fontFamily: "SourceSansPro_Bold", fontStyle: "italic",right:18 }} >
                      Items
                    </UI.Text>
                    <UI.Box style={{ flexDirection: "row", alignItems: "center" }}>
                      <UI.Text   style={{ fontSize: 12, color: "#5773A2",fontFamily: "SourceSansPro_Bold", fontStyle: "italic",  marginRight: 16 }}>
                        Qty
                      </UI.Text>
                    <UI.Text style={{ fontSize: 12, color: "#5773A2",fontFamily: "SourceSansPro_Bold", fontStyle: "italic"}}>
                      Amount
                    </UI.Text>
                </UI.Box>
          </UI.Box>       
        </UI.Box>

          <UI.Box style={{ marginBottom: 12 }}>
          {pendingOrders
    .filter((order) => order.OrderID === Order.OrderID) // Ensure we are grouping items by order
    .map((order, index) => (  <React.Fragment key={index}>
    <UI.Box style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
      <UI.Text style={{ fontSize: 12, fontStyle: "italic", fontWeight: "700", right: 18 }}>
        {index + 1}. {Order.Item_Name}
      </UI.Text>
      <UI.Box style={{ flexDirection: "row", alignItems: "center" }}>
        <UI.Text style={{ fontSize: 12, fontFamily: "SourceSansPro_Bold", fontStyle: "italic", marginRight: 16 }}>
          1 {/* Since there is no Quantity field in response, default to 1 */}
        </UI.Text>
        <UI.Text style={{ fontSize: 12, fontFamily: "SourceSansPro_Bold", fontStyle: "italic" }}>
          ${Order.Price.toFixed(2)}
        </UI.Text>
      </UI.Box>
    </UI.Box>
    <UI.Box>
      {Order?.Modifiers?.length > 0 && Order.Modifiers.map((Modifier, modIndex) => (
        <React.Fragment key={modIndex}>
          <UI.Text style={{ fontSize: 11, color: "#5773A2", fontFamily: "SourceSansPro_Bold", fontStyle: "italic" }}>
            {Modifier.Item_Name}
          </UI.Text>
        </React.Fragment>
      ))}
    </UI.Box>
    {Order.Comments && Order.Comments !== "No Comments added" && (
      <UI.Box style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
        <UI.CbImage imageJsx={<Image source={require('@/assets/images/icons/ROComment.png')} style={{ width: horizontalScale(15), height: verticalScale(15), marginRight: 5, top: 1 }} />} />
        <UI.Text
          style={{
            fontSize: 12,
            fontFamily: "SourceSansPro_Bold",
            fontStyle: "italic",
            flexShrink: 1,
            flexWrap: "wrap",
            maxWidth: "90%"
          }}
        >
          {Order.Comments}
        </UI.Text>
      </UI.Box>
    )}
  </React.Fragment>
))}

          </UI.Box>
            <UI.Box style={{ borderTopWidth: 1, borderTopColor: "#eee", marginTop: 12, paddingTop: 12,alignSelf: "flex-end",alignItems: "flex-end",  }}>
               {Order.SubTotal && <UI.Text style={{ fontWeight: "700", fontFamily: "SourceSansPro_Bold" }}>
                  Sub Total: ${Order.SubTotal.toFixed(2)}
                </UI.Text>}
                {Order.ServiceCharge && <UI.Text>10% Service Charge: ${Order.ServiceCharge.toFixed(2)}</UI.Text>}
               {Order.FoodTax && <UI.Text>Food Tax: ${Order.FoodTax.toFixed(2)}</UI.Text> }
                {Order.StateTax && <UI.Text>State Tax: ${Order.StateTax.toFixed(2)}</UI.Text> }
            </UI.Box>
            <UI.Box style={{ borderTopWidth: 1, borderTopColor: "#eee", marginTop: 12, paddingTop: 12,alignSelf: "flex-end",alignItems: "flex-end",  }}>
            {Order.Total &&  <UI.Text style={{ fontWeight: "700", marginTop: 8 }}>Total: ${Order.Total.toFixed(2)}</UI.Text> }
                {Order.Tip &&   <UI.Text>Tip: ${Order.Tip.toFixed(2)}</UI.Text> }
                {Order.GrandTotal &&    <UI.Text>Grand Total: ${Order.GrandTotal.toFixed(2)}</UI.Text> }
            </UI.Box>
        
        </UI.Box>
      </AccordionContent>
    </AccordionItem>
     ))}
  </Accordion>
  );
};



function RenderingFavoritesList({ props }) {
  const [expandedItems, setExpandedItems] = useState({});
  const route = useRoute();
  const screenName = route.name;

  const {
    menuOrderData,
    storeSingleItem,
    closePreviewModal,
    cartData,
    singleItemDetails,
    modifierCartItemData,
    increaseQuantity
  } = useFormContext();
  
  const {
    favItems,
    loaded,
  } = useRecentOrderLogic();

  const toggleReadMore = (index) => {
    setExpandedItems((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const editCommentBtn = (props, item) => {
    navigateToScreen(props, "MenuOrder", true, { itemId: item.Item_ID })
    storeSingleItem({
      ...item,
      quantityIncPrice: item?.TotalPrice
    })
    increaseQuantity({
      ...item,
      quantityIncPrice: item?.TotalPrice
    })
    closePreviewModal()
  }
 
  return (
    <>
      {
        loaded ?
          <UI.Box style={styles.loadingContainer}>
            <CbLoader />
          </UI.Box>
          :
          <UI.Box style={styles.favMainContainer}>
            {favItems && favItems?.map((item, index) => {

              const itemDetails = menuOrderData?.find((value) => value.Item_ID == item?.Item_ID);
              return (
                <UI.TouchableOpacity
                  key={index}
                  style={styles.favItem}
                  onPress={() => editCommentBtn(props, item)}
                >
                  <UI.Box style={{flexDirection:"row"}}>
                    <UI.Box style={styles.itemImg}>
                      <UI.CbImage source={item.ImageUrl} style={styles.Item_Image} />
                    </UI.Box>
                    <UI.Box style={styles.labelContainer}>
                      <UI.Text style={styles.itemLables}>
                        {item.Item_Name}
                      </UI.Text>
                      <UI.Text style={styles.itemLables}>
                        ${item.Price.toFixed(2)}
                      </UI.Text>
                      <UI.Text style={styles.showLessTxt}>
                        {expandedItems[index]
                          ? item.Description || ""
                          : item.Description
                            ? `${item.Description.substring(0, 35)}...`
                            : ""
                        }

                      </UI.Text>
                      <UI.TouchableOpacity onPress={() => toggleReadMore(index)}>
                        <UI.Text style={styles.readLessTxt}>
                          {expandedItems[index] ? 'Read Less' : 'Read More'}
                        </UI.Text>
                      </UI.TouchableOpacity>
                    </UI.Box>
                  </UI.Box>

                  <UI.Box
                    style={styles.rightContainer}
                  >
                  <UI.Box>
                  <Image
                        source={require("@/assets/images/icons/Fav3x.png")}
                        style={[styles.favIcon,{right:10}]}
                        resizeMode="contain"
                      />
                  </UI.Box>

                    <UI.Box style={{marginRight:20}}>
                    <UI.CbAddToCartButton
                      mealItemDetails={itemDetails}
                      routeName={screenName}
                      style={styles.addToCartBtn}
                    />
                    </UI.Box>
                  </UI.Box>
                </UI.TouchableOpacity>
              );
            })}
          </UI.Box>
      }
    </>
  );
};


export default function RecentordersScreen(props) { 

  const [isRecentOrder, setIsRecentOrderOpen] = useState(true);
  const {} = useRecentOrderLogic(props)
  const { cartData } =  useFormContext();
  const {  orders, fetchRecentOrders } = useRecentOrderLogic(props);
  console.log('Orders', orders);
  const totalQuantity = cartData.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const navigation = useNavigation();

  useEffect(() => {
    fetchRecentOrders();
  }, []);
  return (
    <UI.Box style={styles.mainContainer}>
      <UI.Box style={styles.subContainer}>
        <UI.TouchableOpacity activeOpacity={1} onPress={() => setIsRecentOrderOpen(false)} style={[!isRecentOrder ? styles.ActiveButtonStyle : styles.ButtonStyle]}>
          <UI.Text style={[!isRecentOrder ? styles.ActiveButtonTextStyle : styles.ButtonTextStyle]}>Favorites</UI.Text>
        </UI.TouchableOpacity>
        <UI.TouchableOpacity onPress={() => setIsRecentOrderOpen(true)} style={[isRecentOrder ? styles.ActiveButtonStyle : styles.ButtonStyle]}>
          <UI.Text style={[isRecentOrder ? styles.ActiveButtonTextStyle : styles.ButtonTextStyle]}>Recent Orders</UI.Text>
        </UI.TouchableOpacity>
      </UI.Box>
      <UI.ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
        {isRecentOrder ?
          <>
            <RenderingPendingOrders />

            <UI.CbRecentAccordion key={orders.length} componentData={orders} screenName="RecentOrders" navigation={navigation} />
          </>
          :
          <RenderingFavoritesList props={props} />
        }
      </UI.ScrollView>
      {totalQuantity > 0 && <UI.CbFloatingButton props={props} />}
    </UI.Box>    
  );
}
