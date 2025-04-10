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
import { Icon } from '@/components/ui/icon';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { postQuantityApiCall } from '@/components/cobalt/ui';
import ItemModifierUIFavs from '../ItemModifier/ItemModifierUIFavs';
import {transformStyles } from '@/components/cobalt/event'

function RenderingPendingOrders(props) {
  const { pendingOrders } = useRecentOrderLogic(props);
  const PriceRow = ({ label, value }) => (
    <UI.CbBox id="splitPriceContainer" pageId="RecentOrder"  style={styles.splitPriceContainer}>
      <UI.CbBox id="PriceLabelContainer" pageId="RecentOrder" style={styles.priceLabelContainer}>
        <UI.CbText id="PriceLabel" pageId="RecentOrder" style={styles.priceLabel}>{label}</UI.CbText>
      </UI.CbBox>
      <UI.CbBox id="ValueMainContainer" pageId="RecentOrder" style={styles.valueMainContainer}>
        <UI.CbText id="PriceLabel" pageId="RecentOrder"  style={styles.priceLabel}>${value}</UI.CbText>
      </UI.CbBox>
    </UI.CbBox>
  );
  const PriceDetails = (ordersPrice) => (
    <UI.CbBox id="priceContainer" pageId="RecentOrder"  style={styles.priceContainer}>
      <UI.CbBox id="priceSubContainer" pageId="RecentOrder"  style={styles.priceSubContainer}>
        {ordersPrice && ordersPrice?.BREAKDOWN?.map((item, index) => (
          <PriceRow key={index} label={item.LABEL} value={item.VALUE} />
        ))}
      </UI.CbBox>
    </UI.CbBox>
  );
  const ITEM_HEIGHT = 100
  return (
    <UI.FlatList
      scrollEnabled={false}
      data={pendingOrders}
      removeClippedSubviews={true}
      windowSize={21}
      renderItem={({ item, index }) => {
        const defaultOpenItems = pendingOrders?.slice(0, 4)?.map((_, index) => `item-${index}`);
        const Order = item
        return (
          <Accordion style={styles.recentContainer} defaultValue={defaultOpenItems}>
            <AccordionItem
              key={index}
              value={`item-${index}`}
              style={styles.recentCardContainer}
            >
              <AccordionHeader>
                <AccordionTrigger>
                  {({ isExpanded }) => {
                    return (
                      <UI.CbBox id="POHeaderContainer" pageId="RecentOrder"  style={styles.headerContainer}>
                        <UI.CbBox id="POrecentStatusContainer" pageId="RecentOrder"  style={styles.recentStatusContainer}>
                          <UI.CbImage
                            imageJsx={
                              <Image
                                source={require("@/assets/images/icons/Pendingorder3x.png")}
                                style={styles.orderIcon}
                              />
                            }
                          />
                          <UI.CbText id="POlabelStatus" pageId="RecentOrder" style={styles.labelStatus}>Order Status</UI.CbText>
                          <UI.CbText id="POstatusValTxt" pageId="RecentOrder" style={styles.statusValTxt}>
                            {Order.ORDERSTATUS}
                          </UI.CbText>
                        </UI.CbBox>

                        <UI.CbBox id="POdottedLine" pageId="RecentOrder" style={styles.dottedLine}>
                          <CbDottedLine
                            length={isPlatformAndroid() ? 50 : 90}
                            dotSize={6}
                            dotColor="#0000002B"
                          />
                        </UI.CbBox>

                        <UI.CbBox id='PickUpDetailsContainer' pageId="RecentOrder" style={styles.pickUpDetailsContainer}>
                          <UI.CbBox id='PickUpSubContainer' pageId="RecentOrder" style={styles.pickUpSubContainer}>
                            <UI.Box>
                              <UI.CbText id='LabelPickUpTime' pageId="RecentOrder" style={styles.labelPickUpTime}>
                                Pickup Time
                              </UI.CbText>
                              <UI.CbText id='PickTimeValue' pageId="RecentOrder" style={styles.pickValue}>
                                {Order.PICKUPTIME}
                              </UI.CbText>
                            </UI.Box>

                            {
                              Order?.PICKUPLOCATION &&
                              <><UI.CbBox id='VerticalLine' pageId="RecentOrder"  style={styles.verticalLine} />
                                <UI.Box>
                                  <UI.CbText id='LabelPickUpPoint' pageId="RecentOrder"  style={styles.labelPickUpPoint}>
                                    Pickup Location
                                  </UI.CbText>
                                  <UI.CbText id='PickUpLocation' pageId="RecentOrder" style={styles.pickUpLocation}>
                                    {Order.PICKUPLOCATION}
                                  </UI.CbText>
                                </UI.Box></>
                            }
                          </UI.CbBox>
                          <UI.Box style={styles.detailsContainer}>
                            <UI.Box>
                              <UI.Text style={styles.labelOrderId}>
                                Order#: {Order.ORDERID}
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
                                style={{ left: isPlatformAndroid() ? 5 : 5 }}
                              />
                            ) : (
                              <AccordionIcon
                                as={ChevronRightIcon}
                                size={"xl"}
                                color="#4B5154"
                                style={{ left: isPlatformAndroid() ? 5 : 5 }}
                              />
                            )}
                          </UI.Box>
                        </UI.CbBox>
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

                      </UI.CbBox>
                    );
                  }}
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionContent>
                <UI.CbBox id='OrderSummaryContainer' pageId="RecentOrder"  style={styles.orderSummaryContainer}>
                  <UI.CbBox>
                    <UI.CbText id='LabelOrdSummary' pageId="RecentOrder"  style={styles.labelOrdSummary}>
                      Order Summary
                    </UI.CbText>
                    <UI.CbBox id='ItemContainer' pageId="RecentOrder" style={styles.itemContainer}>
                      <UI.CbText id='LabelItem' pageId="RecentOrder"  style={styles.labelItem}>Items</UI.CbText>
                      <UI.CbBox id='AmountContainer' pageId="RecentOrder" style={styles.amountContainer}>
                        <UI.CbText id='LabelQty' pageId="RecentOrder" style={styles.labelQty}>Qty</UI.CbText>
                        <UI.CbText id='LabelAmount' pageId="RecentOrder"  style={styles.labelAmount}>Amount</UI.CbText>
                      </UI.CbBox>
                    </UI.CbBox>
                  </UI.CbBox>
                  <UI.Box style={styles.pendingOrderContainer}>
                    {Order?.ITEMS?.map((items, index) => {
                      return (
                        <React.Fragment key={index}>
                          <UI.CbBox id='PendingOrderBox' pageId="RecentOrder" style={styles.pendingOrderBox}>
                            <UI.CbText id='LabelItemName' pageId="RecentOrder" style={styles.labelItemName}>
                              {index + 1}. {items.ITEM_NAME}
                            </UI.CbText>
                            <UI.CbBox id='AmountContainer' pageId="RecentOrder" style={styles.amountContainer}>
                              <UI.CbText id='LabelQuantity' pageId="RecentOrder" style={styles.labelQuantity}>
                                {items?.QUANTITY}
                              </UI.CbText>
                              <UI.CbText id='ItemPrice' pageId="RecentOrder" style={styles.itemPrice}>
                                ${items.PRICE?.toFixed(2)}
                              </UI.CbText>
                            </UI.CbBox>
                          </UI.CbBox>
                          <UI.Box>
                            {items?.MODIFIERS?.length > 0 &&
                              items?.MODIFIERS.map((Modifier, modIndex) => (
                                <UI.Box key={modIndex} style={{ left: 15 }}>
                                  <UI.CbText id='ModifierName' pageId="RecentOrder" style={styles.modifierName}>
                                    {Modifier.MODIFIER_NAME}
                                  </UI.CbText>
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
                </UI.CbBox>
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
  const  {closePreviewModal,storeSingleItem,increaseQuantity, cartData, updateCartItemQuantity ,addItemToCartBtnForReOrder,setItemDataVisible} = useFormContext()
  const ordersData = typeof orders === "string" ? JSON.parse(orders) : orders;
 
  const editCommentBtn = (props, item) => {
    if(item?.IsAvailable ===1 && item.IsDisable === 0){
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
      setItemDataVisible(true)
      storeSingleItem({
        ...updatedItems,
        quantityIncPrice: item?.TOTALPRICE
      })
      increaseQuantity({
        ...updatedItems,
        quantityIncPrice: item?.TOTALPRICE
      })
    }  
  }
  
  const handleReorder = (itemDetails) => {
    if (!itemDetails || itemDetails.length === 0) {
      return;
    }
    itemDetails.forEach((item) => {
      const existingItem = cartData?.find(cartItem => cartItem.Item_ID === item?.ITEM_ID);
       let updatedModifiers = item?.MODIFIERS?.map((items) => {
        return{
          "Modifier_Id": items?.MODIFIER_ID,
          "Modifier_Name": items?.MODIFIER_NAME,
          "Price": item?.Price,
          "IsFavourite": null,
          "isChecked": true,
          "Item_ID": item?.Item_ID,
          "Category_Id": item?.Category_Id
        }
      })
 
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
        selectedModifiers: item?.MODIFIERS?.length > 0 ? updatedModifiers : [],
      };
 
      if (existingItem) {
        updateCartItemQuantity(existingItem, existingItem.quantity + item.QUANTITY);
      } else {
        addItemToCartBtnForReOrder(itemWithModifiers, item.QUANTITY);
      }
    });
  };
  const PriceRow = ({ label, value }) => (
    <UI.CbBox id="splitPriceContainer" pageId="RecentOrder"  style={styles.splitPriceContainer}>
      <UI.CbBox id="PriceLabelContainer" pageId="RecentOrder" style={styles.priceLabelContainer}>
        <UI.CbText id="PriceLabel" pageId="RecentOrder" style={styles.priceLabel}>{label}</UI.CbText>
      </UI.CbBox>
      <UI.CbBox id="ValueMainContainer" pageId="RecentOrder" style={styles.valueMainContainer}>
        <UI.CbText id="PriceLabel" pageId="RecentOrder"  style={styles.priceLabel}>${value}</UI.CbText>
      </UI.CbBox>
    </UI.CbBox>
  );
  const PriceDetails = (ordersPrice) => (
    <UI.CbBox id="priceContainer" pageId="RecentOrder"  style={styles.priceContainer}>
      <UI.CbBox id="priceSubContainer" pageId="RecentOrder"  style={styles.priceSubContainer}>
        {ordersPrice && ordersPrice?.BREAKDOWN?.map((item, index) => (
          <PriceRow key={index} label={item.LABEL} value={item.VALUE} />
        ))}
      </UI.CbBox>
    </UI.CbBox>
  );
  return(
    <UI.FlatList
    data={ordersData}
    scrollEnabled={false}
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

  const [mOAddtoCartButtonConfig, setmOAddtoCartButtonConfig] = useState(null);

  useEffect(() => {
    const loadConfig = async () => {
       
        const mOAddtoCartButton = await loadPageConfig("RecentOrder", "MOAddtoCartButton");
      
         setmOAddtoCartButtonConfig(mOAddtoCartButton);
    };
    loadConfig();
}, []);


const MOAddtoCartButtonConfigStyles=transformStyles(mOAddtoCartButtonConfig?.Styles);
      const Activecolor =mOAddtoCartButtonConfig?.Activecolor  ||  "#5773a2";
      const InActivecolor =mOAddtoCartButtonConfig?.InActivecolor  ||  "#ABABAB";
      const AddIconSource =mOAddtoCartButtonConfig?.AddIconSource ;
      const RemoveIconSource =mOAddtoCartButtonConfig?.RemoveIconSource ;
      const DeleteIconSource= mOAddtoCartButtonConfig?.DeleteIconSource ;
      const OperationBtn3=MOAddtoCartButtonConfigStyles?.operationBtn3 || styles.operationBtn3; 
      const OperationBtn2=MOAddtoCartButtonConfigStyles?.operationBtn2 || styles.operationBtn2;
      const OperationBtn=MOAddtoCartButtonConfigStyles?.operationBtn || styles.operationBtn;
      const AddCartIcons=MOAddtoCartButtonConfigStyles?.addCartIcons || styles.addCartIcons;
      const IconBtn=MOAddtoCartButtonConfigStyles?.iconBtn || styles.iconBtn;
      const QuantityTxt=MOAddtoCartButtonConfigStyles?.quantityTxt || styles.quantityTxt;

  const route = useRoute();
  const screenName = route.name;

  const {
    menuOrderData,
    storeSingleItem,
    closePreviewModal,
    increaseQuantity,
    cartData,
    addItemToCartBtn,
    modifiersResponseData 
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
    if(item?.IsAvailable ===1 && item?.IsDisable === 0){
      closePreviewModal();
      storeSingleItem({
        ...item,
        quantityIncPrice: item?.TotalPrice,
      });
      increaseQuantity({
        ...item,
        quantityIncPrice: item?.TotalPrice,
      });
    }
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
    if(itemsDetails?.Modifiers?.length > 0){
      openItemDetails(itemsDetails)
    }else{
      addItemToCartBtn(itemsDetails)
    }
  }
  const commonStyles = (isAvailable, IsDisable, primaryColor, secondaryColor) => {
    if (isAvailable === 1 && IsDisable === 0) {
      return primaryColor
    } else {
      return secondaryColor
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
          <UI.Box style={[styles.favMainContainer]}>
            {
              favItems && favItems?.length > 0 ? 
             <>
              <Divider style={styles.divider} />
              <UI.FlatList 
              scrollEnabled={false}
              data={favItems}
              renderItem={({item, index}) =>{
               
                const cartItem = cartData && cartData?.find((cartItem) => cartItem?.Item_ID === item?.Item_ID);
                const quantity = cartItem ? cartItem.quantity : 0;
                const IsAvailable = item?.IsAvailable;
                const IsDisable = item?.IsDisable
                return (
                  <UI.TouchableOpacity
                    key={index}
                    style={[styles.favItem,
                      {
                      opacity: (IsAvailable === 1 && IsDisable === 0) ? 1 : 0.4,
                    }]}
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
                        <UI.Text style={[styles.itemLables]}>
                          {item.Item_Name}
                        </UI.Text>
                        <UI.Text style={[styles.itemLables]}>
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
                        <UI.Box style={OperationBtn}>
                                    <UI.TouchableOpacity style={IconBtn}   onPress={() => handleDecrement(item, quantity)}>
                                      {
                                        quantity === 1 ? ( DeleteIconSource ? (<Image source={{ uri: DeleteIconSource}} style={AddCartIcons} />) :(<Image source={require('@/assets/images/icons/Trash_Icon3x.png')} style={AddCartIcons}/>))
                                        : (RemoveIconSource ? (<Image source={{ uri: RemoveIconSource}} style={AddCartIcons} />) : (<Image source={require('@/assets/images/icons/Minus_Icon3x.png')} style={AddCartIcons}/>))
                                      }
                                    </UI.TouchableOpacity>
                                    <UI.Text style={QuantityTxt}>{quantity}</UI.Text>
                                    <UI.TouchableOpacity  style={IconBtn}  onPress={() => handleIncrement(item, quantity)}>
                                         { AddIconSource ? <Image source={{ uri: AddIconSource}} style={AddCartIcons} /> : <Image source={require('@/assets/images/icons/Plus_Icon3x.png')} style={AddCartIcons}/> }
                                    </UI.TouchableOpacity>
                        </UI.Box>
                      :<UI.Box style={OperationBtn3}>
                                  <UI.TouchableOpacity
                                   disabled={(IsAvailable === 1 && IsDisable === 0) ? false : true} 
                                   onPress={() => addItemToCartBtnDetails(item)}
                                    style={[ OperationBtn2,{ borderColor: commonStyles(item.IsAvailable,item.IsDisable, Activecolor,InActivecolor)}]}>
                                      { AddIconSource ? <Image source={{ uri: AddIconSource}} style={AddCartIcons} /> : <Image source={require('@/assets/images/icons/Plus_Icon3x.png')} style={AddCartIcons}/> }
                                  </UI.TouchableOpacity>
                         </UI.Box>
                        }
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


  const {loading,emptyOrderMessage,handleModifierAddCart,handleCloseItemDetails,isRecentOrder, setIsRecentOrderOpen} = useRecentOrderLogic(props)
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
  const totalQuantity = cartData?.reduce((sum, item) => sum + (item.quantity || 0), 0);

  const modifierCartItem = modifierCartItemData?.find((item) => item.Item_ID === singleItemDetails?.Item_ID);
  const cartItemDetails = cartData?.find((item) => item.Item_ID === singleItemDetails?.Item_ID);
  const quantity = cartItemDetails ? cartItemDetails?.quantity : 0;
  const totalCartPrice = cartItemDetails ?  Math.floor(cartItemDetails?.quantityIncPrice * 100) / 100 : 0;
  const singleItemPrice = modifierCartItem ?   Math.floor(modifierCartItem?.quantityIncPrice * 100) / 100 : 0;
  return (
    <UI.CbBox id="ROMainContainer" pageId="RecentOrder" style={styles.mainContainer}>
      <UI.CbBox id="ROSubContainer" pageId="RecentOrder"  style={styles.subContainer}>
        <UI.TouchableOpacity
          activeOpacity={1}
          onPress={() => setIsRecentOrderOpen(false)}
          
        >
          <UI.Box id="ROFavButton" pageId="RecentOrder"  style={[
            !isRecentOrder ? styles.ActiveButtonStyle : styles.ButtonStyle,
          ]}>
          <UI.Text id="ROFavText" pageId="RecentOrder"  
            style={[
              !isRecentOrder
                ? styles.ActiveButtonTextStyle
                : styles.ButtonTextStyle,
            ]}
          >
            Favorite
          </UI.Text>
          </UI.Box>
        </UI.TouchableOpacity>
        <UI.TouchableOpacity
          onPress={() => setIsRecentOrderOpen(true)}
        >
           <UI.Box id="ROButton" pageId="RecentOrder"  style={[
            isRecentOrder ? styles.ActiveButtonStyle : styles.ButtonStyle,
          ]}>
          <UI.Text id="ROText" pageId="RecentOrder" 
            style={[
              isRecentOrder
                ? styles.ActiveButtonTextStyle
                : styles.ButtonTextStyle,
            ]}
          >  Recent Orders         
          </UI.Text>
          </UI.Box>
        </UI.TouchableOpacity>
      </UI.CbBox>
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
                  <UI.CbText id="EmptyOrderMessage" pageId="RecentOrder" style={styles.emptyFavList}>{emptyOrderMessage}</UI.CbText>
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
              <UI.CbBox id="CloseIconContainer" pageId="RecentOrder" style={styles.CloseIconContainer} >
                     <UI.CbImage id="CloseIcon" pageId={'RecentOrder'} imageJsx={<Image source={require('@/assets/images/icons/Modal_Close.png')} style={styles.closeIcon}/>}/>    
            </UI.CbBox>
            </UI.TouchableOpacity>
            }
            <UI.Box style={styles.modiferItems}>
              {
                isRecentOrder ? 
                <ItemModifier isRecentOrder={isRecentOrder ? true:false}/> : 
                <ItemModifierUIFavs isRecentOrder={isRecentOrder ? true:false}/>
              }
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
      {totalQuantity > 0 && 
      <UI.CbFloatingButton id="CartButton" pageId="RecentOrder" props={props} />
       }
    </UI.CbBox>
  );
}
