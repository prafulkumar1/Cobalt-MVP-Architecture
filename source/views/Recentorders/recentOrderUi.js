import * as UI from '@/components/cobalt/importUI';
import React, { useState, useEffect } from 'react';
import { Image, Modal } from 'react-native';
import { styles } from '@/source/styles/Recentorders/ROStyle';
import { useFormContext } from '@/components/cobalt/event';
import { isPlatformAndroid,} from '@/source/constants/Matrices';
import {  CheckIcon, ChevronDownIcon,ChevronRightIcon, CircleIcon,ChevronUpIcon,AddIcon,TrashIcon,RemoveIcon ,CloseIcon} from '@/components/ui/icon';
import { Accordion,  AccordionItem,  AccordionHeader, AccordionTrigger, AccordionTitleText, AccordionContentText, AccordionIcon, AccordionContent, } from '@/components/ui/accordion';
import { useRecentOrderLogic } from '@/source/controller/recentOrder/RecentOrder';
import { useRoute } from "@react-navigation/native";
import CbLoader from '@/components/cobalt/cobaltLoader';
import { CbDottedLine } from '@/source/constants/dottedLine';
import { Divider } from '@/components/ui/divider';
import ItemModifier from '../ItemModifier/ItemModifierUI';
import { useMenuOrderLogic } from '@/source/controller/menuOrder/menuOrder';
import { Icon } from '@/components/ui/icon';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { postQuantityApiCall } from '@/components/cobalt/ui';


function RenderingPendingOrders(props) {
  const { pendingOrders } = useRecentOrderLogic(props);
  const PriceRow = ({ label, value }) => (
    <UI.Box style={styles.splitPriceContainer}>
      <UI.Box style={styles.priceLabelContainer}>
        <UI.Text style={styles.priceLabel}>{label}</UI.Text>
      </UI.Box>
      <UI.Box style={styles.valueMainContainer}>
        <UI.Text style={styles.priceLabel}>${value}</UI.Text>
      </UI.Box>
    </UI.Box>
  );
  const PriceDetails = (ordersPrice) => (
    <UI.Box style={styles.priceContainer}>
      <UI.Box style={styles.priceSubContainer}>
        {ordersPrice && ordersPrice?.BREAKDOWN?.map((item, index) => (
          <PriceRow key={index} label={item.LABEL} value={item.VALUE} />
        ))}
      </UI.Box>
    </UI.Box>
  );
  const ITEM_HEIGHT = 100
  return (
    <UI.FlatList
      data={pendingOrders}
      removeClippedSubviews={true}
      updateCellsBatchingPeriod={100}
      windowSize={21}
      onEndReachedThreshold={0.1}
      getItemLayout={(_, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
      })}
      renderItem={({ item, index }) => {
        const Order = item
        return (
          <Accordion style={styles.recentContainer}>
            <AccordionItem
              key={index}
              value={`item-${index}`}
              style={styles.recentCardContainer}
            >
              <AccordionHeader>
                <AccordionTrigger>
                  {({ isExpanded }) => {
                    return (
                      <UI.Box style={styles.headerContainer}>
                        <UI.Box style={styles.recentStatusContainer}>
                          <UI.CbImage
                            imageJsx={
                              <Image
                                source={require("@/assets/images/icons/Pendingorder3x.png")}
                                style={styles.orderIcon}
                              />
                            }
                          />
                          <UI.Text style={styles.labelStatus}>Order Status</UI.Text>
                          <UI.Text style={styles.statusValTxt}>
                            {Order.ORDERSTATUS}
                          </UI.Text>
                        </UI.Box>

                        <UI.Box style={styles.dottedLine}>
                          <CbDottedLine
                            length={isPlatformAndroid() ? 50 : 90}
                            dotSize={6}
                            dotColor="#0000002B"
                          />
                        </UI.Box>

                        <UI.Box style={styles.pickUpDetailsContainer}>
                          <UI.Box style={styles.pickUpSubContainer}>
                            <UI.Box>
                              <UI.Text style={styles.labelPickUpTime}>
                                Pickup Time
                              </UI.Text>
                              <UI.Text style={styles.pickValue}>
                                {Order.PICKUPTIME}
                              </UI.Text>
                            </UI.Box>

                            {
                              Order?.PICKUPLOCATION &&
                              <><UI.Box style={styles.verticalLine} />
                                <UI.Box>
                                  <UI.Text style={styles.labelPickUpPoint}>
                                    Pickup Location
                                  </UI.Text>
                                  <UI.Text style={styles.pickUpLocation}>
                                    {Order.PICKUPLOCATION}
                                  </UI.Text>
                                </UI.Box></>
                            }
                          </UI.Box>
                          <UI.Box style={styles.detailsContainer}>
                            <UI.Box>
                              <UI.Text style={styles.labelOrderId}>
                                Order Id #: {Order.ORDERID}
                              </UI.Text>
                              <UI.Text style={styles.labelOrderId}>
                                Date: {Order.ORDEREDDATE}
                              </UI.Text>
                            </UI.Box>

                            {isExpanded ? (
                              <AccordionIcon
                                as={ChevronDownIcon}
                                size={"xl"}
                                color="#4B5154"
                                style={{ left: isPlatformAndroid() ? 15 : 5 }}
                              />
                            ) : (
                              <AccordionIcon
                                as={ChevronRightIcon}
                                size={"xl"}
                                color="#4B5154"
                                style={{ left: isPlatformAndroid() ? 15 : 5 }}
                              />
                            )}
                          </UI.Box>
                        </UI.Box>
                        {
                          isExpanded ?
                            <UI.Box style={[styles.dottedLine, { marginTop: 0 }]}>
                              <CbDottedLine
                                length={isPlatformAndroid() ? 50 : 90}
                                dotSize={6}
                                dotColor="#0000002B"
                              />
                            </UI.Box> : null
                        }

                      </UI.Box>
                    );
                  }}
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionContent>
                <UI.Box style={styles.orderSummaryContainer}>
                  <UI.Box>
                    <UI.Text style={styles.labelOrdSummary}>
                      Order Summary
                    </UI.Text>
                    <UI.Box style={styles.itemContainer}>
                      <UI.Text style={styles.labelItem}>Items</UI.Text>
                      <UI.Box style={styles.amountContainer}>
                        <UI.Text style={styles.labelQty}>Qty</UI.Text>
                        <UI.Text style={styles.labelAmount}>Amount</UI.Text>
                      </UI.Box>
                    </UI.Box>
                  </UI.Box>
                  <UI.Box style={styles.pendingOrderContainer}>
                    {Order?.ITEMS?.map((items, index) => {
                      return (
                        <React.Fragment key={index}>
                          <UI.Box style={styles.pendingOrderBox}>
                            <UI.Text style={styles.labelItemName}>
                              {index + 1}. {items.ITEM_NAME}
                            </UI.Text>
                            <UI.Box style={styles.amountContainer}>
                              <UI.Text style={styles.labelQuantity}>
                                {items?.QUANTITY}
                              </UI.Text>
                              <UI.Text style={styles.itemPrice}>
                                ${items.PRICE?.toFixed(2)}
                              </UI.Text>
                            </UI.Box>
                          </UI.Box>
                          <UI.Box>
                            {items?.MODIFIERS?.length > 0 &&
                              items?.MODIFIERS.map((Modifier, modIndex) => (
                                <UI.Box key={modIndex} style={{ left: 15 }}>
                                  <UI.Text style={styles.modifierName}>
                                    {Modifier.MODIFIER_NAME}
                                  </UI.Text>
                                </UI.Box>
                              ))}
                          </UI.Box>

                          {items?.COMMENTS && (
                            <UI.Box style={styles.commentBox}>
                              <UI.CbImage
                                imageJsx={
                                  <Image
                                    source={require("@/assets/images/icons/ROComment3x.png")}
                                    style={styles.commentIcon}
                                  />
                                }
                              />
                              <UI.Text style={styles.labelComment}>
                                {items.COMMENTS}
                              </UI.Text>
                            </UI.Box>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </UI.Box>
                  <UI.Box style={styles.reorderBox}>
                    <Divider />
                  </UI.Box>
                  <UI.Box style={styles.priceContainer}>
                    {PriceDetails(Order)}
                  </UI.Box>
                </UI.Box>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      }}
    />
  );
};

const RenderingCompletedOrders = (props) => {
  const { orders} = useRecentOrderLogic(props);
  const  {closePreviewModal,storeSingleItem,increaseQuantity, cartData, updateCartItemQuantity ,addItemToCartBtnForReOrder} = useFormContext()
  const ordersData = typeof orders === "string" ? JSON.parse(orders) : orders;
 
  const editCommentBtn = (props, item) => {
    // if(item?.IsAvailable ===1 && item.IsDisable === 0){
    // }
    const updatedItems =  {
      "Description": item?.DESCRIPTION,
      "ImageUrl": item?.IMAGEURL,
      "IsAvailable": item?.IsAvailable,
      "IsDisable": item?.IsDisable,
      "Item_ID":item?.ITEM_ID,
      "Item_Name": item?.ITEM_NAME,
      "Modifiers": item?.MODIFIERS,
      "Price": item?.PRICE,
      "Comments":item?.COMMENTS,
    }
    closePreviewModal()
    storeSingleItem({
      ...updatedItems,
      quantityIncPrice: item?.TOTALPRICE
    })
    increaseQuantity({
      ...updatedItems,
      quantityIncPrice: item?.TOTALPRICE
    })
  }
  
  const handleReorder = (itemDetails) => {
    if (!itemDetails || itemDetails.length === 0) {
      return;
    }
 
    itemDetails.forEach((item) => {
      const existingItem = cartData?.find(cartItem => cartItem.Item_ID === item.Item_ID);
 
      const itemWithModifiers = {
        Item_ID:item.ITEM_ID,
        "Item_Name": item.ITEM_NAME,
        "Description": item.DESCRIPTION,
        "Price": item.PRICE,
        "ImageUrl": item.IMAGEURL,
        "IsAvailable": item?.IsAvailable,
        "IsDisable": item?.IsDisable,
        "quantity": item.QUANTITY,
        "quantityIncPrice":item?.TOTALPRICE,
        "comments":item.COMMENTS,
        selectedModifiers: item.MODIFIERS || [],
      };
 
      if (existingItem) {
        updateCartItemQuantity(existingItem, existingItem.quantity + 1);
      } else {
        addItemToCartBtnForReOrder(itemWithModifiers, item.QUANTITY);
      }
    });
  };
  const PriceRow = ({ label, value }) => (
    <UI.Box style={styles.splitPriceContainer}>
      <UI.Box style={styles.priceLabelContainer}>
        <UI.Text style={styles.priceLabel}>{label}</UI.Text>
      </UI.Box>
      <UI.Box style={styles.valueMainContainer}>
        <UI.Text style={styles.priceLabel}>${value}</UI.Text>
      </UI.Box>
    </UI.Box>
  );
  const PriceDetails = (ordersPrice) => (
    <UI.Box style={styles.priceContainer}>
      <UI.Box style={styles.priceSubContainer}>
        {ordersPrice && ordersPrice?.BREAKDOWN?.map((item, index) => (
          <PriceRow key={index} label={item.LABEL} value={item.VALUE} />
        ))}
      </UI.Box>
    </UI.Box>
  );
  return(
    <UI.FlatList
    data={ordersData}
    contentContainerStyle={{marginTop:10}}
    renderItem={({ item, index }) => {
      const isDisabled = item?.ITEMS?.some(order => order.IsDisable === 1);
      return (
        <Accordion
          defaultValue={[`item-${index}`]}
          variant="filled"
          type="single"
          size="md"
          style={styles.roAccordion}
        >
          <AccordionItem
            value={`item-${index}`}
            style={styles.itemDetailsSubContainer}
          >
            <AccordionHeader style={styles.roAccordionHeader}>
              <AccordionTrigger>
                {({ isExpanded }) => (
                  <>
                    <UI.Box key={index} style={styles.roAccordionHeading}>
                      <Image
                        alt="image"
                        source={require("@/assets/images/icons/ROdate.png")}
                      />
                      <UI.Text style={styles.roAccordionTitleText}>{`Ordered Date: ${item.ORDEREDDATE}`}</UI.Text>
                    </UI.Box>
                    {isExpanded ? (
                      <AccordionIcon
                        as={ChevronDownIcon}
                        size={"md"}
                        color="#4B5154"
                        style={styles.collapseIcon}
                      />
                    ) : (
                      <AccordionIcon
                        as={ChevronUpIcon}
                        size={"md"}
                        color="#4B5154"
                        style={styles.collapseIcon}
                      />
                    )}
                  </>
                )}
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent style={{}}>
              <UI.Box style={styles.recentStatusContainer}>
                <UI.CbImage
                  imageJsx={
                    <Image
                      source={require("@/assets/images/icons/Pendingorder3x.png")}
                      style={styles.orderCompIcon}
                    />
                  }
                />
                <UI.Text style={styles.completeLabelStatus}>
                  Order Status
                </UI.Text>
                <UI.Text style={styles.statusCompelete}>
                  {item.ORDERSTATUS}
                </UI.Text>
              </UI.Box>
              <UI.Box style={[styles.dottedLine,{width:"100%",left:5}]}>
                <CbDottedLine
                  length={isPlatformAndroid() ? 50 : 90}
                  dotSize={6}
                  dotColor="#0000002B"
                />
              </UI.Box>
              <UI.Box style={styles.completedContainer}>
                <UI.Box style={styles.pickUpSubContainer}>
                  <UI.Box>
                    <UI.Text style={styles.labelPickUpPoint}>
                      Pickup Location
                    </UI.Text>
                    <UI.Text style={styles.compPickUpLocation}>
                      {item?.ProfitCenter}
                    </UI.Text>
                  </UI.Box>
                </UI.Box>
                <UI.Box style={styles.detailsContainer}>
                  <UI.Box>
                    <UI.Text style={styles.labelOrderId}>
                      Order Id #: {item.ORDERID}
                    </UI.Text>
                  </UI.Box>
                </UI.Box>
              </UI.Box>
 
              <UI.Box style={styles.orderSummaryContainer}>
                <UI.Box>
                  <UI.Text style={styles.labelOrdSummary}>
                    Order Summary
                  </UI.Text>
                  <UI.Box style={styles.itemContainer}>
                    <UI.Text style={styles.labelItem}>Items</UI.Text>
                    <UI.Box style={styles.amountContainer}>
                      <UI.Text style={styles.labelQty}>Qty</UI.Text>
                      <UI.Text style={styles.labelAmount}>Amount</UI.Text>
                    </UI.Box>
                  </UI.Box>
                </UI.Box>
                <UI.Box style={styles.pendingOrderContainer}>
                  {item?.ITEMS?.map((items, index) => {
                    return (
                      <UI.TouchableOpacity key={index} onPress={() => editCommentBtn(props,items)}>
                        <UI.Box style={styles.pendingOrderBox}>
                          <UI.Text style={styles.labelItemName}>
                            {index + 1}. {items.ITEM_NAME}
                          </UI.Text>
                          <UI.Box style={styles.amountContainer}>
                            <UI.Text style={styles.labelQuantity}>
                              {items?.QUANTITY}
                            </UI.Text>
                            <UI.Text style={styles.itemPrice}>
                              ${items.PRICE?.toFixed(2)}
                            </UI.Text>
                          </UI.Box>
                        </UI.Box>
                        <UI.Box>
                          {items?.MODIFIERS?.length > 0 &&
                            items?.MODIFIERS?.map((Modifier, modIndex) => {
                              return (
                                <UI.Box key={modIndex} style={{ left: 15 }}>
                                  <UI.Text style={styles.modifierName}>
                                    {Modifier.MODIFIER_NAME}
                                  </UI.Text>
                                </UI.Box>
                              );
                            })}
                        </UI.Box>
 
                        {items?.COMMENTS && (
                          <UI.Box style={styles.commentBox}>
                            <UI.CbImage
                              imageJsx={
                                <Image
                                  source={require("@/assets/images/icons/ROComment3x.png")}
                                  style={styles.commentIcon}
                                  resizeMode='contain'
                                />
                              }
                            />
                            <UI.Text style={styles.labelComment}>
                              {items.COMMENTS}
                            </UI.Text>
                          </UI.Box>
                        )}
                      </UI.TouchableOpacity>
                    );
                  })}
                </UI.Box>
                <UI.Box style={styles.reorderBox}>
                  <Divider />
                </UI.Box>
                <UI.Box style={styles.priceContainer}>
                  {PriceDetails(item)}
                </UI.Box>
              </UI.Box>
              {
                item?.ISREORDER === 1 &&
                <UI.TouchableOpacity disabled={isDisabled}  style={[
                  styles.roReoderButton,
                  isDisabled
                    ? { backgroundColor: "#D3D3D3", borderColor: "#A9A9A9" }
                    : {},
                ]}
                onPress={() =>
                  !isDisabled &&
                  handleReorder(item.ITEMS)
                }
                >
                  <UI.Text style={styles.roReordertext}>Re-Order</UI.Text>
                </UI.TouchableOpacity>
              }
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      );
    }}
  />
  )
}


function RenderingFavoritesList({ props }) {
  const route = useRoute();
  const screenName = route.name;

  const {
    menuOrderData,
    storeSingleItem,
    closePreviewModal,
    increaseQuantity,
    cartData,
    addItemToCartBtn 
  } = useFormContext();
  const {
    favItems,
    loaded,
    favErrorMessage,
    toggleFavBtn,
    handleIncrement,
    handleDecrement,
  } = useRecentOrderLogic();

  const editCommentBtn = (props, item) => {
    // if(item?.IsAvailable ===1 && item.IsDisable === 0){
     
    // }
    closePreviewModal()
    storeSingleItem({
      ...item,
      quantityIncPrice: item?.TotalPrice
    })
    increaseQuantity({
      ...item,
      quantityIncPrice: item?.TotalPrice
    })
  }

  const openItemDetails = async (box) => {
    if (box.IsAvailable === 1 && box.IsDisable === 0) {
      let quantityInfo = await postQuantityApiCall(1, box?.Item_ID)
      storeSingleItem({ ...box, response: quantityInfo.response })
      increaseQuantity(box)
      closePreviewModal()
    }
  }

  const addItemToCartBtnDetails = (itemsDetails) => {
    if(itemsDetails?.Modifiers.length > 0){
      openItemDetails(itemsDetails)
    }else{
      addItemToCartBtn(itemsDetails)
    }
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
            {
              favItems && favItems?.length > 0 ? 
             <>
              <Divider style={styles.divider} />
              <UI.FlatList 
              data={favItems}
              renderItem={({item, index}) =>{
               
                const cartItem = cartData && cartData?.find((cartItem) => cartItem?.Item_ID === item?.Item_ID);
                const quantity = cartItem ? cartItem.quantity : 0;
                return (
                  <UI.TouchableOpacity
                    key={index}
                    style={styles.favItem}
                    onPress={() => editCommentBtn(props, item)}
                  >
                    <UI.Box style={{ flexDirection: "row" }}>
                      <UI.Box style={styles.itemImg}>
                        <UI.CbImage
                          source={item.ImageUrl}
                          style={styles.Item_Image}
                        />
                      </UI.Box>
                      <UI.Box style={styles.labelContainer}>
                        <UI.Text style={styles.itemLables}>
                          {item.Item_Name}
                        </UI.Text>
                        <UI.Text style={styles.itemLables}>
                          ${item.Price?.toFixed(2)}
                        </UI.Text>
                        {item?.Modifiers && item.Modifiers?.length > 0 && (
                          <UI.CbFlatList
                            scrollEnabled={false}
                            flatlistData={item.Modifiers}
                            children={({ item }) => (
                              <UI.Text style={styles.itemCategory}>
                                {item.Modifier_Name}
                              </UI.Text>
                            )}
                          />
                        )}
                      </UI.Box>
                    </UI.Box>

                    <UI.Box style={styles.rightContainer}>
                      <UI.TouchableOpacity
                        onPress={() => toggleFavBtn(item)}
                        style={{ left: quantity === 0 ? responsiveWidth(13) : quantity >= 10 ? responsiveWidth(0) : responsiveWidth(1.4) }}
                      >
                        <Image
                          source={require("@/assets/images/icons/Fav3x.png")}
                          style={[styles.favIcon]}
                          resizeMode="contain"
                        />
                      </UI.TouchableOpacity>
                    
                      {quantity >= 1 ? 
                        <UI.Box style={styles.operationBtn}>
                          <UI.TouchableOpacity
                            style={styles.iconBtn}
                            onPress={() => handleDecrement(item, quantity)}
                          >
                            <Icon
                              as={quantity === 1 ? TrashIcon : RemoveIcon}
                              color="#5773a2"
                              size={"md"}
                              style={styles.trashIcon}
                            />
                          </UI.TouchableOpacity>

                          <UI.Text style={styles.quantityTxt}>{quantity}</UI.Text>

                          <UI.TouchableOpacity
                            style={styles.iconBtn}
                            onPress={() => handleIncrement(item, quantity)}
                          >
                            <Icon
                              as={AddIcon}
                              color="#5773a2"
                              size={"xl"}
                              style={styles.addIcon}
                            />
                          </UI.TouchableOpacity>
                        </UI.Box>
                      : <UI.Box>
                        <UI.TouchableOpacity  onPress={() => addItemToCartBtnDetails(item)} style={styles.operationBtn2}>
                        <Icon
                              as={AddIcon}
                              color="#5773a2"
                              size={"xl"}
                              style={[styles.addIcon,]}
                            />
                        </UI.TouchableOpacity>
                        
                        </UI.Box>}
                    </UI.Box>      
                  </UI.TouchableOpacity>
                );
              }}
            /> 
             </>: <UI.Text style={styles.emptyFavList}>{favErrorMessage}</UI.Text>
            }
            
          </UI.Box>
      }
    </>
  );
};


export default function RecentordersScreen(props) { 

  const [isRecentOrder, setIsRecentOrderOpen] = useState(true);
  const {loading,emptyOrderMessage,favItems,} = useRecentOrderLogic(props)
  const { 
    cartData,
    itemDataVisible ,
    closePreviewModal,
    isKeyboardVisible,
    setIsVisible,
    updateModifierItemQuantity,
    selectedModifiers,
    setSelectedModifiers,
    singleItemDetails,
    updateOrAddTxt,
    modifierCartItemData
  } =  useFormContext();
  const {  orders } = useRecentOrderLogic(props);
  const {handleModifierAddCart,handleCloseItemDetails} = useMenuOrderLogic()
  const totalQuantity = cartData.reduce((sum, item) => sum + (item.quantity || 0), 0);

  const modifierCartItem = modifierCartItemData?.find((item) => item.Item_ID === singleItemDetails?.Item_ID);
  const cartItemDetails = cartData?.find((item) => item.Item_ID === singleItemDetails?.Item_ID);
  const quantity = cartItemDetails ? cartItemDetails?.quantity : 0;
  const totalCartPrice = cartItemDetails ?  Math.floor(cartItemDetails?.quantityIncPrice * 100) / 100 : 0;
  const singleItemPrice = modifierCartItem ?   Math.floor(modifierCartItem?.quantityIncPrice * 100) / 100 : 0;

  return (
    <UI.Box style={styles.mainContainer}>
      <UI.Box style={styles.subContainer}>
        <UI.TouchableOpacity
          activeOpacity={1}
          onPress={() => setIsRecentOrderOpen(false)}
          style={[
            !isRecentOrder ? styles.ActiveButtonStyle : styles.ButtonStyle,
          ]}
        >
          <UI.Text
            style={[
              !isRecentOrder
                ? styles.ActiveButtonTextStyle
                : styles.ButtonTextStyle,
            ]}
          >
            Favorites
          </UI.Text>
        </UI.TouchableOpacity>
        <UI.TouchableOpacity
          onPress={() => setIsRecentOrderOpen(true)}
          style={[
            isRecentOrder ? styles.ActiveButtonStyle : styles.ButtonStyle,
          ]}
        >
          <UI.Text
            style={[
              isRecentOrder
                ? styles.ActiveButtonTextStyle
                : styles.ButtonTextStyle,
            ]}
          >
            Recent Orders
          </UI.Text>
        </UI.TouchableOpacity>
      </UI.Box>
      <UI.ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
        {isRecentOrder ? (
          <>
            {loading ? (
              <UI.Box style={styles.loaderContainer}>
                <CbLoader />
              </UI.Box>
            ) : (
              <>
                {emptyOrderMessage === "" ? (
                  <>
                    <RenderingPendingOrders />
                    <RenderingCompletedOrders />
                  </>
                ) : (
                  <UI.Text style={styles.emptyFavList}>{emptyOrderMessage}</UI.Text>
                )}
              </>
            )}
          </>
        ) : (
          <>
            <RenderingFavoritesList props={props} />
          </>
        )}
      <Modal
          visible={itemDataVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={closePreviewModal}
        >
          <UI.Box style={styles.modalBackground}>
            {
              !isKeyboardVisible
              &&
              <UI.TouchableOpacity
              onPress={() =>
                handleCloseItemDetails(
                  setIsVisible,
                  updateModifierItemQuantity,
                  closePreviewModal,
                  selectedModifiers,
                  setSelectedModifiers,
                singleItemDetails
                )
              }
              style={styles.crossIcon}
            >
              <Icon
                as={CloseIcon}
                color="#fff"
                size={"md"}
                style={styles.closeIcon}
              />
            </UI.TouchableOpacity>
            }
            <UI.Box style={styles.modiferItems}>
              <ItemModifier isRecentOrder={isRecentOrder ? true:false}/>
            </UI.Box>
            <UI.Box style={styles.footerContainer}>
              <UI.Box>
                <UI.Text style={styles.totalAmountTxt}>Total Amount</UI.Text>
                <UI.Text style={styles.orderAmount}>{`$${quantity >= 1 ?itemDataVisible ? singleItemPrice :  totalCartPrice : singleItemPrice}`}</UI.Text>
              </UI.Box>
              <UI.TouchableOpacity style={styles.addToCartBtn2} onPress={() => handleModifierAddCart()}>
                <UI.Text style={styles.addCartTxt}>{updateOrAddTxt}</UI.Text>
              </UI.TouchableOpacity>
            </UI.Box>
          </UI.Box>
        </Modal>
      </UI.ScrollView>
      {totalQuantity > 0 && <UI.CbFloatingButton props={props} />}
    </UI.Box>
  );
}
