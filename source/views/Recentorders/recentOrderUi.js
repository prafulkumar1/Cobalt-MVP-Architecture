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
  style={styles.pendingOrderAccordion}
>
  {pendingOrders?.map((Order, index) => (
    <AccordionItem key={index} value={`item-${index}`}>
      <AccordionHeader >
        <UI.Box style={styles.accordionHeaderBox}>
          <UI.CbImage imageJsx={<Image source={require("@/assets/images/icons/Pendingorder.png")} style={styles.pendingOrderImg} />} />
          <UI.Text style={styles.orderStaticStatusTxt}>
            Ordered Status
          </UI.Text>
          <UI.Text style={styles.orderStatusTxt}>
            {Order.orderstatus}
          </UI.Text>
        </UI.Box>
        <AccordionTrigger className="focus:web:rounded-lg">
          <UI.Box style={styles.accordionRriggerBox}>
            <UI.Box>
              <UI.Text style={styles.pickUpTimeAndLocationStaticTxt} >
                Pickup Time
              </UI.Text>
              <UI.Text style={styles.pickUpTimeAndLocation} >
                {Order.pickuptime}
              </UI.Text>
            </UI.Box>
            <UI.Box style={{ paddingHorizontal: 8, }}>
              <UI.Text style={styles.pickUpTimeAndLocationStaticTxt}>
                Pickup Place
              </UI.Text>
              <UI.Text style={styles.pickUpTimeAndLocation}>
                {Order.pickuplocation}
              </UI.Text>
            </UI.Box>
            <UI.Box style={{ paddingHorizontal: 60 }}>
              <UI.Text style={styles.orderIdAndDateStaticTxt} >
                Order Id #: {Order.OrderID}
              </UI.Text>
              <UI.Text style={styles.orderIdAndDateStaticTxt} >
                Date: {Order.Ordereddate}
              </UI.Text>
            </UI.Box>
            <>
              {({ isExpanded }) => {
                return (
                  <>
                    {isExpanded ? (
                      <AccordionIcon as={ChevronRightIcon} className="mr-3" style={{ width: 20, height: 20, }} />
                    ) : (
                      <AccordionIcon as={ChevronDownIcon} className="mr-3" style={{ width: 20, height: 20, }} />
                    )}
                  </>
                )
              }}
            </>
          </UI.Box>           
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionContent >
        <UI.Box style={styles.accordionContentBox}>
          <UI.Box>
            <UI.Text style={styles.orderSummaryStaticTxt}>
              Order Summary
            </UI.Text>
            <UI.Box style={styles.accordionContentBox2}>
              <UI.Text style={[styles.timeQtyAmtStaticTxt, {right: 18 }]} >
                Items
              </UI.Text>
              <UI.Box style={{ flexDirection: "row", alignItems: "center" }}>
                <UI.Text style={[styles.timeQtyAmtStaticTxt,{ marginRight: 16 }]}>
                  Qty
                </UI.Text>
                <UI.Text style={styles.timeQtyAmtStaticTxt}>
                  Amount
                </UI.Text>
              </UI.Box>
            </UI.Box>
          </UI.Box>

          <UI.Box style={{ marginBottom: 12 }}>
            {pendingOrders
              .filter((order) => order.OrderID === Order.OrderID) // Ensure we are grouping items by order
              .map((order, index) => (<React.Fragment key={index}>
                <UI.Box style={styles.accordionRriggerBox}>
                  <UI.Text style={styles.itemName}>
                    {index + 1}. {Order.Item_Name}
                  </UI.Text>
                  <UI.Box style={{ flexDirection: "row", alignItems: "center" }}>
                    <UI.Text style={[styles.qtnAnd$,{ marginRight: 16 }]}>
                      1 {/* Since there is no Quantity field in response, default to 1 */}
                    </UI.Text>
                    <UI.Text style={styles.qtnAnd$}>
                      ${Order.Price.toFixed(2)}
                    </UI.Text>
                  </UI.Box>
                </UI.Box>
                <UI.Box>
                  {Order?.Modifiers?.length > 0 && Order.Modifiers.map((Modifier, modIndex) => (
                    <React.Fragment key={modIndex}>
                      <UI.Text style={styles.itemModifierName}>
                        {Modifier.Item_Name}
                      </UI.Text>
                    </React.Fragment>
                  ))}
                </UI.Box>
                {Order.Comments && Order.Comments !== "No Comments added" && (
                  <UI.Box style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
                    <UI.CbImage imageJsx={<Image source={require('@/assets/images/icons/ROComment.png')} style={styles.itemCommentsImg} />} />
                    <UI.Text
                      style={styles.itemCommentsTxt}
                    >
                      {Order.Comments}
                    </UI.Text>
                  </UI.Box>
                )}
              </React.Fragment>
              ))}

          </UI.Box>
          <UI.Box style={styles.finalAccordionBoxes}>
            {Order.SubTotal && <UI.Text style={{ fontWeight: "700", fontFamily: "SourceSansPro_Bold" }}>
              Sub Total: ${Order.SubTotal.toFixed(2)}
            </UI.Text>}
            {Order.ServiceCharge && <UI.Text>10% Service Charge: ${Order.ServiceCharge.toFixed(2)}</UI.Text>}
            {Order.FoodTax && <UI.Text>Food Tax: ${Order.FoodTax.toFixed(2)}</UI.Text>}
            {Order.StateTax && <UI.Text>State Tax: ${Order.StateTax.toFixed(2)}</UI.Text>}
          </UI.Box>
          <UI.Box style={styles.finalAccordionBoxes}>
            {Order.Total && <UI.Text style={{ fontWeight: "700", marginTop: 8 }}>Total: ${Order.Total.toFixed(2)}</UI.Text>}
            {Order.Tip && <UI.Text>Tip: ${Order.Tip.toFixed(2)}</UI.Text>}
            {Order.GrandTotal && <UI.Text>Grand Total: ${Order.GrandTotal.toFixed(2)}</UI.Text>}
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
