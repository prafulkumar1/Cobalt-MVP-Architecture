import React from 'react';
import { FlatList, ImageBackground, Image, TouchableOpacity, ScrollView, Platform,Modal,View} from 'react-native';
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import {  CheckIcon, ChevronDownIcon,ChevronRightIcon, CircleIcon,ChevronUpIcon,AddIcon,TrashIcon,RemoveIcon } from '@/components/ui/icon';
import { Checkbox,CheckboxIcon,CheckboxIndicator,CheckboxLabel,CheckboxGroup } from '@/components/ui/checkbox';
import { Select,SelectIcon,SelectInput,SelectTrigger,SelectPortal,SelectBackdrop,SelectContent,SelectDragIndicator,SelectItem,SelectDragIndicatorWrapper } from '../ui/select';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Divider } from '@/components/ui/divider';
import { Radio, RadioGroup, RadioIndicator, RadioLabel, RadioIcon } from '@/components/ui/radio';
import { Accordion,  AccordionItem,  AccordionHeader, AccordionTrigger, AccordionTitleText, AccordionContentText, AccordionIcon, AccordionContent, } from '@/components/ui/accordion';
import {  styles } from './style';
import uuid from  "react-native-uuid"
import { FormContext } from './event';
import { navigateToScreen } from '@/source/constants/Navigations';
import SvgUri from 'react-native-svg-uri';
import { handleSearchClick, handleClearClick, handleCloseClick } from "./event";
import ItemModifier from '@/source/views/ItemModifier/ItemModifierUI';

class CbBackButton extends React.Component {
  constructor(props) {
    super(props);
    this.id=props.id;
    this.source = props.source;
  }
  render() {
    const ImageScourec='https://cobaltportal.mycobaltsoftware.com:4430/devsite/shared/Cobalt/MediaLibrary/devArchivePath/AppMenu/AppIcons/MobileOrdering_Icons/Back.png';
  
    return (

      <FormContext.Consumer>
        {({ AppConfigJson }) => {
          return (
            <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={styles.backArrowHeader}>
              {
                ImageScourec ? <Image source={{ uri: ImageScourec }} style={styles.BackIcon} /> : <Image alt='image' source={require("@/assets/images/icons/Back.png")} />
              }
            </TouchableOpacity>
          );
        }}
      </FormContext.Consumer>
    );
  }
}

class CbAccordionlist extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    this.screenName = props.screenName;
    this.favsource = props.favsource || "";
    this.Notfavsource = props.Notfavsource || "";
    this.componentData = props.componentData || [];
     
    this.state = {
      selectedModifiers: {},
    };
  }

  handleCheckboxToggle = (
    modifierIndex,
    itemIndex,
    isMaxAllowedOne,
    isRequired,
    itemName,
    getAllSelectedModifiers,
    price,
    isChecked
  ) => {
    this.setState((prevState) => {
      const updatedModifiers = { ...prevState.selectedModifiers };
      const addedModifiers = {
        id:uuid.v4(),
        modifier : itemName,
        isChecked:!isChecked,
        price:price,
        isMaxAllowedOne
      }

      if (isMaxAllowedOne) {
        updatedModifiers[modifierIndex] = itemIndex;
      } else {
        updatedModifiers[modifierIndex] = updatedModifiers[modifierIndex] || [];

        if (updatedModifiers[modifierIndex].includes(itemIndex)) {
          updatedModifiers[modifierIndex] = updatedModifiers[
            modifierIndex
          ].filter((i) => i !== itemIndex);

          if (isRequired && updatedModifiers[modifierIndex].length === 0) {
            return prevState;
          }
        } else {
          updatedModifiers[modifierIndex].push(itemIndex);
        }
      }
      getAllSelectedModifiers(addedModifiers,itemName)

      return { selectedModifiers: updatedModifiers };
    });
  };

  render() {
    const Notfavsource = this.Notfavsource;
    const favsource = this.favsource;
    const IsFavorite = 1;
    const componentData =
      this.screenName === "RecentOrders"
        ? this.componentData.CompletedOrders
        : this.componentData.Modifiers;
    const defaultOpenItems = componentData.map((_, index) => `item-${index}`);

    return (
      <FormContext.Consumer>
        {({ cartData,getAllSelectedModifiers}) => {
          const buttonArray = global.controlsConfigJson.find(
            (item) => item.id === this.id
          );

          return (
            <>
              {
                componentData.map((order, index) => (
                  <Accordion
                    defaultValue={defaultOpenItems}
                    variant="filled"
                    type="single"
                    size="md"
                    style={this.screenName === "RecentOrders" ? styles.roAccordion: styles.itemDetailsContainer}
                  >
                    <AccordionItem
                      value={`item-${index}`}
                      style={styles.itemDetailsSubContainer}
                    >
                      <AccordionHeader style={this.screenName === "RecentOrders" ? styles.roAccordionHeader:styles.subHeader}>
                        <AccordionTrigger>
                          {({ isExpanded }) => {
                            return (
                              <>
                               {this.screenName === "RecentOrders" ? (
                                  <Box key={index} style={styles.roAccordionHeading}>
                                  <Image alt="image" source={require("@/assets/images/icons/ROdate.png")} />
                                  <AccordionTitleText style={styles.roAccordionTitleText}>Ordered Date: {order.OrderDate}</AccordionTitleText>
                                  </Box>
                
                                ) : (
                                  <Box
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      justifyContent: "flex-start",
                                    }}
                                  >
                                    <AccordionTitleText
                                      style={{
                                        color: "#4B5154",
                                        fontSize: 14,
                                        fontFamily:"SourceSansPro_SemiBold"
                                      }}
                                    >
                                      {order.MainModifier}{" "}
                                      {order.IsRequried === 1 && (
                                        <AccordionTitleText style={{ color: "red",fontFamily:"SourceSansPro_SemiBold",fontSize: 12, }}>
                                           (Required)
                                        </AccordionTitleText>
                                      )}{" "}
                                      {order.IsMaxAllowedOne === 1 && (
                                        <AccordionTitleText
                                          style={{ color: "#3B87C1", fontSize: 12 ,fontFamily:"SourceSansPro_SemiBold"}}
                                        >
                                          (Max allowed 1)
                                        </AccordionTitleText>
                                      )}
                                    </AccordionTitleText>
                                  </Box>
                                )}
                                {isExpanded ? (
                     <AccordionIcon as={ChevronDownIcon} className="ml-3" style={styles.roAccordionIcon} />
                  ) : (
                     <AccordionIcon as={ChevronRightIcon} className="ml-3" style={styles.roAccordionIcon} />
                  )}
                              </>
                            );
                          }}
                        </AccordionTrigger>
                      </AccordionHeader>
                      <AccordionContent>
                      {this.screenName == "RecentOrders" ?
            order.Items.map((item, index) => (
          <Box>
                <Box style={styles.roAccordionContentouterbox}>
                    <Box style={styles.roAccordionContentItembox}>
                        <Text style={styles.roItemName} strikeThrough={!item.IsAvailable}> {item.ItemName} </Text>
                        <Text style={styles.roItemprice}>{`$${item.Price}`}</Text>
                    </Box>
                    <Box style={styles.roImagescetion}>
                      <Image alt="image"source={item.IsFavorite? favsource ? { uri: favsource }: require("@/assets/images/icons/Fav.png"): Notfavsource ? { uri: Notfavsource } : require("@/assets/images/icons/Notfav.png")} style={styles.roItemImage} />
                       <CbAddToCartButton mealItemDetails={{}} style={styles.roItemButton} />
                    </Box>           
                </Box>
                <Divider/>
          </Box>
            ))
          : order.ModifierItems.map((item, itemIndex) => (
                            <Box
                              key={itemIndex}
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                paddingTop: 10,
                              }}
                            >
                              <Checkbox
                                isChecked={
                                  this.state.selectedModifiers[index] === itemIndex ||
                                  (Array.isArray(this.state.selectedModifiers[index]) &&
                                    this.state.selectedModifiers[index].includes(
                                      itemIndex
                                    ))
                                }
                                onChange={() =>
                                  this.handleCheckboxToggle(
                                    index,
                                    itemIndex,
                                    order.IsMaxAllowedOne === 1,
                                    order.IsRequried === 1,
                                    item.ItemName,
                                    getAllSelectedModifiers,
                                    item.Price,
                                    this.state.selectedModifiers[index] === itemIndex ||
                                    (Array.isArray(this.state.selectedModifiers[index]) &&
                                      this.state.selectedModifiers[index].includes(
                                        itemIndex
                                      ))
                                  )
                                }
                              >
                                <CheckboxIndicator style={styles.CheckboxIndicator}>
                                  <CheckboxIcon
                                    as={CheckIcon}
                                    style={{ color: "#707070", width: 17, height: 17 }}
                                  />
                                </CheckboxIndicator>
                                <CheckboxLabel
                                  style={{
                                    color: "#4B5154",
                                    fontSize: 14,
                                   fontFamily:"SourceSansPro_SemiBoldItalic"
                                  }}
                                >
                                  <Text>{item.ItemName}</Text>
                                </CheckboxLabel>
                              </Checkbox>
                              <AccordionContentText
                                style={{
                                  marginLeft: "auto",
                                  color: "#4B5154",
                                  fontSize: 14,
                                   fontFamily:"SourceSansPro_SemiBold"
                                }}
                              >
                                <Text>{`$${item.Price}`}</Text>
                              </AccordionContentText>
                            </Box>
                          ))}
                          {this.screenName == "RecentOrders" && order.IsReorder ?<Button variant="outline" style={styles.roReoderButton}>
          <ButtonText style={styles.roReordertext} numberOfLines={1}  ellipsizeMode="tail">Re Order</ButtonText>
      </Button>:"" }
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))
              }
            </>
          );
        }}
      </FormContext.Consumer>
    )
  }
}


class CbImage extends React.Component {
  constructor(props) {
    super(props);
    // this.id=props.id;
    this.source = props.source || "";
    this.imageJsx=props.imageJsx;
    this.style = props.style || "";
    // console.log("===>",this.style);
  }

  render() {
    //const inputArray = global.controlsConfigJson.find(item => item.id === this.id);
    //const source = inputArray?.source  || this.source;'
    const jsx = this.imageJsx;
    const source=this.source;
     
    if (source) {

      if (source.endsWith('.svg')) {
        
        return <SvgUri source={{ uri: source }}  />;
      } else {

        return <Image alt='image' source={{ uri: source }}  style={this.style}/>;
      }
    } else {
      return jsx;
    }
  }
}



class CbHomeButton extends React.Component {
  constructor(props) {
    super(props);
    this.source = props.source;
  }
  render() {
    return (
      <TouchableOpacity onPress={()=>navigateToScreen(this.props,'ProfitCenters')}>
        {
          this.source ? <Image source={{ uri: this.source}} style={{width:24,height:24}}/>:<Image alt='image' source={require("@/assets/images/icons/Home.png")} style={{width:24,height:24}} />
        }
      </TouchableOpacity>

    );
  }
}

class CbFloatingButton extends React.Component {
  constructor(props) {
    super(props);
    this.cartQuantity = props.cartQuantity
    this.screenProps = props.props
  }
  render() {
    return (
      <FormContext.Consumer>
      {({cartData}) => {
          const buttonArray = global.controlsConfigJson.find(
            (item) => item.id === this.id
          );
          const variant = buttonArray?.variant || this.variant;
          const buttonText = buttonArray?.text || this.buttonText;
          const getFinalQuantity = cartData &&  cartData.reduce((total,prev) => total+prev.quantity,0)
          return (
            <View style={styles.floatingContainer}>
              <TouchableOpacity style={styles.floatingBtn} onPress={() => navigateToScreen(this.screenProps, "MyCart", true,)}>
                <Image source={require("@/assets/images/icons/cartIcon2x.png")} style={styles.cartIcon} />
              <Text style={styles.cartCountTxt}>{getFinalQuantity? getFinalQuantity:0}</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </FormContext.Consumer>
    );
  }
}


class CbAddToCartButton extends React.Component {
  constructor(props) {
    super(props);
    this.mealItemDetails = props.mealItemDetails
    this.style = props.style
    this.cartStyle = props.cartStyle
  }
  commonStyles = (isAvailable,IsDisable,primaryColor,secondaryColor) => {
    if(isAvailable ===1 && IsDisable ===0){
      return primaryColor
    }else{
      return secondaryColor
    }
  }


  handleAddToCartBtn = (storeSingleItem,closePreviewModal,addItemToCartBtn,increaseQuantity) => {
    if(this.mealItemDetails?.isModifier ===1){
      storeSingleItem(this.mealItemDetails);
      closePreviewModal()
      increaseQuantity(this.mealItemDetails,false)
    }else{
      addItemToCartBtn(this.mealItemDetails)
    }
  }

  modifierIncDecBtn = (updateModifierItemQuantity,modifierQuantity, updateCartItemQuantity,cartQuantity,operation) => {
    if (this.mealItemDetails?.isModifier === 1) {
      if(operation === "decrement"){
        updateModifierItemQuantity(this.mealItemDetails, modifierQuantity-1)
      }else{
        updateModifierItemQuantity(this.mealItemDetails, modifierQuantity+1)
      }
    } else {
      if(operation === "decrement"){
        updateCartItemQuantity(this.mealItemDetails, cartQuantity - 1)
      }else{
        updateCartItemQuantity(this.mealItemDetails, cartQuantity+1)
      }
    }
  }

  renderAddToCartBtn = (contextProps) => {
     const addButton = global.controlsConfigJson.find(item => item.id === "addButton");
    const { cartData, addItemToCartBtn, updateCartItemQuantity,closePreviewModal,storeSingleItem,increaseQuantity,updateModifierItemQuantity,modifierCartItemData } = contextProps;
    const IsAvailable = this.mealItemDetails.IsAvailable;
    const IsDisable = this.mealItemDetails.IsDisable
    const cartItem = cartData?.find((item) => item.Item_Id === this.mealItemDetails.Item_Id);
    const quantity = cartItem ? cartItem.quantity : 0;
    const modifierCartItem = modifierCartItemData&& modifierCartItemData?.find((item) => item.Item_Id === this.mealItemDetails.Item_Id);
    const modifierQuantity = modifierCartItem ? modifierCartItem?.quantity : 0;
    


  
    if ( quantity === 0 && modifierQuantity === 0) {
      return (
        <TouchableOpacity
          style={[this.style ? this.style : styles.addItemToCartBtn, 
            { borderColor: addButton?.borderColor?this.commonStyles(IsAvailable,IsDisable, addButton?.borderColor, "#4B515469") : this.commonStyles(IsAvailable, "#5773a2", "#4B515469") },
            {backgroundColor:addButton?.backgroundColor?addButton.backgroundColor : "#fff"},
            {borderRadius:addButton?.borderRadius?addButton?.borderRadius:5},
            {borderColor:addButton?.borderColor?addButton?.borderColor:"#5773A2"},
            {borderWidth:addButton?.borderWidth?addButton?.borderWidth : 1}
          ]}
          activeOpacity={0.5}
          onPress={() => this.handleAddToCartBtn(storeSingleItem,closePreviewModal,addItemToCartBtn,increaseQuantity)}
          disabled={IsAvailable === 1 && IsDisable === 0?false:true}
        >
          <Icon as={AddIcon} color={this.commonStyles(IsAvailable,IsDisable, "#5773a2", "#4B515469")} style={{width:25,height:25}}/>
        </TouchableOpacity>
      );
    } else {
      return (
        <Box style={[this.cartStyle? styles.operationBtn2:styles.operationBtn]}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => this.modifierIncDecBtn(updateModifierItemQuantity,modifierQuantity,updateCartItemQuantity,quantity,"decrement")}
          >
            {
              this.mealItemDetails?.isModifier === 1 ? 
              <Icon as={modifierQuantity === 1 ? TrashIcon : RemoveIcon} color="#5773a2" size={'md'} style={{width:23,height:23}}/>
              : 
              <Icon as={quantity === 1 ? TrashIcon : RemoveIcon} color="#5773a2" size={'md'} style={{width:23,height:23}}/>
            }
          </TouchableOpacity>

          <Text style={styles.quantityTxt}>{this.mealItemDetails?.isModifier === 1 ? modifierQuantity : quantity}</Text>

          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => this.modifierIncDecBtn(updateModifierItemQuantity,modifierQuantity,updateCartItemQuantity,quantity,"increment")}
          >
            <Icon as={AddIcon} color="#5773a2" size={"xl"} style={{width:25,height:25}}/>
          </TouchableOpacity>
        </Box>
      );
    }
  };
  render() {
    return (
      <FormContext.Consumer>
      {(contextProps) => {
        const buttonArray = global.controlsConfigJson.find(
          (item) => item.id === this.id
        );
        const variant = buttonArray?.variant || this.variant;
        const buttonText = buttonArray?.text || this.buttonText;

        return (
          <>
          {this.renderAddToCartBtn(contextProps)}
          </>
        );
      }}
    </FormContext.Consumer>
    );
  }
}


class CbAccordion extends React.Component {
  constructor(props) {
    super(props);
    this.AccordionData = Array.isArray(props.AccordionData) ? props.AccordionData : [];
    this.addItemToCartBtn = props.addItemToCartBtn
    this.updateCartItemQuantity = props.updateCartItemQuantity
    this.cartData = props.cartData || []
    this.state = {
      expandedIds: [],
    };
  }


  handleReadMoreToggle = (id) => {
    this.setState((prevState) => {
      const isExpanded = prevState.expandedIds.includes(id);
      return {
        expandedIds: isExpanded
          ? prevState.expandedIds.filter((expandedId) => expandedId !== id)
          : [...prevState.expandedIds, id],
      };
    });
  };
  commonStyles = (isAvailable,primaryColor,secondaryColor) => {
    if(isAvailable ===1){
      return primaryColor
    }else{
      return secondaryColor
    }
  }


  showActiveAvailableColor = (isAvailable,IsDisable) => {
    return { color: isAvailable === 1 &&IsDisable===0  ? "#4B5154" : "#4B515469" };
  };

  render() {
    const componentdata = this.AccordionData;
    const { expandedIds } = this.state;
    const configItems = global.controlsConfigJson?.reduce((acc, item) => {
      if (["itemTitle", "itemPrice", "itemDescription", "itemCategoryLabel"].includes(item.id)) {
        acc[item.id] = item;
      }
      return acc;
    }, {});

    const { itemTitle, itemPrice, itemDescription, itemCategoryLabel } = configItems;

    return (
      <FormContext.Consumer>
        {({itemDataVisible,closePreviewModal,singleItemDetails,modifierCartItemData,increaseQuantity}) => {
          const buttonArray = global.controlsConfigJson.find(
            (item) => item.id === this.id
          );
          const modifierCartItem = modifierCartItemData?.find((item) => item.Item_Id === singleItemDetails?.Item_Id);
          const singleItemPrice = modifierCartItem ? modifierCartItem?.quantityIncPrice : 0;
          const variant = buttonArray?.variant || this.variant;
          const buttonText = buttonArray?.text || this.buttonText;

          return (
            <ScrollView
              showsVerticalScrollIndicator={true}
              showsHorizontalScrollIndicator={true}
              contentContainerStyle={[
                styles.mainContainerList,
                Platform.OS === "ios" && { paddingBottom: "30%" },
              ]}
              keyboardShouldPersistTaps="handled"
            >
              <Accordion
                defaultValue={componentdata?.map((item) => item.Submenu_Name)}
                variant="filled"
                type="multiple"
                isCollapsible={true}
                isDisabled={false}
              >
                {componentdata &&
                  componentdata.map((item) => (
                    <AccordionItem
                      key={item.Submenu_Name}
                      value={item.Submenu_Name}
                      style={styles.headerTxt}
                    >
                      <AccordionHeader style={styles.menuHeader}>
                        <AccordionTrigger style={styles.subItem}>
                          {({ isExpanded }) => (
                            <>
                              <AccordionTitleText
                                style={[
                                  itemCategoryLabel?.styles
                                    ? itemCategoryLabel?.styles
                                    : styles.itemCategoryLabel,
                                ]}
                              >
                                {item.Submenu_Name}
                              </AccordionTitleText>
                              {isExpanded ? (
                                <AccordionIcon
                                  as={ChevronUpIcon}
                                  width={22}
                                  height={22}
                                  className="ml-3"
                                />
                              ) : (
                                <AccordionIcon
                                  as={ChevronDownIcon}
                                  width={22}
                                  height={22}
                                  className="ml-3"
                                />
                              )}
                            </>
                          )}
                        </AccordionTrigger>
                      </AccordionHeader>
                      <AccordionContent style={{ marginTop: 10 }}>
                        {item.Items &&
                          item.Items.map((box) => {
                            const isExpanded = expandedIds.includes(
                              box.Item_Id
                            );

                            return (
                              <Box
                                key={box.Item_Id}
                                style={[
                                  styles.subContainer,
                                  {
                                    opacity:
                                      box.IsAvailable === 1 &&
                                      box.IsDisable === 0
                                        ? 1
                                        : 0.8,
                                  },
                                ]}
                              >
                                <Box style={styles.rowContainer}>
                                  <Box
                                    style={[
                                      styles.textContainer,
                                      { marginRight: 5 },
                                    ]}
                                  >
                                    <AccordionContentText
                                      numberOfLines={1}
                                      style={[
                                        itemTitle?.styles
                                          ? itemTitle?.styles
                                          : styles.mealTypeTitle,
                                        this.showActiveAvailableColor(
                                          box.IsAvailable,
                                          box.IsDisable
                                        ),
                                        { textAlign: "justify" },
                                      ]}
                                    >
                                      {box.Item_Name}
                                    </AccordionContentText>
                                    <AccordionContentText
                                      numberOfLines={isExpanded ? undefined : 2}
                                      style={[
                                        itemPrice?.styles
                                          ? itemPrice?.styles
                                          : styles.priceTxt,
                                        this.showActiveAvailableColor(
                                          box.IsAvailable,
                                          box.IsDisable
                                        ),
                                      ]}
                                    >
                                      {`$${box.Price}`}
                                    </AccordionContentText>
                                    <AccordionContentText
                                      numberOfLines={isExpanded ? undefined : 1}
                                      style={[
                                        itemDescription?.styles
                                          ? itemDescription?.styles
                                          : styles.descriptionTxt,
                                        this.showActiveAvailableColor(
                                          box.IsAvailable,
                                          box.IsDisable
                                        ),
                                        {
                                          textAlign: "left",
                                          letterSpacing: -0.5,
                                        },
                                      ]}
                                    >
                                      {box.Description}
                                    </AccordionContentText>
                                    {box.Description.length > 35 && (
                                      <AccordionContentText
                                        onPress={() =>
                                          this.handleReadMoreToggle(box.Item_Id)
                                        }
                                        style={styles.underLineTxt}
                                      >
                                        {isExpanded ? "Show Less" : "Read More"}
                                      </AccordionContentText>
                                    )}
                                  </Box>

                                  {box.Image && (
                                    <Box style={styles.imageContainer}>
                                      <TouchableOpacity
                                        style={{
                                          backgroundColor:
                                            "rgba(255, 255, 255, 0.2)",
                                        }}
                                        disabled={box.IsAvailable === 0}
                                      >
                                        <Image
                                          source={{ uri: box.Image }}
                                          style={[
                                            styles.mealTypeImg,
                                            box.IsAvailable === 0 && {
                                              filter: "grayscale(100%)",
                                            },
                                          ]}
                                        />
                                      </TouchableOpacity>
                                      <CbAddToCartButton
                                        mealItemDetails={box}
                                      />
                                    </Box>
                                  )}
                                </Box>
                                <Box style={styles.horizontalLine} />
                              </Box>
                            );
                          })}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
              </Accordion>
              <Modal
                visible={itemDataVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={closePreviewModal}
              >
                <ScrollView style={styles.modiferItems}>
                  <Box
                    style={styles.blackShadow}
                  />
                  <ItemModifier />
                </ScrollView>
                <Box style={styles.footerContainer}>
                  <Box>
                    <Text style={styles.totalAmountTxt}>Total Amount</Text>
                    <Text style={styles.orderAmount}>{`$${singleItemPrice}` }</Text>
                  </Box>
                  <CbCommonButton
                    showBtnName={"Add to Cart"}
                    style={styles.addToCartBtn}
                    btnTextStyle={styles.addCartTxt}
                    onPress={() => {
                      navigateToScreen(this.props, "MyCart", true,)
                      increaseQuantity(singleItemDetails,true)
                    }}
                  />
                </Box>
              </Modal>
            </ScrollView>
          );
        }}
      </FormContext.Consumer>
    );
  }
}


class cbSearchbox extends React.Component {
  constructor(props) {
    super(props);
    this.search=props.Searchsource || "";
    this.backarrow=props.Backarrowsource || "";
    this.close=props.closesource || "";
    this.isRecentOrderOpen = props.isRecentOrderOpen || false
    this.state = {
      showSearchInput: false,
      searchValue: "",
    };
    this.inputRef = React.createRef();
  }
  handleFocus = () => {
    if (this.inputRef?.current) {
      this.inputRef.current.focus();
    }
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.isRecentOrderOpen !== this.props.isRecentOrderOpen &&
      this.props.isRecentOrderOpen
    ) {
      this.setState({ showSearchInput: true }, () => {
        if (this.inputRef.current) {
          this.inputRef.current.focus();
        }
      });
    }
  }

  
  render() {
    const { showSearchInput, searchValue } = this.state;
    const Searchsource=this.search;
    const Backarrowsource=this.backarrow;
    const Closesource=this.close;
    return (
      <Box
        style={{
          width: showSearchInput ? "100%" : 40,
          height: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft:9,
          borderRadius:4,
          backgroundColor: showSearchInput ? "#f0f0f0" : "white",
        }}
      >
        {showSearchInput ? (
          <Box
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "95%",
              height: "100%",
              marginRight: 25
            }}
          >
            <TouchableOpacity   onPress={() => handleCloseClick(this.setState.bind(this), this.props.onSearchActivate) } style={{ marginLeft: 10 }} >
              {
                Backarrowsource ? <Image source={{ uri: Backarrowsource}}/>:<Image alt='image' source={require("@/assets/images/icons/BackArrow.png")} />
              }
            </TouchableOpacity>
            <Input
              style={{
                flex: 1,
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius: 5,
                backgroundColor: "#f0f0f0",
              }}
            >
              <InputField
                ref={this.inputRef}
                value={searchValue}
                placeholder="Items"
                onChangeText={(value) => this.setState({ searchValue: value })}
              />
            </Input>
            {searchValue && (
            <TouchableOpacity  onPress={() =>handleClearClick(this.setState.bind(this),this.state.searchValue,this.props.onSearchActivate )}  style={{ marginLeft: 5 }} > 
                {
                Closesource? <Image source={{ uri: Closesource}}/>:<Image alt='image' source={require("@/assets/images/icons/Close.png")} />
                }
              </TouchableOpacity>
            )}
          </Box>
        ) : (
          <TouchableOpacity
            onPress={() =>
              handleSearchClick(this.setState.bind(this), this.props.onSearchActivate)
            }
          >
            {
          Searchsource ? <Image source={{ uri: Searchsource}}/>: <Image alt='image' source={require("@/assets/images/icons/Search.png")} />
            }
          </TouchableOpacity>
        )}
      </Box>
    );
  }
}



class cbButton extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    this.buttonText = props.text || "Button";
    this.variant = props.variant || "solid";
    this.onPress = props.onPress;
    this.customStyles=props.customStyles || '';
  }

  render() {

    // Fetch button configuration from global.controlsConfigJson
    const buttonArray = global.controlsConfigJson.find((item) => item.id === this.id);
    const variant = buttonArray?.variant || this.variant;
    const buttonText = buttonArray?.text || this.buttonText ;
    const buttonStyle=this.customStyles.buttonStyle;
    const buttonTextStyle=this.customStyles.buttontextStyle;
    
    return (
      <Button variant={variant} onPress={()=> this.onPress()} style={buttonStyle}  >
          <ButtonText style={buttonTextStyle} numberOfLines={1}  ellipsizeMode="tail">{buttonText}</ButtonText>
      </Button>
    );
  }
}

class cbCheckBox extends React.Component {
  constructor(props) {
    super();
    this.id=props.id;
    this.size = props.size || 'md';
    this.isDisabled=props.isDisabled || false;
    this.isInvalid=props.isInvalid || false;
    this.checkBoxLabel=props.Label || '';
    this.customStyles=props.customStyles || '';
  }

  render() {
    const inputArray = global.controlsConfigJson.find(item => item.id === this.id);
    const checkBoxLabelprop = inputArray?.labeltext  || this.checkBoxLabel;
    const styles=this.customStyles;

    return (
      <Checkbox size={this.size} isInvalid={this.isInvalid} isDisabled={this.isDisabled}>
      <CheckboxIndicator >
        <CheckboxIcon as={CheckIcon} />
      </CheckboxIndicator>
      <CheckboxLabel>{checkBoxLabelprop}</CheckboxLabel>
    </Checkbox>    
    );
  }
}



class cbImageBackground extends React.Component {
  constructor(props) {
    super();
    this.id=props.id;
    this.source = props.source || null;
    this.styles= props.styles || null;
  }

  render() {
    const { children } = this.props;
    const inputArray = global.controlsConfigJson.find(item => item.id === this.id);
    const sourceprop = inputArray?.source  || this.source;
    const styleprop = inputArray?.styles ||  this.styles;

    return (
      <ImageBackground source={sourceprop} alt='login' style={styleprop?.container} >
        {children}
      </ImageBackground>
    );
  }
}

class cbRadioButton extends React.Component {

  constructor(props) {
    super(props);
      this.id=props.id;
    this.alignment = props.alignment || 'vertical';
      this.Label= props.Label || '';
      this.options= Array.isArray(props.options) ? props.options : [];
  }


  render() {
    const inputArray = global.controlsConfigJson.find(item => item.id === this.id);
    const radiolabelprop = inputArray?.labelText  || this.selectLabel;
    const selectItems = Array.isArray(inputArray?.options) ? inputArray.options : this.options;
    const alignmentprop= inputArray?.alignment || this.alignment;
    const Stack = alignmentprop === 'vertical' ? VStack : HStack;
    return (

      <FormControl>
      <VStack  space="md">
          <FormControlLabel>
            <FormControlLabelText>{radiolabelprop}</FormControlLabelText>
          </FormControlLabel>
          <RadioGroup>
            <Stack space="sm">
              {selectItems.map((item, index) => (
                <Radio key={index} value={item.value} size="md" >
                  <RadioIndicator>
                    <RadioIcon as={CircleIcon} />
                  </RadioIndicator>
                  <RadioLabel>{item.label}</RadioLabel>
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </VStack >
      </FormControl>

    );
  }
}



class cbSelect extends React.Component {
  constructor(props) {
    super();
    this.id=props.id;
    this.placeholder= props.placeholder || 'Select';
    this.isRequired=props.isRequired || false;
    this.isInvalid=props.isInvalid || false;
    this.selectLabel=props.Label || '';
    this.selectItems = Array.isArray(props.selectItems) ? props.selectItems : [];
    this.style = props.style
    this.isTimeModalSelected = props.isTimeModalSelected 
    this.state = {
      isSelected:false
    }
  }

  render() {
    const inputArray = global.controlsConfigJson.find(item => item.id === this.id);
    const selectLabelprop = inputArray?.labelText  || this.selectLabel;
    const placeholderprop = inputArray?.placeholder || this.placeholder;
    const selectItems = Array.isArray(inputArray?.options) ? inputArray.options : this.selectItems;
    return (
<FormControl isRequired={this.isRequired} isInvalid={this.isInvalid} style={this.style}>
        <FormControlLabel>
          <FormControlLabelText>{selectLabelprop}</FormControlLabelText>
        </FormControlLabel>
       <TouchableOpacity>
       <Select>
          <SelectTrigger>
            <SelectInput placeholder={placeholderprop} />
          <SelectIcon  as={ChevronDownIcon} width={16} height={16} />
          </SelectTrigger>
          <SelectPortal isOpen={this.state.isSelected}>
            <SelectBackdrop />
            <SelectContent>
              {selectItems.map((item, index) => (
            <SelectItem key={index} label={item.label} value={item.value} onPress={()=>this.setState({isSelected:false},()=>console.log(item.value, "=== > selectedItem"))}/>
              ))}
            </SelectContent>
          </SelectPortal>
        </Select>
       </TouchableOpacity>
        <FormControlError>
          <FormControlErrorText></FormControlErrorText>
        </FormControlError>
      </FormControl>      
    );
  }
}

class cbSelectTime extends React.Component {
  constructor(props) {
    super();
    this.id=props.id;
    this.placeholder= props.placeholder || 'Select';
    this.isRequired=props.isRequired || false;
    this.isInvalid=props.isInvalid || false;
    this.selectLabel=props.Label || '';
    this.selectItems = Array.isArray(props.selectItems) ? props.selectItems : [];
    this.style = props.style
    this.isTimeModalSelected = props.isTimeModalSelected 
    this.state = {
      isSelected:false,
      selectedTime : ''
    }
  }

  render() {
    const inputArray = global.controlsConfigJson.find(item => item.id === this.id);
    const selectLabelprop = inputArray?.labelText  || this.selectLabel;
    const placeholderprop = inputArray?.placeholder || this.placeholder;
    const selectItems = Array.isArray(inputArray?.options) ? inputArray.options : this.selectItems;
    return (


      <FormContext.Consumer>
      {({     selectedTime,setSelectedTime}) => {
        const buttonArray = global.controlsConfigJson.find(
          (item) => item.id === this.id
        );
        const variant = buttonArray?.variant || this.variant;
        const buttonText = buttonArray?.text || this.buttonText;

        return (
          <>
             <TouchableOpacity
        onPress={() =>this.setState({ isSelected: true })}
      >
        <FormControl
          isRequired={this.isRequired}
          isInvalid={this.isInvalid}
          style={this.style}
        >
          <FormControlLabel>
            <FormControlLabelText>{selectedTime}</FormControlLabelText>
          </FormControlLabel>
            <Select>
              <SelectPortal isOpen={this.state.isSelected}>
                <SelectBackdrop onPress={()=> this.setState({isSelected:false})}/>
                <SelectContent>
                  <Text style={{marginVertical:10,fontFamily:"SourceSansPro_SemiBoldItalic"}}>Select Time</Text>
                  {selectItems.map((item, index) => (
                    <SelectItem
                      key={index}
                      label={item.label}
                      value={item.value}
                      onPress={() =>  {
                        this.setState({ isSelected: false })
                        setSelectedTime(item.value)
                      }}
                      style={[styles.scrollIndicator,index === 0 && styles.hoverItem]}
                    />
                  ))}
                  <CbCommonButton  showBtnName={"Done"} style = {styles.doneBtn} btnTextStyle = {styles.doneTxtBtn} onPress={() =>  this.setState({ isSelected: false })}/>
                </SelectContent>
              </SelectPortal>
            </Select>
          <FormControlError>
            <FormControlErrorText></FormControlErrorText>
          </FormControlError>
        </FormControl>
      </TouchableOpacity>
          </>
        );
      }}
    </FormContext.Consumer>
     
    );
  }
}

class cbInput extends React.Component {

  constructor(props) {
    super(props);
    this.formId = props.formId;
    this.id = props.id;
    this.labelText = props.labelText || "";
    this.variant = props.variant || "outline";
    this.input = props.input || 'text';
    this.placeholder = props.placeholder || '';
    this.errorMessage = props.errorMessage || '';
    this.isReadOnly = props.isReadOnly || false;
    this.isDisabled = props.isDisabled || false;
    this.isRequired = props.isRequired || false;
    this.isInvalid = props.isInvalid || false;
    this.setFormFieldData = typeof props.setFormFieldData === 'function' ? props.setFormFieldData : () => {};
    this.style = props.style;
  }
  

  render() {
    const inputArray = global.controlsConfigJson.find(item => item.id === this.id);
    const variantprop = inputArray?.variant  || this.valueariant;
    const typeprop = inputArray?.type ||  this.input;
    const labelTextprop = inputArray?.labelText || this.labelText;
    const placeholderprop = inputArray?.placeholder || this.placeholder;
    const errorMessageprop = inputArray?.errorMessage || this.errorMessage;
    const isDisabledprop = inputArray?.isDisabled === 1 || this.isDisabled;
    const isReadOnlyprop = inputArray?.isReadOnly === 1 ||  this.isReadOnly;
    const isRequiredprop = inputArray?.isRequired === 1 ||  this.isRequired;
    //const {getFormFieldData}= useFormContext();

    //const fieldData =this.getFormFieldData(this.formId,this.id); 

    return (
      <FormControl isDisabled={isDisabledprop} isReadOnly={isReadOnlyprop} isRequired={isRequiredprop}   >
        {labelTextprop && (
          <FormControlLabel>
            <FormControlLabelText>{labelTextprop}</FormControlLabelText>
          </FormControlLabel>
        )}
        <Input variant={variantprop} style={this.style}>
          <InputField
            id={this.id}
            placeholder={placeholderprop}
            type={typeprop}
            //value={fieldData.value} 
          onChangeText={(value) => {this.setFormFieldData(this.formId,'input',this.id,value);} }
          />
        </Input>
        {isRequiredprop && errorMessageprop && (
          <FormControlError>
            <FormControlErrorText>
              {errorMessageprop}
            </FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>
    );
  }
}
function cbForm({ formId, setFormFieldData, children }) {

  const childrenWithProps = React.Children.map(children, (child) =>
    React.isValidElement(child)
      ? React.cloneElement(child, { formId, setFormFieldData })
      : child
  );


  return <Box>{childrenWithProps}</Box>;
}


class cbVStack extends React.Component {
  constructor(props) {
    super();
    this.id=props.id;
    this.children=this.props;
    this.space = props.space || 'md';
  }

  render() {

    const { children } = this.props;
    const inputArray = global.controlsConfigJson.find(item => item.id === this.id);
    const spaceprop = inputArray?.space  || this.space;

    return (
      <VStack space={spaceprop}>
        {children}
      </VStack>
    );
  }
}

class CbFlatList extends React.Component{
  constructor(props) {
    super();
    this.id=props.id;
    this.children=props.children;
    this.space = props.space || 'md';
    this.flatlistData = props.flatlistData || []
    this.numColumns = props.numColumns || 0
    this.initialNumToRender = props.initialNumToRender || 10
    this.bounces = props.bounces || false
    this.horizontal = props.horizontal || false
    this.inverted = props.inverted || false
    this.contentContainerStyle = props.contentContainerStyle || {}
    this.ref = props.ref
    this.emptyListText = props.emptyListText || ""
    this.showsHorizontalScrollIndicator = props.showsHorizontalScrollIndicator || false
    this.showsVerticalScrollIndicator = props.showsVerticalScrollIndicator || false
    this.customStyles = props.customStyles || {}
    this.extraData = props.extraData || []
  }
  renderEmptyList = () => {
      return(
      <VStack>
        <Text>{this.emptyListText}</Text>
      </VStack>
    )
  }
  render(){
    const { children } = this.props;
    const inputArray = global.controlsConfigJson.find(item => item.id === this.id);
    const spaceprop = inputArray?.space  || this.space;
    const ITEM_HEIGHT = 100
    return (
      <FlatList
        ref={this.ref}
        data={this.flatlistData}
        renderItem={this.children}
        keyExtractor={(_) => uuid.v1()}
        numColumns={this.numColumns}
        ListEmptyComponent={this.renderEmptyList}
        initialNumToRender={10}
        ListFooterComponent={this.ListFooterComponent}
        bounces={this.bounces}
        horizontal={this.horizontal}
        inverted={this.inverted}
        contentContainerStyle={this.contentContainerStyle}
        maxToRenderPerBatch={10}
        showsHorizontalScrollIndicator={this.showsHorizontalScrollIndicator}
        showsVerticalScrollIndicator={this.showsVerticalScrollIndicator}
        style={this.customStyles}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        removeClippedSubviews={true}
        updateCellsBatchingPeriod={100}
        windowSize={21}
        onEndReachedThreshold={0.1}
        extraData = {this.extraData}
      />
    );
  }
}
class cbCategoryList extends React.Component {
  constructor(props) {
    super();
    this.id = props.id;
  }

  render() {
    return (
      <FormContext.Consumer>
        {({ menuOrderData,addItemToCartBtn,updateCartItemQuantity,cartData}) => {
          const buttonArray = global.controlsConfigJson.find(
            (item) => item.id === this.id
          );
          const variant = buttonArray?.variant || this.variant;
          const buttonText = buttonArray?.text || this.buttonText;

          return (
            <>
              {menuOrderData.MenuItems?.map((mealCategory) => {
                if (mealCategory.IsSelect === 1) {
                  return mealCategory.Categories.map((categoryList) => {
                    if (categoryList.IsSelect === 1) {
                      return (
                        <Box>
                          <CbAccordion AccordionData={categoryList.Submenu} addItemToCartBtn={addItemToCartBtn} updateCartItemQuantity={updateCartItemQuantity} cartData={cartData}/>
                        </Box>
                      );
                    }
                  });
                }
              })}
            </>
          );
        }}
      </FormContext.Consumer>
    );
  }
}


class CbCommonButton extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.addMorebtn
    this.cartQuantity = props.cartQuantity
    this.showBtnName = props.showBtnName || ""
    this.isPlusIconAvailable = props.isPlusIconAvailable || false
    this.style = props.style
    this.btnTextStyle = props.btnTextStyle
    this.onPress = props.onPress
  }
  render() {
    return (
      <Box>
        <TouchableOpacity
          style={[this.style ? this.style : styles.mediumBtn]}
          onPress={() => this?.onPress()}
        >
          {
            this.isPlusIconAvailable && <Icon as={AddIcon} color='#2A4E7D' />
          }
          <Text style={[this.btnTextStyle ? this.btnTextStyle : styles.mediumBtnTxt]}>
            {this.showBtnName}
          </Text>
        </TouchableOpacity>
      </Box>
    );
  }
}


CbHomeButton.display='CbHomeButton';
CbBackButton.display='CbBackButton';
CbImage.displayName='CbImage';
cbButton.displayName='cbButton';
cbInput.displayName='cbInput';
cbCheckBox.displayName='cbCheckBox';
cbSelect.displayName='cbSelect';
cbImageBackground.displayName='cbImageBackground';
cbRadioButton.displayName='cbRadioButton';
cbVStack.displayName='cbVStack';
cbForm.displayName='cbForm';
CbAccordion.displayName='CbAccordion';
CbFlatList.displayName = "CbFlatList"
cbCategoryList.displayName = "cbCategoryList"
cbSearchbox.displayName='cbSearchbox';
CbFloatingButton.displayName='CbFloatingButton';
CbAddToCartButton.displayName = "CbAddToCartButton"
CbCommonButton.displayName = "CbCommonButton";
CbAccordionlist.displayName='CbAccordionlist';
cbSelectTime.displayName='cbSelectTime';


 export {cbSelectTime,CbCommonButton, CbHomeButton, CbBackButton, cbButton, cbInput, cbCheckBox, cbSelect, cbImageBackground, cbRadioButton, cbVStack, cbForm, CbAccordion,CbFlatList,cbCategoryList,cbSearchbox,CbFloatingButton,CbImage,CbAddToCartButton,CbAccordionlist };