import * as UI from '@/components/cobalt/importUI';
import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { styles } from '@/source/styles/Recentorders/ROStyle';
import { useFormContext } from '@/components/cobalt/event';
import { height, horizontalScale, isPlatformAndroid, moderateScale, verticalScale } from '@/source/constants/Matrices';
import {  CheckIcon, ChevronDownIcon,ChevronRightIcon, CircleIcon,ChevronUpIcon,AddIcon,TrashIcon,RemoveIcon } from '@/components/ui/icon';
import { Accordion,  AccordionItem,  AccordionHeader, AccordionTrigger, AccordionTitleText, AccordionContentText, AccordionIcon, AccordionContent, } from '@/components/ui/accordion';
import { useRecentOrderLogic } from '@/source/controller/recentOrder/RecentOrder';
import { useRoute } from "@react-navigation/native";
import { navigateToScreen } from '@/source/constants/Navigations';
import { useNavigation } from "@react-navigation/native";
import CbLoader from '@/components/cobalt/cobaltLoader';
import { CbDottedLine } from '@/source/constants/dottedLine';


function RenderingPendingOrders(props) {
  const { pendingOrders } = useRecentOrderLogic(props);
  const OrdersList = pendingOrders
  const [expandedIndexes, setExpandedIndexes] = useState(new Set());
  const handleToggle = (index) => {
    setExpandedIndexes((prevIndexes) => {
      const newIndexes = new Set(prevIndexes);
      if (newIndexes.has(index)) {
        newIndexes.delete(index); 
      } else {
        newIndexes.add(index);
      }
      return newIndexes;
    });
  };

  return (
    <Accordion
      style={styles.recentContainer}
    >
      <UI.FlatList
        data={pendingOrders}
        contentContainerStyle={{marginHorizontal:2}}
        renderItem={({ item, index }) => {
          const Order = item
          return (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              style={styles.recentCardContainer}
              expanded={expandedIndexes.has(index)}
            >
              <AccordionHeader >
                <UI.Box style={styles.recentStatusContainer}>
                  <UI.CbImage imageJsx={<Image source={require("@/assets/images/icons/Pendingorder3x.png")} style={styles.orderIcon} />} />
                  <UI.Text style={styles.labelStatus}>
                    Order Status
                  </UI.Text>
                  <UI.Text style={styles.statusValTxt}>
                    {Order.orderstatus}
                  </UI.Text>
                </UI.Box>
                <UI.Box style={styles.dottedLine}>
                  <CbDottedLine length={isPlatformAndroid() ? 50 : 45} dotSize={6} dotColor="#0000002B" />
                </UI.Box>
                <AccordionTrigger className="focus:web:rounded-lg" onPress={() => handleToggle(index)}>
                  <UI.Box style={styles.pickUpDetailsContainer}>
                    <UI.Box style={styles.pickUpSubContainer}>
                      <UI.Box>
                        <UI.Text style={styles.labelPickUpTime} >
                          Pickup Time
                        </UI.Text>
                        <UI.Text style={styles.pickValue} >
                          {Order.pickuptime}
                        </UI.Text>
                      </UI.Box>
                      <UI.Box style={styles.verticalLine} />
                      <UI.Box>
                        <UI.Text style={styles.labelPickUpPoint}>
                          Pickup Point
                        </UI.Text>
                        <UI.Text style={styles.pickUpLocation}>
                          Cabana
                        </UI.Text>
                      </UI.Box>
                    </UI.Box>
                    <UI.Box style={styles.detailsContainer}>
                      <UI.Box>
                        <UI.Text style={styles.labelOrderId} >
                          Order Id #: {Order.OrderID}
                        </UI.Text>
                        <UI.Text style={styles.labelOrderId} >
                          Date: {Order.Ordereddate}
                        </UI.Text>
                      </UI.Box>
                      <AccordionIcon
                        as={expandedIndexes.has(index) ? ChevronDownIcon : ChevronRightIcon}
                        size={"xl"}
                        color="#4B5154"
                        style={{ left: isPlatformAndroid()?15:5 }}
                      />
                    </UI.Box>

                  </UI.Box>
                </AccordionTrigger>
                {
                 expandedIndexes.has(index) &&
                  <UI.Box style={[styles.dottedLine, { marginTop: -5 }]}>
                    <CbDottedLine length={isPlatformAndroid() ? 50 : 45} dotSize={6} dotColor="#0000002B" />
                  </UI.Box>
                }
               
              </AccordionHeader>
              <AccordionContent >
                <UI.Box style={styles.orderSummaryContainer}>
                  <UI.Box>
                    <UI.Text style={styles.labelOrdSummary}>
                      Order Summary
                    </UI.Text>
                    <UI.Box style={styles.itemContainer}>
                      <UI.Text style={styles.labelItem} >
                        Items
                      </UI.Text>
                      <UI.Box style={styles.amountContainer}>
                        <UI.Text style={styles.labelQty}>
                          Qty
                        </UI.Text>
                        <UI.Text style={styles.labelAmount}>
                          Amount
                        </UI.Text>
                      </UI.Box>
                    </UI.Box>

                   
                  </UI.Box>
                  <UI.Box style={styles.pendingOrderContainer}>
                    {Order?.Items?.map((items, index) => {
                        return(
                          <React.Fragment key={index}>
                            <UI.Box style={styles.pendingOrderBox}>
                              <UI.Text style={styles.labelItemName}>
                                {index + 1}. {items.Item_Name}
                              </UI.Text>
                              <UI.Box style={styles.amountContainer}>
                                <UI.Text style={styles.labelQuantity}>
                                  1 {/* Since there is no Quantity field in response, default to 1 */}
                                </UI.Text>
                                <UI.Text style={styles.itemPrice}>
                                  ${items.Price?.toFixed(2)}
                                </UI.Text>
                              </UI.Box>
                            </UI.Box>
                            <UI.Box>
                              {items?.Modifiers?.length > 0 && items.Modifiers.map((Modifier, modIndex) => (
                                <UI.Box key={modIndex} style={{left:15}}>
                                  <UI.Text style={styles.modifierName}>
                                    {Modifier.ModifierName}
                                  </UI.Text>
                                </UI.Box>
                              ))}
                            </UI.Box>

                            {items.Comments && items.Comments !== "No Comments added" && (
                              <UI.Box style={styles.commentBox}>
                                <UI.CbImage imageJsx={<Image source={require('@/assets/images/icons/ROComment3x.png')} style={styles.commentIcon} />} />
                                <UI.Text
                                  style={styles.labelComment}
                                >
                                  {items.Comments}
                                </UI.Text>
                              </UI.Box>
                            )}
                          </React.Fragment>
                        )
                      })}
                  </UI.Box>
                  <UI.Box>
                    <UI.Box
                      style={styles.priceSplitContainer}
                    >
                      {
                        Order?.SubTotal !== undefined &&
                        <UI.Box>
                          <CbDottedLine length={isPlatformAndroid() ? 50 : 45} dotSize={6} dotColor="#0000002B" />
                        </UI.Box>
                      }
                       
                      {Order?.SubTotal !== undefined && (
                        <UI.Text style={styles.labelSubTotal}>
                          {`Sub Total: $${Order.SubTotal.toFixed(2)}`}
                        </UI.Text>
                      )}
                    </UI.Box>

                    <UI.Box
                      style={styles.tipDetailsContainer}
                    >
                      {
                        (Order?.Tip !== undefined && Order?.GrandTotal !== undefined) &&
                        <UI.Box>
                          <CbDottedLine length={isPlatformAndroid() ? 50 : 45} dotSize={6} dotColor="#0000002B" />
                        </UI.Box>
                      }
                      {Order?.Tip !== undefined && <UI.Text style={[styles.tipVal,{marginTop:10}]}>{`Tip: $${Order.Tip.toFixed(2)}`}</UI.Text>}
                      {Order?.GrandTotal !== undefined && (
                        <UI.Text style={styles.tipVal}>{`Grand Total: $${Order.GrandTotal.toFixed(2)}`}</UI.Text>
                      )}
                    </UI.Box>
                  </UI.Box>
                </UI.Box>
              </AccordionContent>
            </AccordionItem>
          );
        }}
      />
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
  const {loading} = useRecentOrderLogic(props)
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
            {
              loading ? <UI.Box style={styles.loaderContainer}><CbLoader /></UI.Box> :
                <>
                  <RenderingPendingOrders />
                  <UI.CbRecentAccordion key={orders.length} componentData={orders} screenName="RecentOrders" navigation={navigation} />
                </>
            }
          </>
          :
          <RenderingFavoritesList props={props} />
        }
      </UI.ScrollView>
      {totalQuantity > 0 && <UI.CbFloatingButton props={props} />}
    </UI.Box>    
  );
}
